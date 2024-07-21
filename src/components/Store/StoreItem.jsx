import axios from 'axios';
import config from '../../config';
import infoStore from '../../stores/infoStore';
import { useState } from 'react';

import { ReactSVG } from "react-svg";
import { ReactComponent as Coin } from '../../assets/svg/coin.svg';
import { ReactComponent as Lock } from '../../assets/svg/lock.svg';

import CutNumber from '../CutNumber';
import ModalClass from '../Modal/ModalClass';
import ShowPopup from '../ShowPopup';

const StoreItem = ({ setStore, id, item, lvl, type, award, price, currency, icon, taskbar, lock_need, store }) => {
    const [showModal, setShowModal] = useState(false);

    let data = infoStore.getInfo();
    let textItem;

    const coin = 'coin.svg';
    const fullenergy = 'fullenergy.svg';

    switch (type) {
        case 'coins_per_click':
            textItem = `+${award}/per click`;
            break;
        
        case 'energy_per_second':
            textItem = `+${award} energy/per sec`;
            break;

        case 'max_energy':
            textItem = `+${award} to max energy`;
            break;

        default:
            textItem = 'unknown';
    }

    const handleClick = async () => {
        if (lock_need || lvl === 50) return;

        const tg = window.Telegram.WebApp;

        if (currency === 'stars') {
            const response = await axios.post(config.url + '/api/buy-store-stars', { id });
            tg.openInvoice(response.data.result, (status) => {
                if (status === 'paid') {
                    ShowPopup('Congratulations on your purchase! The page will reload in 3 seconds', item)
                    setShowModal(false);

                    setTimeout(() => window.location.reload(), 3000)
                }
            });

            return;
        }

        if (data.coins < price) {
            tg.HapticFeedback.notificationOccurred('error');
            ShowPopup('Not enough tokens', item);
            return setShowModal(false);
        }

        let response = await axios.post(config.url + '/api/buy-store', {id});
        infoStore.setInfo(response.data[0]);
        
        response = await axios.post(config.url + '/api/store');
        setStore(response.data);
        setShowModal(false);

        tg.HapticFeedback.notificationOccurred('success');
        ShowPopup('Congratulations on your purchase!', item);
    };

    return (
        <div className="store_item" onClick={() => {setShowModal(!(lock_need || lvl === 50))}}>
            {lock_need && (
                <div className="store_item-locked">
                    <Lock />
                    <h1>{lock_need}</h1>
                </div>
            )}

            <div style={{ filter: lock_need ? 'blur(10px)' : '' }}>
                <div className="store_item-info">
                    <div className="store_item-img">
                        <img src={icon} alt="" />
                    </div>

                    <div className="store_item-text">
                        <h1>{item}</h1>
                        <h2>
                            {type === 'coins_per_click' ? 
                                <ReactSVG src={require(`../../assets/svg/${coin}`)} />
                            : 
                                <ReactSVG src={require(`../../assets/svg/${fullenergy}`)} />
                            }

                            {textItem}
                        </h2>
                    </div>
                </div>

                <div className="store_item-right">
                    {currency ? (
                        <ReactSVG src={require(`../../assets/svg/${currency}.svg`)} />
                    ) : (
                        <Coin />
                    )}
                    {lvl === 50 ? 'Max' : CutNumber(price)}
                </div>
            </div>
            
            {taskbar && (
                <div style={{ filter: lock_need ? 'blur(10px)' : '' }} className="store_item-taskbar">
                    <div className="store_item-taskbar active" style={{ width: taskbar.width }}></div>
                    <span>{taskbar.text}</span>
                </div>
            )}

            <ModalClass 
                showModal={showModal}
                setShowModal={setShowModal}
                icon={icon}
                title={item}
                br='100%'
                subtitle={
                    type === 'coins_per_click' ?
                        `Earn +${award.toLocaleString('en')} ZigZag per click`
                        :
                        'Get ' + textItem
                }
                lvl={`lvl ${lvl + 1}`}
                price={lvl === 50 ? 'Max' : CutNumber(price)}
                currency_icon={currency === 'stars' ? 'stars.svg' : null}
                buttons_text={
                    type === 'coins_per_click' ? 
                        {left: 'Current tokens per click', right: `+${award.toLocaleString('ru')}`}
                        :
                        (type === 'energy_per_second' ?
                            {left: 'Current energy per sec', right: `+${award}`, right_icon: 'fullenergy.svg'}
                            :
                            {left: 'Current max energy', right: `+${award}`, right_icon: 'fullenergy.svg'})
                }
                buttons={[['Buy now', handleClick]]}
            />
        </div>
    );
};

export default StoreItem;