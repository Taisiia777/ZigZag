import axios from 'axios';
import config from '../../config';
import { observer } from "mobx-react-lite";
import infoStore from '../../stores/infoStore';

import { UpdateContext } from '../../contexts/UpdateTime';

import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Energy } from '../../assets/svg/energy.svg';

import CutNumber from '../CutNumber';
import ClickerAction from './ClickerAction';
import ClickerSwimmer from "./ClickerSwimmer";
import ShowPopup from '../ShowPopup';

const Clicker = observer(({ colorsBefore }) => {
    const navigate = useNavigate();

    const { tapsCount, setTapsCount } = useContext(UpdateContext);
    const multiplyTaps = useRef(false);
    
    const [disabled, setDisabled] = useState(false);
    const [touch, setTouch] = useState(null);
    const [swimmers, setSwimmers] = useState([]);

    let data = infoStore.getInfo();

    const createSwimmer = (e, taps) => {
        const parent = e.currentTarget.getBoundingClientRect();
        let swms = [];

        if (touch !== null && touch.length > 0) {
            for (let t of touch) {
                if (e.type === 'touchend') {
                    e.clientX = t.clientX;
                    e.clientY = t.clientY;
                }
    
                const x = e.clientX - parent.left;
                const y = e.clientY - parent.top;
    
                swms.push({x, y, taps});    
            }
        } else {
            const x = e.clientX - parent.left;
            const y = e.clientY - parent.top;

            swms.push({x, y, taps});    
        }
        
        setSwimmers([...swimmers, ...swms])
    }

    const taps = async (e, taps) => {
        let energyFormula = Math.floor(data.tapsPerClick / 100);
        energyFormula = (energyFormula === 0 ? 1 : 1 + 0.1 * energyFormula);

        if (data.energy.energy_count < energyFormula * taps) {
            taps = Math.floor(data.energy.energy_count / energyFormula)
        }

        const newEnergy = data.energy.energy_count - energyFormula * taps;
        const energy_count = newEnergy <= 0 ? 0 : newEnergy;

        data.energy = {...data.energy, energy_count};

        if (taps !== 0) {
            const unix = Math.floor(Date.now() / 1000)
            const tg = window.Telegram.WebApp;
            let tapsPerClick;
            tg.HapticFeedback.impactOccurred('medium');

            if (data.rewards.taprain !== undefined && unix < data.rewards.taprain.deactivate) {
                multiplyTaps.current = true; 
                tapsPerClick = data.tapsPerClick * data.rewards.taprain.multiplier;
            } else {
                if (multiplyTaps.current) {
                    await axios.post(config.url+'/api/tap', { taps: tapsCount })
                    setTapsCount(0);
                    multiplyTaps.current = false;
                }

                tapsPerClick = data.tapsPerClick;
            }

            setTapsCount(tapsCount => tapsCount + taps)
            data.coins += tapsPerClick * taps;
            createSwimmer(e, tapsPerClick);
        }

        infoStore.setInfo(data);
    };

    const handleClick = (e) => {
        const event = Object.assign({}, e);
        taps(event, touch === null ? 1 : Math.ceil(touch.length / 2) || 1);
    };

    const watchAd = () => {
        const unix = Math.floor(Date.now() / 1000);
        if (unix < data.lastAd + 1800) return ShowPopup('You can view ads once every 30 minutes', 'Watch Ad');

        const AdController = window.Adsgram.init({ blockId: config.blockId });

        AdController.show().then(async result => {
            if (result.done) {
                const response = await axios.post(config.url + '/api/watch-ad');

                infoStore.setInfo(response.data[0]);

                ShowPopup('You received +50.000 for viewing an ad', 'Watch Ad');
            }
        })
    }

    useEffect(() => {
        let energyFormula = Math.floor(data.tapsPerClick / 100);
        energyFormula = (energyFormula === 0 ? 1 : 1 + 0.1 * energyFormula);

        setDisabled(data.energy.energy_count < energyFormula);
    }, [data.energy.energy_count])
    
    return (
        <div className="clicker" style={
            colorsBefore[data.rank.i].length === 1 ? {
                '--shadow-button': '0px 12px 60px 10px rgba(20, 7, 33, 0.3)',
                '--background-button': 'linear-gradient(222.17deg, rgb(128, 8, 247) 5.258%,rgb(31, 2, 59) 86.14%)',

                '--shadow-before': 'inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)',
                '--background-before': 'radial-gradient(50.00% 50.00% at 50% 50%, rgb(82, 5, 158), rgb(82, 5, 158) 22.672%, rgb(67 28 105) 100%)',
            
                '--shadow-action': '0px 2px 40px 1px rgba(107, 7, 201, 0.4)',
                '--background-action': 'linear-gradient(222.92deg, rgb(128, 8, 247) -10.889%,rgb(31, 2, 59) 85.959%)',
                '--shadow-action-before': 'inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)',
                '--background-action-before': 'radial-gradient(50.00% 50.00% at 50% 50%,rgb(82, 5, 158),rgb(82, 5, 158) 22.672%,rgb(41, 3, 79) 100%)'
            } : {
                '--shadow-button': colorsBefore[data.rank.i][2][0],
                '--background-button': colorsBefore[data.rank.i][2][1],

                '--shadow-before': colorsBefore[data.rank.i][1][0],
                '--background-before': colorsBefore[data.rank.i][1][1],

                '--shadow-action-before': colorsBefore[data.rank.i][3][0],
                '--background-action-before': colorsBefore[data.rank.i][3][1],
                '--shadow-action': colorsBefore[data.rank.i][3][2],
                '--background-action': colorsBefore[data.rank.i][3][3]
            }
        }>
            <div className="clicker_header">
                <div className="clicker_coins">
                    {CutNumber(data.coins, ' ').toString().toUpperCase()}
                </div>

                <div className="clicker_level" onClick={() => navigate('/rank')}>
                    <span>{data.rank.rank}</span>
                    levels left {data.lvl % 8}/8
                </div>
            </div>
            <div className="clicker_button-container"
                onClick={window.screen.width > 768 ? handleClick : null}
                onTouchStart={(e) => setTouch(e.touches)}
                onTouchEnd={handleClick}
            >
                {swimmers.map((v, i) => 
                    <ClickerSwimmer key={i} swimmers={swimmers} setSwimmers={setSwimmers} {...v} />
                )}
                <div className={`clicker_button ${disabled ? 'disabled' : ''}`}>
                    <div className="clicker_button-img">
                        <img src={"/img/raccoons/" + (data.rank.i + 1) + '.png'} alt="" />
                    </div>
                </div>
            </div>
            <div className="clicker_actions">
                <ClickerAction icon='gift' to='/rewards' />
                <ClickerAction icon='rocket' onClick={watchAd}  />
            </div>

            <div className="clicker_energy">
                <div className="clicker_energy-text">
                    <div className="clicker_energy-info">
                        <Energy />
                        {data.energy.energy_count.toFixed(1)}<span>/{data.energy.max_energy}</span>
                    </div>

                    <div className="clicker_energy-persec">
                        +{data.energy.energy_per_second}/sec
                    </div>
                </div>

                <div className="clicker_energy-taskbar">
                    <div className="clicker_energy-taskbar active" style={{ width: data.energy.energy_count / data.energy.max_energy * 100 + '%' }}></div>
                </div>
            </div>
        </div>
    )
});

export default Clicker;