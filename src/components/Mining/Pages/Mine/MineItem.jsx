import axios from "axios";
import config from '../../../../config';
import infoStore from "../../../../stores/infoStore";

import { observer } from "mobx-react-lite";
import { ReactSVG } from "react-svg";
import { ReactComponent as Lock } from '../../../../assets/svg/lock.svg';
import { useState } from "react";

import CutNumber from "../../../CutNumber";
import ModalClass from "../../../Modal/ModalClass";
import ShowPopup from "../../../ShowPopup";

const MineItem = observer(({ id, type, icon, currency, name, lvl, profit, count, timeRentHours, taskbar, lock_need, setMining, x2, currencyX2, priceX2, rented, isRented }) => {
    const [showModal, setShowModal] = useState(false);

    let data = infoStore.getInfo();

    const stars = 'stars.svg';
    const coin = 'coin.svg';

    const currency_texts = {
        '': CutNumber(priceX2),
        'stars': priceX2 + ' stars',
        'ad': 'watching ads'
    }

    const handleClick = async () => {
        if (lock_need || lvl === 100) return;

        const tg = window.Telegram.WebApp;

        const checkRent = (response) => {
            if (type !== 'rent') return true;

            if (response.data['error'] === 'already rented') {
                setShowModal(false);
                tg.HapticFeedback.notificationOccurred('error');
                ShowPopup('Already rented', name);
                return false;
            }

            return true;
            
        }

        if (currency === 'stars') {
            const response = await axios.post(config.url + '/api/buy-mining-stars', { id });
            if (!checkRent(response)) return;
            tg.openInvoice(response.data.result, (status) => {
                if (status === 'paid') {
                    ShowPopup('Congratulations on your purchase! The page will reload in 3 seconds', name)
                    setShowModal(false);

                    setTimeout(() => window.location.reload(), 3000)
                }
            });

            return;
        }

        if (data.coins < count) {
            tg.HapticFeedback.notificationOccurred('error');
            ShowPopup('Not enough tokens', name);
            return setShowModal(false);
        }

        let copyData = data;

        let response = await axios.post(config.url + '/api/buy-mining', {id});
        if (!checkRent(response)) return;

        infoStore.setInfo(response.data[0]);
        if (response.data[0].comboCollected.length > copyData.comboCollected.length) 
            ShowPopup(response.data[0].comboCollected.length === 3 ? 'You collected a combo of 3 farms and received a reward!' : "The farm you rented is in a secret combination! Don't stop and get a prize", 'Combo');
        
        response = await axios.post(config.url + '/api/mining');
        
        setMining(response.data);
        setShowModal(false);

        tg.HapticFeedback.notificationOccurred('success');
        ShowPopup('Congratulations on your purchase!', name);
    };

    const rentX2 = async () => {
        const tg = window.Telegram.WebApp;

        switch (currencyX2) {
            case '':
                if (data.coins < priceX2) {
                    tg.HapticFeedback.notificationOccurred('error');
                    ShowPopup('Not enough tokens', name);
                    return setShowModal(false);
                }

                let response = await axios.post(config.url + '/api/buy-mining-x2', { id });

                if (response.data.length < 1) {
                    tg.HapticFeedback.notificationOccurred('error');
                    ShowPopup('Not yet available', name);
                    return setShowModal(false);
                }

                infoStore.setInfo(response.data[0]);

                response = await axios.post(config.url + '/api/mining');
                setMining(response.data);

                tg.HapticFeedback.notificationOccurred('success');
                ShowPopup('Congratulations on your purchase!', name);
                setShowModal(false);
                
                break;

            case 'stars':
                const responseStars = await axios.post(config.url + '/api/buy-mining-x2', { id });

                if (responseStars.data?.ok === true) {
                    tg.openInvoice(responseStars.data.result, (status) => {
                        if (status === 'paid') {
                            ShowPopup('Congratulations on your purchase! The page will reload in 3 seconds', name)
                            setShowModal(false);
        
                            setTimeout(() => window.location.reload(), 3000)
                        }
                    })
                } else {
                    tg.HapticFeedback.notificationOccurred('error');
                    ShowPopup('Not yet available', name);
                    return setShowModal(false);
                }

                break;

            case 'ad':
                if (data.mining?.[id]?.x2 === true) {
                    tg.HapticFeedback.notificationOccurred('error');
                    ShowPopup('Not yet available', name);
                    return setShowModal(false);
                }

                const AdController = window.Adsgram.init({ blockId: config.blockId });

                AdController.show().then(async result => {
                    if (result.done) {
                        let response = await axios.post(config.url + '/api/buy-mining-x2', { id });

                        infoStore.setInfo(response.data[0]);

                        response = await axios.post(config.url + '/api/mining');
                        setMining(response.data);

                        tg.HapticFeedback.notificationOccurred('success');
                        ShowPopup('Congratulations on your purchase!', name);
                        return setShowModal(false);
                    }
                })

                break;
            default:
                return;
        }
    }

    const buttons = [ [`${type === 'rent' ? 'Rent' : 'Buy'} now`, handleClick] ]
    if ((priceX2 || currencyX2 === 'ad') && type === 'rent' && timeRentHours !== -1 && taskbar !== null) buttons.push([ `Buy X2 for ${currency_texts[currencyX2]}`, rentX2 ]);

    return (
        <div className="mine_item" onClick={() => {setShowModal(!(lock_need || lvl === 100))}}>
            {lock_need && (
                <div className="mine_item-locked">
                    <Lock />
                    <h1>{lock_need}</h1>
                </div>
            )}

            <div style={{ filter: lock_need ? 'blur(10px)' : '' }}>
                <div className="mine_item-info">
                    <div className="mine_item-img">
                        {icon.includes('.svg') ? 
                            <ReactSVG src={icon} />
                            :
                            <img src={icon} alt='' />
                        }
                    </div>

                    <div className="mine_item-text">
                        <h1>{name} {
                            type === 'rent' ?
                                timeRentHours === -1 ? <span>Forever</span> : <span>{timeRentHours}h</span>
                            :
                                null
                        }</h1>
                        <h2>{profit}</h2>
                    </div>
                </div>

                <h1 className='mine_item-count'>
                    {currency ? 
                        <ReactSVG src={require(`../../../../assets/svg/${stars}`)} />
                        :
                        <ReactSVG src={require(`../../../../assets/svg/${coin}`)} />
                    }
                    {
                        type === 'rent' ?
                            CutNumber(count)
                            :
                            lvl === 100 ? 'Max' : CutNumber(count)
                    }
                </h1>
            </div>
            
            {taskbar && (
                <div style={{ filter: lock_need ? 'blur(10px)' : '' }} className="mine_item-taskbar">
                    <span>{taskbar.text}</span>
                    <div className="mine_item-taskbar active" style={{ width: taskbar.width }}></div>
                </div>
            )}

            {isRented && rented && (rented.times > 0 || rented.purchased) && (
                <>
                    <div className="mine_item-line"></div>
                    <div className="mine_item-rented">
                        <h1>{rented.purchased ? 'Purchased' : `Rented: ${rented.times} times`}</h1>
                        <h2>Earned: {CutNumber(rented.earned).toUpperCase()}</h2>
                    </div>
                </>
            )}

            <ModalClass 
                showModal={showModal}
                setShowModal={setShowModal}
                icon={icon}
                title={`${name}${type === 'rent' ? '' : ' mining'}`}
                br='100%'
                subtitle={`Earn ${profit.toLocaleString('en')}${type === 'rent' ? (timeRentHours === -1 ? ' Forever' : ` for ${timeRentHours} hours`) : ''}`}
                lvl={type === 'rent' ? null : `lvl ${lvl + 1}`}
                price={lvl === 100 ? 'Max' : CutNumber(count)}
                currency_icon={currency === 'stars' ? 'stars.svg' : null}
                buttons_text={
                    {left: 'Current profit', right: `${profit.toLocaleString('ru')}`}
                }
                buttons={buttons}
            />
        </div>
    );
});

export default MineItem;
