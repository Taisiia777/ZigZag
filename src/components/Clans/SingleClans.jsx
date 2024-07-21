import axios from 'axios';
import config from '../../config';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import SingleClansHeader from "./SingleClansHeader";
import SingleClansItem from "./SingleClansItem";
import Reload from "../Reload";
import BackBtn from "../BackBtn";
import CutNumber from '../CutNumber';

const SingleClans = () => {
    const navigate = useNavigate();

    const [clan, setClan] = useState({});

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/clan');

        setClan(response.data);
    };

    const leave = async () => {
        await axios.post(config.url + '/api/leave-clan');

        document.location.href = config.url + '/clans';
    }

    useEffect(() => {fetch(); BackBtn('/', navigate)}, []);

    return (Object.keys(clan).length < 1 || (
        <div className='transparentus'>
            <SingleClansHeader leave={leave} img={config.url + '/' + clan.imgPath} name={clan.name} persons={CutNumber(clan.total_members)} count={CutNumber(clan.total_coins)} />
            
            <div className="single_clans-list_header">
                <h1>Members <span>{clan.total_members}</span></h1>

                <Reload onClick={fetch} />
            </div>

            <div className="single_clans-list transparentus">
                {clan.members.map((v, i) => 
                    <SingleClansItem key={i} avatar={v.avatarId} name={v.name} count={v.coins.toLocaleString('ru')} />
                )}
            </div>
        </div>
    ));
}

export default SingleClans;
