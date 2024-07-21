import axios from 'axios';
import config from '../../config';
import { useEffect, useState } from "react";
import ShowPopup from '../ShowPopup';

const ClansHeader = () => {
    const [chat, setChat] = useState('');

    const clanPrompt = () => {
        setChat(prompt('Enter a chat or channel tag (for example, @durov)'));
    }

    const checkChat = async () => {
        if (chat && chat.length > 0) {
            const response = await axios.post(config.url + '/api/create-clan', { id: chat });

            if (response.data?.error) 
                return ShowPopup('An error has occurred. Check the correct spelling of the channel or chat tag', 'Error');
            
            return document.location.href = config.url + '/clans/my';
            
        }
    }

    useEffect(() => {
        checkChat();
    }, [chat]);

    return (
        <div className="clans_header">
            <h1>Join to ZigZag Clans</h1>
            <h2>Join clans or create your own</h2>

            <button onClick={clanPrompt}>Create Clan</button>
        </div>
    );
};

export default ClansHeader;