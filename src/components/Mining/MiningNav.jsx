import MiningNavItem from "./MiningNavItem";

const MiningNav = () => {
    return (
        <div className="mining_nav">
            <MiningNavItem to='/mining/mining' text='Mining' />
            <MiningNavItem to='/mining/rent' text='Farm Rent' />
            <MiningNavItem text='NFT Boost (Soon)' />
        </div>
    )
};

export default MiningNav;