import axios from "axios";
import config from '../../config';
import { useEffect, useState } from "react";

import Bonus from "./Bonus";
import { observer } from "mobx-react-lite";

const BonusList = observer(({ rank }) => {
    const [rewards, setRewards] = useState({});

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.post(config.url+'/api/rewards'); 
            let newRewards = {};

            for (let i of response.data) newRewards[i.name] = i;
            setRewards(newRewards);
        }

        fetch();
    }, []);

    return (
        Object.keys(rewards).length < 1 || (
            <>
                <Bonus text='Free coins' name='freecoins' bonus={`+ ${rewards.freecoins.coins.toLocaleString('ru')}`} icon='coin' rewards={rewards} />
                <Bonus text='Tap rain' name='taprain' bonus={`${rewards.taprain.tapDurationMinutes} minutes x${rewards.taprain.tapMultiplier}`} icon='taprain' rewards={rewards} />
                {rank ? <Bonus text='Full energy' name='fullenergy' icon='fullenergy.svg' rewards={rewards} /> : null}
            </>
        )
    )
});

export default BonusList;