import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BonusList from "../Bonus/BonusList";
import BackBtn from "../BackBtn";

const Rewards = () => {
    const navigate = useNavigate();

    useEffect(() => BackBtn('/', navigate), []);

    return (
        <div className='up'>
            <div className="rewards_header">
                <h1>Daily rewards</h1>
                <h2>Collect your daily rewards and free coins here</h2>
            </div>

            <div className="bonuses" style={{ marginTop: '32px' }}>
                <BonusList rank={true} />
            </div>
        </div>
    )
};

export default Rewards;