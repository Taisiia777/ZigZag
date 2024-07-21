import config from "../../config";
import { observer } from "mobx-react-lite";
import infoStore from "../../stores/infoStore";
import { useNavigate } from "react-router-dom"

import CutNumber from "../CutNumber";

const Clan = observer(({ clan, setClan }) => {
    const navigate = useNavigate();

    const clickHandle = () => navigate(infoStore.getInfo().clan ? '/clans/my' : '/clans');

    return (
        <div className="clan" onClick={clickHandle} style={Object.keys(clan).length < 1 ? {justifyContent: 'center'} : null}>
            {Object.keys(clan).length > 1 ? (
                <>
                    <div className="clan_info">
                        <div className="clan_img">
                            <img src={config.url + '/' + clan.imgPath} alt="" />
                        </div>
                        <div className="clan_name">{clan.name}</div>
                    </div>
                    <div className="clan_coins">{CutNumber(clan.total_coins, ' ').toUpperCase()}</div>
                </>
            ) : (
                <span style={{color: '#fff'}}>Choose a clan or create your own</span>
            )}
        </div>
    )
});

export default Clan;