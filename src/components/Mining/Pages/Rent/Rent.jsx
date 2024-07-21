import infoStore from '../../../../stores/infoStore';
import config from '../../../../config';
import MineItem from "../Mine/MineItem";
import Banners from '../../../Banners/Banners';
import ComboItem from '../Rent/ComboItem';

import { observer } from 'mobx-react-lite';

const Rent = observer(({ mining, setMining, banners }) => {
    let data = infoStore.getInfo();

    return (
        <div className='impulse_right'>
            <div className="combo_items">
                {mining.length < 1 || (
                    <>
                        <ComboItem i={0} comboCollected={data.comboCollected} mining={mining} />
                        <ComboItem i={1} comboCollected={data.comboCollected} mining={mining} />
                        <ComboItem i={2} comboCollected={data.comboCollected} mining={mining} />
                    </>
                )} 
            </div>

            <Banners type='rent' banners={banners} style={{marginTop: '39px'}} />

            {mining.length < 1 || (
                <div className="mine_list" style={{ marginTop: '24px' }}>
                    {mining.map((v, i) => {
                        if (v.type !== 'rent') return null;
                        const unix = Math.floor(Date.now() / 1000);
                        const rentEnd = data.mining?.[v.id] ? data.mining[v.id].time_rent + data.mining[v.id].time_rent_hours * 3600 : null;
                        const rentRemainingHours = rentEnd ? ((rentEnd - unix) / 3600).toFixed(1) : null;

                        return <MineItem key={i} type={v.type} id={v.id} icon={config.url + `/${v.image}`} name={v.name} lvl={v.lvl} currency={v.currency} profit={v.timeRentHours === -1 ? `+${v.award.toLocaleString('ru')}/${v.hoursAward}h` : '+' + v.award.toLocaleString('ru') } timeRentHours={v.timeRentHours} count={v.startPrice} taskbar={
                            data.mining?.[v.id] && unix < rentEnd ? (data.mining[v.id].time_rent_hours === -1 ? null : { width: `${100 - (((unix - data.mining[v.id].time_rent) / (rentEnd - data.mining[v.id].time_rent)) * 100)}%`, text: `${rentRemainingHours} hours left` }) : null
                        } lock_need={v.locked ? v.locked_text : null} setMining={setMining} x2={v.x2} currencyX2={v.currencyX2} priceX2={v.priceX2} rented={
                            { 
                                times: v.uses,
                                earned: v.timeRentHours === -1 ? Math.ceil((Math.floor(Date.now() / 1000) - v.time_rent) * (v.award / v.hoursAward / 3600)) : v.award * v.uses, 
                                purchased: v.timeRentHours === -1
                            }
                        } isRented={v.rented} />
                    })}
                </div>
            )}
        </div>
    );
});

export default Rent;