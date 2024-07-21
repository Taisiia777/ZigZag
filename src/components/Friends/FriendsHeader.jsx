import { ReactComponent as Copy } from '../../assets/svg/copy.svg';
import Banners from '../Banners/Banners';
import ShowPopup from '../ShowPopup';

const FriendsHeader = ({ banners }) => {
    const inviteUrl = `https://t.me/ZigZagWorldBot/zigzag?startapp=`;

    const inviteFriend = () => {
        const id = window.Telegram.WebApp.initDataUnsafe.user.id;
        window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${inviteUrl}${id}`);
    };

    const copyLink = () => {
        const id = window.Telegram.WebApp.initDataUnsafe.user.id;
        navigator.clipboard.writeText(`${inviteUrl}${id}`);
        ShowPopup('Invite link copied to clipboard', 'Invite friend');
    };

    return (
        <>
            <div className="friends_header">
                <h1>Invite friends</h1>
                <h2>Invite your friends, and for every 10 invites you will receive more bonuses</h2>
            </div>

            <div className="friends_block">
                {/* <div className="friends_block-premium">
                    <div className="friends_block-premium_info">
                        <h1>Invite premium users</h1>
                        <h2>10% from every friend earnings</h2>
                        <h3>+60 000</h3>
                    </div>
                </div> */}
                <Banners type='friends' banners={banners} />

                <div className="friends_block-buttons">
                    <button className='friends_block-invite' onClick={inviteFriend}>Invite friend</button>
                    <button className='friends_block-copy' onClick={copyLink}><Copy width='23px' height='23px' /></button>
                </div>
            </div>
        </>
    )
};

export default FriendsHeader;
