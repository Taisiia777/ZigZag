import axios from 'axios';
import config from '../../config';
import infoStore from '../../stores/infoStore';

import { observer } from 'mobx-react-lite';
import ShowPopup from '../ShowPopup';
import { ReactSVG } from 'react-svg';

const Bonus = observer(({ text, bonus, icon, name, rewards }) => {
    let data = infoStore.getInfo();
    const remaining = name === 'fullenergy' ?
        data.rewards[name]?.available === 0 ?

        (data.rewards[name]?.activate + rewards[name].delay) - Math.floor(Date.now() / 1000)
        :
        (data.rewards[name]?.activate + rewards[name].energyDelayMinutes * 60) - Math.floor(Date.now() / 1000)
        
        :
        
        data.rewards[name]?.activate + rewards[name].delay - Math.floor(Date.now() / 1000);

    const handleClick = () => {
        if (remaining > 0) return;

        const fetch = async () => {
            const response = await axios.post(config.url+'/api/take-reward', { name });
            if (!response.data[0].error) {
                infoStore.setInfo(response.data[0])
                ShowPopup('Congratulations on receiving your daily reward!', 'Daily reward');
            };
        };

        fetch();
    };

    return (
        <div className="bonus transparentus">
            <div className="bonus_info">
                <div className="bonus_img">
                    {icon.includes('.svg') ? 
                        <ReactSVG src={require(`../../assets/svg/${icon}`)} />
                        :
                        <img src={`/img/bonuses/${icon}.png`} alt="" />
                    }
                </div>

                <div className="bonus_text">
                    <h1>{text}</h1>
                    <h2>
                        {
                            name === 'fullenergy' ? 
                            
                            `${data.rewards.fullenergy?.available === 0 && remaining < 0 ? '4' : data.rewards.fullenergy?.available.toString() || 4}/${rewards.fullenergy?.energyMax} available`

                            :

                            bonus
                        }
                    </h2>
                </div>
            </div>

            <button style={remaining > 0 ? {opacity: '0.5'} : null} onClick={handleClick}>
                {remaining > 0 ? 
                    `Wait ${remaining > 3600 ? (remaining / 3600).toFixed(1) + 'h' : (remaining / 60).toFixed(1) + 'm'}`
                    :
                    'Collect'}
            </button>
        </div>
    );
});

export default Bonus;