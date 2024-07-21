import axios from 'axios';
import config from '../../config';
import { useState } from 'react';
import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';

import ModalClass from '../Modal/ModalClass';
import CutNumber from '../CutNumber';

const ClansItem = ({ chatId, place, name, count, avatar, total_members }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = async () => {
        await axios.post(config.url + '/api/join-clan', {id: chatId});
        document.location.href = config.url + '/clans/my';
    }; 

    return (
        <div className="clans_item" onClick={() => setShowModal(true)}>
            <div className="clans_item-info">
                <div className="clans_item-img">
                    <img src={avatar} alt="" />
                </div>

                <div className="clans_item-text">
                    <h1>{name}</h1>
                    <h2>{count.toLocaleString('ru')}</h2>
                </div>
            </div>

            <Arrow opacity='0.5' />

            <ModalClass
                showModal={showModal}
                setShowModal={setShowModal}
                icon={avatar}
                title={name}
                br='100%'
                subtitle={'#' + place}
                clan={{ persons: CutNumber(total_members), count: CutNumber(count) }}
                buttons={[['Join Clan', handleClick]]}
            />
        </div>
    );
};

export default ClansItem;
