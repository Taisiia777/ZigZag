import axios from 'axios';
import config from '../../config';
import FriendsListUser from './FriendsListUser';
import Reload from '../Reload';

import { useEffect, useState } from 'react';

const FriendsList = () => {
    const [invited, setInvited] = useState([]);

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/invited');

        setInvited(response.data);
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className="friends_list">
            <div className="friends_list-header">
                <div className="friends_list-text">
                    <h1>Your friends</h1>
                    <h2>{invited[0]}</h2>
                </div>

                <div className="friends_list-reload">
                    <Reload onClick={fetch} />
                </div>
            </div>

            {invited.length < 1 || (
                <div className="friends_list-users transparentus">
                    {invited.map((v, i) => {
                        if (i === 0) return null; 
                        return <FriendsListUser key={i} avatarId={v.avatarId} name={v.name} total={v.prem ? '60 000' : '20 000'} percents={v.prem ? '5' : '2'} />
                    })}
                </div>
            )}
        </div>
    )
};

export default FriendsList;
