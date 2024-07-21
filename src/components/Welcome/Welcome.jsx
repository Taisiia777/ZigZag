import axios from 'axios';
import config from '../../config';

import { useEffect } from 'react';

import PlanetsItem from '../Planets/PlanetsItem';

const Welcome = () => {
    useEffect(() => {
        const auth = async () => {
            const response = await axios.post(config.url+'/api/info');
            if (response.data.length > 0) {
                document.location.href = '/';
            }
        }

        auth();
    }, []);

    return (
        <>
            <div className="welcome_header">
                <div className="welcome_header-img">
                    <img src="/img/raccoon_welcome.png" alt="" />
                </div>

                <h2>Welcome to</h2>
                <h1>ZIGZAG UNIVERSE</h1>

                <div className="line"></div>

                <h2>Choose your planet</h2>
            </div>

            <div className="planet_list">
                {config.planets_list.map((v, i) => 
                    <PlanetsItem key={i} i={i} {...v} total={null} reg={true} />
                )}
            </div>
        </>
    )
};

export default Welcome;
