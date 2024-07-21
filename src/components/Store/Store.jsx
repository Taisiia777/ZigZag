import axios from 'axios';
import config from '../../config';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StoreItem from "./StoreItem";
import BackBtn from "../BackBtn";

const Store = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState([]);

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/store');

        setStore(response.data);
    };

    useEffect(() => {
        BackBtn('/', navigate);

        fetch();
    }, []);

    return (
        <div className='up'>
            <div className="store_header">
                <h1>ZigZag Store</h1>
                <h2>Boost your earning with exclusive packs!</h2>
            </div> 

            {store.length < 1 || (
                <div className="store_list transparentus">
                    {store.map((v, i) =>
                        <StoreItem key={i} id={v.id} setStore={setStore} store={true} item={v.name} lvl={v.lvl} type={v.award_type} currency={v.currency} award={v.award} price={v.price} icon={config.url + `/${v.image}`} taskbar={{text: `${v.lvl}/50 lvl`, width: `${(v.lvl / 50) * 100}%`}} lock_need={v.locked ? v.locked_text : null} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Store;