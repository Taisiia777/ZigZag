import axios from "axios";
import config from "../../config";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MiningNav from "./MiningNav";
import Mine from './Pages/Mine/Mine';
import Rent from './Pages/Rent/Rent';
import BackBtn from "../BackBtn";
import MiningProfit from "./MiningProfit";

const Mining = () => {
    const navigate = useNavigate();

    const [mining, setMining] = useState([]);
    const [banners, setBanners] = useState([]);

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/mining');

        setMining(response.data);
    };

    const fetchBanners = async () => {
        const response = await axios.post(config.url + '/api/banners');

        setBanners(response.data);
    }

    useEffect(() => {navigate('/mining/mining'); BackBtn('/', navigate); fetch(); fetchBanners()}, [])

    return (
        <div className="up">
            <MiningProfit profit={mining[0] || '0'} />
            <MiningNav />

            <Routes>
                <Route path='/mining' element={<Mine mining={mining} setMining={setMining} />} />
                <Route path='/rent' element={<Rent mining={mining} setMining={setMining} banners={banners} />} />
            </Routes>
        </div>
    );
};

export default Mining;