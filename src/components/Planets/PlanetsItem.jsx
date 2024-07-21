import infoStore from '../../stores/infoStore';

import { useState } from 'react';

import axios from 'axios';
import config from '../../config';

import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';
import ModalClass from '../Modal/ModalClass';
import { ReactSVG } from 'react-svg';
import CutNumber from '../CutNumber';

const PlanetsItem = ({ index, text, total, persons, icon, current, name, reg }) => {
    const [showModal, setShowModal] = useState(false);

    const register = async () => await axios.post(config.url+'/api/reg', { planet: name });
    
    const handleClick = async () => {
        if (reg) {
            await register();
            document.location.href = '/';
            return;
        };
        if (name === infoStore.getInfo().planet) return;

        let data = infoStore.getInfo()

        data.planet = name;
        infoStore.setInfo(data);

        const response = await axios.post(config.url+'/api/change-planet', { planet: name });
        infoStore.setInfo(response.data[0]);
        setShowModal(false);
        document.location.href = '/'
    }

    return (
        <div className="planet_item" onClick={() => {
            if (reg) return handleClick();
            if (name !== infoStore.getInfo().planet) setShowModal(true);
        }} style={{ opacity: current ? '0.5' : '1' }}>
            <div className="planet_item-info">
                <div className="planet_item-img">
                    <ReactSVG src={require(`../../assets/svg/planets/${icon}.svg`)} />
                </div>

                <div className="planet-item_text">
                    <h1>{text}</h1>
                    {current ? (<h2 style={{ color: 'var(--green-color)' }}>Current</h2>) : (total !== null && <h2 className='active'>{CutNumber(total, ' ')}</h2>)}
                </div>
            </div>
            <div className="planet_item-arrow">
                <Arrow opacity='0.5' />
            </div>

            <ModalClass 
                showModal={showModal}
                setShowModal={setShowModal}
                /* icon={`/img/planets/big/${name}.png`} */
                icon={`planets/big/${name}.svg`}
                title={`Join ${text} planet`}
                subtitle={`#${index + 1}`}
                clan={{persons: CutNumber(persons), count: CutNumber(total)}}
                buttons={[['Join Planet', handleClick]]}
            />
        </div>
    )
};

export default PlanetsItem;