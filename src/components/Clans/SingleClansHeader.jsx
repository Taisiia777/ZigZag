import { ReactComponent as Peoples } from '../../assets/svg/peoples.svg';
import infoStore from '../../stores/infoStore';

const SingleClansHeader = ({ leave, name, img, place, persons, count }) => {
    const invite = () => {
        const inviteUrl = `https://t.me/ZigZagWorldBot/zigzag?startapp=` + infoStore.getInfo().clan;
        window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${inviteUrl}`)
    };
    
    return (
        <div className="single_clans-header">
            <div className="single_clans-img">
                <img src={img} alt="" />
            </div>

            <h1>{name}</h1>
            {/* <h2>#{place}</h2> */}

            <div className="single_clans-info">
                <h2 className='single_clans-info_persons'>{persons}</h2>
                <div className='vertical_line'></div>
                <h2 className='single_clans-info_count'>{count}</h2>
            </div>

            <div className="single_clans-buttons">
                <button className='single_clans-buttons_leave' onClick={leave}>Leave Clan</button>
                <button className='single_clans-buttons_persons' onClick={invite}><Peoples /></button>
            </div>
        </div>
    )
};

export default SingleClansHeader;
