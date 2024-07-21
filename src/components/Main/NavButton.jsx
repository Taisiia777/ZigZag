import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';

const NavButton = ({text, icon, to}) => {
    const navigate = useNavigate();

    return (
        <button className="nav_button" onClick={() => navigate(to)}>
            <ReactSVG src={require(`../../assets/svg/${icon}.svg`)} />
            {text}
        </button>
    )
};

export default NavButton;