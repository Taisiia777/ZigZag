import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import infoStore from '../../stores/infoStore';
import { ReactSVG } from "react-svg";

const Header = observer(() => {
    const navigate = useNavigate();
    let data = infoStore.getInfo();

    return (
        <div className="header">
            <div className="header_player" onClick={() => navigate('/rank')}>
                <div className="header_img">
                    <img src={`/img/avatars/${data.avatarId}.png`} alt="avatar" />
                </div>

                <div className="header_player-info">
                    <div className="header_nickname">{data.name}</div>
                    <div className="header_level"><span>{window.screen.width < data.rank.rank.length * 28 ? data.rank.rank.slice(0, 10) + '...' : data.rank.rank}</span> {window.screen.width > 410 ? 'lvl ' + data.lvl % 8 : ''}</div>
                </div>
            </div>
            <div className="header_planet" onClick={() => navigate('/planets')}>
                <button>
                    {/* <img src={`/img/planets/small/${data.planet}.png`} alt="" /> */}
                    <ReactSVG src={require(`../../assets/svg/planets/small/${data.planet}.svg`)} />
                    {data.planet.charAt(0).toUpperCase() + data.planet.slice(1)}
                </button>
            </div>
        </div>
    )
});

export default Header;