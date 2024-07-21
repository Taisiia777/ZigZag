import axios from 'axios';
import config from './config';
import { observer } from 'mobx-react-lite';
import infoStore from './stores/infoStore';

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ScrollTop from './components/ScrollTop';
import Haptic from './components/Haptic';

import Main from './components/Main/Main';
import Friends from './components/Friends/Friends';
import Rank from './components/Rank/Rank';
import Rewards from './components/Rewards/Rewards';
import Planets from './components/Planets/Planets';
import Rating from './components/Rating/Rating';
import Tasks from './components/Tasks/Tasks';
import Welcome from './components/Welcome/Welcome';
import Store from './components/Store/Store';
import Clans from './components/Clans/Clans';
import SingleClans from './components/Clans/SingleClans';
import Mining from './components/Mining/Mining';
import Admin from './components/Admin/Admin';

const App = observer(() => {
    const location = useLocation();

    const [clan, setClan] = useState({});
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [style, setStyle] = useState({
        'background-image': 'url("/img/splash.png")',
        '--before-color': 'none',
        'background-size': '100%',
        'background-repeat': 'no-repeat',
        'background-position': 'center'
    })

    const colorsBefore = [
        ['#8008F7'],
        ['#8008F7'],
        ['#8008F7'],
        ['#8008F7'],
        ['#8008F7'],
        ['#8008F7'],
        ['#F70808', ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'background: radial-gradient(50.00% 50.00% at 50% 50%,rgb(82, 5, 158),rgb(82, 5, 158) 22.672%,rgb(41, 3, 79) 100%)'], ['0px 12px 60px 10px rgba(20, 7, 33, 0.3)', 'linear-gradient(223.23deg, rgb(247, 8, 65) -10.889%,rgb(31, 2, 59) 85.959%)'], ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'radial-gradient(50.00% 50.00% at 50% 50%,rgb(247, 8, 65),rgb(247, 8, 65) 22.672%,rgb(247, 8, 65) 100%)', '0px 2px 40px 1px rgba(107, 7, 201, 0.4)', 'linear-gradient(222.92deg, rgb(247, 8, 65) -10.889%,rgb(31, 2, 59) 85.959%)']],
        ['#083CF7', ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'radial-gradient(50.00% 50.00% at 50% 50%,rgb(82, 5, 158),rgb(82, 5, 158) 22.672%,rgb(41, 3, 79) 100%)'], ['0px 12px 60px 10px rgba(20, 7, 33, 0.3)', 'linear-gradient(223.23deg, rgb(8, 60, 247) -10.889%,rgb(31, 2, 59) 85.959%)'], ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'rgb(8, 60, 247)', '0px 2px 40px 1px rgba(107, 7, 201, 0.4)', 'linear-gradient(222.92deg, rgb(8, 60, 247) -10.889%,rgb(31, 2, 59) 85.959%)']],
        ['#04E7E7', ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'radial-gradient(50.00% 50.00% at 50% 50%,rgb(82, 5, 158),rgb(82, 5, 158) 22.672%,rgb(41, 3, 79) 100%)'], ['0px 12px 60px 10px rgba(20, 7, 33, 0.3)', 'linear-gradient(223.23deg, rgb(4, 231, 231) -10.889%,rgb(31, 2, 59) 85.959%)'], ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'radial-gradient(50.00% 50.00% at 50% 50%,rgb(4, 231, 231),rgb(4, 231, 231) 22.672%,rgb(4, 231, 231) 100%)', '0px 2px 40px 1px rgba(107, 7, 201, 0.4)', 'linear-gradient(222.92deg, rgb(4, 231, 231) -10.889%,rgb(31, 2, 59) 85.959%)']],
        ['#04E762', ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'radial-gradient(50.00% 50.00% at 50% 50%,rgb(82, 5, 158),rgb(82, 5, 158) 22.672%,rgb(41, 3, 79) 100%)'], ['0px 12px 60px 10px rgba(20, 7, 33, 0.3)', 'linear-gradient(223.23deg, rgb(4, 231, 98) -10.889%,rgb(31, 2, 59) 85.959%)'], ['inset 0px -1.52px 1.52px 0px rgba(237, 239, 255, 0.17)', 'rgb(4, 231, 98)', '0px 2px 40px 1px rgba(107, 7, 201, 0.4)', 'linear-gradient(222.92deg, rgb(4, 231, 98) -10.889%,rgb(31, 2, 59) 85.959%)']]
    ];

    useEffect(() => {
        if (location.pathname.includes('adminbubaduba0')) return setShow(true);

        const tg = window.Telegram.WebApp;
        const initData = tg.initData;
        const initDataUnsafe = tg.initDataUnsafe;

        const tgReady = () => {
            tg.headerColor = '#141019';

            tg.ready();
            tg.expand();
            tg.BackButton.hide();
        };

        const auth = async () => {
            let response;
            await axios.post(config.url+'/api/init', {initData});

            if (document.location.href === config.url+'/welcome') return setShow(true);

            response = await axios.post(config.url+'/api/info');

            if (response.data.length === 0 && !document.location.href.includes('/api')) {
                return document.location.href = '/welcome';
            } 

            infoStore.setInfo(response.data[0]);

            if (!document.location.href.includes('/clan/my')) {
                response = await axios.post(config.url+'/api/clan');
                setClan(response.data);
            }

            if (initDataUnsafe?.start_param && !infoStore.getInfo().clan) {
                initDataUnsafe.start_param = initDataUnsafe.start_param.toString();
                if (initDataUnsafe.start_param.includes('-')) {
                    tg.onEvent('popupClosed', async ({ button_id }) => {
                        if (button_id === 'clan_yes') {
                            response = await axios.post(config.url + '/api/join-clan', { id: initDataUnsafe.start_param.toString() });
                            document.location.href = config.url + '/clans/my';
                        }
                    });
                    tg.showPopup({title: 'Clan invite', message: 'You have been invited to the clan. Would you like to accept the invitation?', buttons: [{id: 'clan_no', type: 'default', text: 'No'}, {id: 'clan_yes', type: 'default', text: 'Yes'}]})
                }
            }

            setShow(true);
        };

        tgReady();
        auth();
    }, []);

    useEffect(() => {
        let timer;
        if (show) {
            timer = setTimeout(() => setLoading(false), 2300);
        }

        return () => clearTimeout(timer);
    }, [show]);

    useEffect(() => {
        let timer;
        timer = setTimeout(() => setStyle({}), 1600);
        return () => clearTimeout(timer);
    }, []);

    let data = infoStore.getInfo();

    return (
        <>
            <div className='window' style={data?.rank?.i !== undefined ? {'--before-color': location.pathname !== '/' ? colorsBefore[0][0] : colorsBefore[data.rank.i][0], ...style} : {'--before-color': colorsBefore[0][0], ...style}}>
                <ScrollTop />
                <Haptic />
                
                {loading && (
                    <div className='loader' style={{ opacity: Object.keys(style).length < 1 ? 1 : 0 }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
                
                {show &&
                    <div className={loading ? '' : 'transparentus'} style={{ opacity: loading ? '0' : '1', position: loading ? 'absolute' : 'static' }}>
                        <Routes>
                            <Route path='/welcome' element={<Welcome />} />
                            <Route path='/' element={<Main clan={clan} setClan={setClan} colorsBefore={colorsBefore} />} />
                            <Route path='/mining/*' element={<Mining />} />
                            <Route path='/friends' element={<Friends />} />
                            <Route path='/rank' element={<Rank />} />
                            <Route path='/rewards' element={<Rewards />} />
                            <Route path='/planets' element={<Planets />} />
                            <Route path='/rating' element={<Rating />} />
                            <Route path='/tasks' element={<Tasks />} />
                            <Route path='/store' element={<Store />} />
                            <Route path='/clans' element={<Clans />} />
                            <Route path='/clans/my' element={<SingleClans />} />
 
                            <Route path='/adminbubaduba0/*' element={<Admin />} />
                        </Routes>
                    </div>
                }
            </div>
        </>
    );
});

export default App;
