import config from "../../config";
import axios from "axios";

import { useNavigate, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Rewards from "./Rewards";
import Store from "./Store";
import Rank from "./Ranks"
import Combo from "./Combo";
import Mining from "./Mining";
import Banners from "./Banners";
import Tasks from "./Tasks";

const Admin = () => {
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    
    const fetch = async () => {
        const response = await axios.post(config.url + '/api/admin/init');

        setView(response.data.status === 'logged');
    };

    useEffect(() => fetch(), []);

    return (view &&
        <>
            <div className="admin_nav">
                <button onClick={() => navigate('/adminbubaduba0/store')}>Store</button>
                <button onClick={() => navigate('/adminbubaduba0/rewards')}>Rewards</button>
                <button onClick={() => navigate('/adminbubaduba0/ranks')}>Ranks</button>
                <button onClick={() => navigate('/adminbubaduba0/mining')}>Mining</button>
                <button onClick={() => navigate('/adminbubaduba0/combo')}>Combo</button>
                <button onClick={() => navigate('/adminbubaduba0/banners')}>Banners</button>
                <button onClick={() => navigate('/adminbubaduba0/tasks')}>Tasks</button>
            </div>

            <div className="admin_content">
                <Routes>
                    <Route path='store' element={<Store />} />
                    <Route path='rewards' element={<Rewards />} />
                    <Route path='ranks' element={<Rank />} />
                    <Route path='combo' element={<Combo />} />
                    <Route path='mining' element={<Mining />} />
                    <Route path='banners' element={<Banners />} />
                    <Route path='tasks' element={<Tasks />} />
                </Routes>
            </div>
        </>
    );
}

export default Admin;