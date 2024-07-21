import { NavLink } from "react-router-dom";

const MiningNavItem = ({ text, to }) => { 
    return (
        <div className="mining_nav-item">
            {to ? <NavLink to={to}>{text}</NavLink> : <a href='#'>{text}</a>}
        </div>
    )
};

export default MiningNavItem;