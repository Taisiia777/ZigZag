import axios from 'axios';
import config from '../../config';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import RankHeader from "./RankHeader";
import RankInfo from "./RankInfo";
import BackBtn from "../BackBtn";

const Rank = () => {
    const navigate = useNavigate();

    const [ranks, setRanks] = useState([]);

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/ranks');

        setRanks(response.data);

        for (let i=1; i<10; i++) {
            const img = new Image();
            img.src = config.url + '/img/raccoons/' + i + '.png';
        }
    }

    useEffect(() => {BackBtn('/', navigate); fetch()}, []);

    return (
        <div className='up'>
            <RankHeader />
            <RankInfo ranks={ranks} fetch={fetch} />
        </div>
    )
};

export default Rank;