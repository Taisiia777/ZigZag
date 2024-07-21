import config from '../../../../config';

import MineItem from "./MineItem";

const Mine = ({ mining, setMining }) => {
    return (mining.length < 1 ||
        <div className="mine_list transparentus impulse_left">
            {mining.map((v, i) => {
                if (v.type !== 'mining') return null;
                return <MineItem key={i} type={v.type} id={v.id} icon={config.url + `/${v.image}`} name={v.name} lvl={v.lvl} currency={v.currency} profit={`${(v.award * (v.lvl + 1)).toLocaleString('ru')}/${v.hoursAward}h`} count={v.price} taskbar={{width: `${v.lvl}%`, text: `${v.lvl}/100 lvl`}} lock_need={v.locked ? v.locked_text : null} setMining={setMining} />
            })}
        </div>
    )
};

export default Mine;