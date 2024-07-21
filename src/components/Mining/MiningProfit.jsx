import CutNumber from '../CutNumber';

const MiningProfit = ({ profit }) => {
    return (
        <div className="mining_profit">
            <h1>Profit per hour</h1>
            <h2>{CutNumber(profit)}</h2>
        </div>
    );
};

export default MiningProfit;