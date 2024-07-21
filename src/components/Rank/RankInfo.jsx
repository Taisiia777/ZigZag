import infoStore from '../../stores/infoStore';
import BonusList from '../Bonus/BonusList';

import { ReactComponent as ArrowRight } from '../../assets/svg/arrow_right.svg';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import RatingItem from '../Rating/RatingItem';
import Reload from '../Reload';

const RankInfo = observer(({ ranks, fetch }) => {
    let data = infoStore.getInfo();

    const [currentRank, setCurrentRank] = useState(data.rank.i + 1);

    return (ranks.length < 1 ||
        <div className="rank_info transparentus">
            <div className="rank_info-img">
                <img src={"/img/raccoons/" + currentRank + '.png'} alt="" />
            
                <div className={`rank_info-arrow arrow_right ${currentRank === 10 ? "arrow_inactive" : ""}`} onClick={() => {if (currentRank !== 10) setCurrentRank(prev => prev + 1)}}>
                    <ArrowRight />
                </div>
                <div className={`rank_info-arrow arrow_left ${currentRank === 1 ? "arrow_inactive" : ""}`} onClick={() => {if (currentRank !== 1) setCurrentRank(prev => prev - 1)}}>
                    <ArrowRight />
                </div>
            </div>

            <div className="rank_info-rank">
                <h1>{ranks[currentRank - 1][0].toUpperCase()} {currentRank === data.rank.i + 1 ? <span>lvl {data.lvl % 8}</span> : null}</h1>
            </div>
            {currentRank === data.rank.i + 1 ? (
                <div className="rank_info-taskbar">
                    <span>Levels left {data.lvl % 8}/8</span>
                    <div className="rank_info-taskbar active" style={{ width: ((data.lvl % 8) / 8) * 100 + '%' }}></div>
                </div>
            ) : null}

            <div className="bonuses" style={{ marginTop: '24px' }}>
                <BonusList />
            </div>

            <div className="rating_header">
                <div className="rating_header-text">
                    <h1>Worldwide rank</h1>
                    <h2>{ranks[currentRank - 1][2]}</h2>
                </div>

                <Reload onClick={fetch} />
            </div>

            <div className="rating_list">
                {ranks[currentRank - 1][1].map((v, i) =>
                    <RatingItem avatarId={v.avatarId} name={v.name} total={v.coins.toLocaleString('ru')} place={i + 1} />
                )}
            </div>
        </div>
    )
});

export default RankInfo;
