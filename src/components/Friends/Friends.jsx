import axios from 'axios';
import config from '../../config';
import FriendsHeader from "./FriendsHeader";
import FriendsList from "./FriendsList";

import BackBtn from "../BackBtn";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Friends = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);

    const fetchBanners = async () => {
        const response = await axios.post(config.url + '/api/banners');

        setBanners(response.data);
    };

    useEffect(() => {BackBtn('/', navigate); fetchBanners();}, []);

    return (
        <div className='up'>
            <FriendsHeader banners={banners} />
            <FriendsList />
        </div>
    )
};

export default Friends;