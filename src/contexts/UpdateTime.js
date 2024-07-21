import axios from 'axios';
import config from '../config';
import infoStore from "../stores/infoStore";
import { createContext, useEffect, useRef, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
    const [tapsCount, setTapsCount] = useState(0);

    const tapsTimer = useRef(0);
    const updateTimer = useRef(0);

    const updateData = () => {
        let data = infoStore.getInfo();
        if (data.energy.energy_count <= data.energy.max_energy) {
            const newEnergy = data.energy.energy_per_second;
            const fullEnergy = data.energy.energy_count + newEnergy;
            
            data = {...data, energy: {...data.energy, energy_count: fullEnergy > data.energy.max_energy ? data.energy.max_energy : fullEnergy}}
        }

        if (Object.keys(data.mining).length > 0) {
            const unix = Math.floor(Date.now() / 1000);

            for (let i of Object.keys(data.mining)) {
                const mining = data.mining[i];

                if (mining['type'] === 'mining') {
                    const profitPerHour = Math.ceil(mining['award'] / mining['hours_award']);
                    const profitPerSeconds = Math.ceil(profitPerHour / 3600);

                    data.coins += profitPerSeconds;
                } else if (mining['type'] === 'rent') {
                    if (unix > (mining['time_rent'] + mining['time_rent_hours'] * 3600) && mining['time_rent_hours'] !== -1) continue;

                    let multiplier = 1;
                    const profitPerHour = mining['time_rent_hours'] === -1 ? Math.ceil(mining['award'] / mining['hours_award']) : Math.ceil(mining['award'] / mining['time_rent_hours']);
                    const profitPerSeconds = Math.ceil(profitPerHour / 3600);
                    if (mining?.x2 === true) multiplier = 2;

                    data.coins += profitPerSeconds * multiplier;
                }
            }
        }

        infoStore.setInfo(data);
    };

    useEffect(() => {
        if (updateTimer.current) clearTimeout(updateTimer);

        updateTimer.current = setInterval(updateData, 1000);

        return () => clearInterval(updateTimer.current);
    }, []);

    useEffect(() => {
        clearTimeout(tapsTimer.current);

        const timer = setTimeout(async () => {
            if (tapsCount !== 0) {
                setTapsCount(0);
                const response = await axios.post(config.url+'/api/tap', { taps: tapsCount });
                infoStore.setInfo({...infoStore.getInfo(), coins: response.data[0].coins, energy: response.data[0].energy});
            }
        }, 350);

        tapsTimer.current = timer;

        return () => clearTimeout(tapsTimer.current);
    }, [tapsCount])

    return (
        <UpdateContext.Provider value={{ tapsCount, setTapsCount }}>
            {children}
        </UpdateContext.Provider>
    );
};
