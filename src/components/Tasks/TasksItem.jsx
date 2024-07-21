import axios from 'axios';
import config from '../../config';
import infoStore from '../../stores/infoStore';
import { useEffect, useState } from "react";

import { useTonConnectUI, TonConnectButton, useTonAddress } from '@tonconnect/ui-react';

import { ReactSVG } from "react-svg";
import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';
import { ReactComponent as Done } from '../../assets/svg/done.svg';

import ModalClass from "../Modal/ModalClass";
import CutNumber from "../CutNumber";
import ShowPopup from '../ShowPopup';

const TasksItem = ({ fetchTasks, id, type, icon, task, award, taskbar, hint, done, instead_arrow, instead_arrow_icon, chatId }) => {
    const address = useTonAddress();
    
    const tonConnectUI = useTonConnectUI();

    const [firstRender, setFirstRender] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (type !== 'connect_wallet') return;

        const setWallet = async () => {
            await axios.post(config.url + '/api/set-wallet', { wallet: address });

            if (address.length > 1) await axios.post(config.url + '/api/check-task', { id });

            document.location.href = config.url + '/tasks';
        }

        if (!firstRender) {setWallet()} else {setFirstRender(false)};
    }, [address]);

    const checkTask = async () => {
        const response = await axios.post(config.url + '/api/check-task', { id });

        if (Object.keys(response.data).length < 1) {setShowModal(false); return ShowPopup('Task is not completed', task)};
        
        infoStore.setInfo(response.data[0]);
        await fetchTasks();
        setShowModal(false);

        return ShowPopup('You completed the task and received +' + award.toLocaleString('de'), task)
    }

    const follow = async () => 
        window.Telegram.WebApp.openTelegramLink('https://t.me/' + chatId.replace('@', ''));
    

    const followLink = async () => {
        window.Telegram.WebApp.openLink(chatId);
        if (!done) setTimeout(async () => await checkTask(), 2000);
    }

    const watchAds = () => {
        // todo: через adsgram сделать здесь рекламу, поместить колбэк checkTask в ивент завершения просмотра рекламы
        const AdController = window.Adsgram.init({ blockId: config.blockId });

        AdController.show().then(async result => {
            if (result.done) {
                console.log(result);
                await checkTask();
            }
        })
    }
    
    const connectWallet = async () => 
        await tonConnectUI.connect();
    
    let buttons = [ done ? null : ['Check', checkTask] ];

    switch (type) {
        case 'tg':
            buttons.push(['Follow', follow])
            buttons.reverse();

            break;

        case 'link':
            buttons = [['Follow the link', followLink]];

            break;

        case 'watch_ads':
            buttons = [ done ? null : ['Watch ads', watchAds]];

            break;
        
        case 'connect_wallet':
            buttons = [ <TonConnectButton onClick={connectWallet} /> ];

            break;
    }

    return (
        <div className="tasks_item" onClick={() => setShowModal(true)}>
            <div>
                <div className="tasks_item-info">
                    <div className="tasks_item-img">
                        {icon.includes('.svg') ? 
                            <ReactSVG src={icon} />
                            :
                            <img src={icon} alt="" />
                        }
                    </div>

                    <div className="tasks_item-text">
                        <h1>{task} {hint && <span>{hint}</span>}</h1>
                        <h2>+{award.toLocaleString('ru')}</h2>
                    </div>
                </div>

                {done ? (
                    <Done />
                ) : (
                    <div className='tasks_item-right'>
                        {instead_arrow ? (
                            <>
                                <ReactSVG src={require(`../../assets/svg/${instead_arrow_icon}.svg`)} />
                                <h1>{instead_arrow}</h1>
                            </>
                        ) : (
                            <Arrow opacity='0.5' />
                        )}
                    </div>
                )}
            </div>

            {taskbar && (
                <div className='tasks_taskbar'>
                    <div className="tasks_taskbar active" style={{ width: taskbar.width }}></div>
                    <span>{taskbar.text}</span>
                </div>
            )}

            <ModalClass 
                showModal={showModal}
                setShowModal={setShowModal}
                icon={icon}
                br='100%'
                title={task}
                price={CutNumber(award)}
                buttons={buttons}
                connect_wallet={type === 'connect_wallet'}
            />
        </div>
    );
};

export default TasksItem;
