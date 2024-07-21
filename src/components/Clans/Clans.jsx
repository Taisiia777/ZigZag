import axios from 'axios';
import config from '../../config';
import infoStore from '../../stores/infoStore';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Reload from "../Reload";
import ClansHeader from "./ClansHeader";
import ClansItem from "./ClansItem";
import BackBtn from "../BackBtn";
import { observer } from 'mobx-react-lite';

const Clans = observer(() => {
    const navigate = useNavigate();

    const [clans, setClans] = useState([]);

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/clans');

        setClans(response.data);
    };

    useEffect(() => {
        if (infoStore.getInfo().clan) return document.location.href = config.url + '/clans/my';
        
        BackBtn('/', navigate);
        fetch();
    }, []);

    return (
        <div className='up'>
            <ClansHeader />

            <div className="clans_list-header">
                <h1>Clans <span>{clans.length}</span></h1>

                <Reload onClick={fetch} />
            </div>
            {clans.length < 1 || (
                <div className="clans_list transparentus">
                    {clans.map((v, i) =>
                        <ClansItem key={i} place={i + 1} chatId={v.chatId} name={v.name} avatar={config.url + '/' + v.imgPath} count={v.total_coins} total_members={v.total_members} />
                    )}
                </div>
            )}
        </div>
    );
});

export default Clans;