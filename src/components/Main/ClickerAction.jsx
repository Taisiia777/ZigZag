import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

const ClickerAction = ({ icon, to, onClick }) => {
    const navigate = useNavigate(); 

    return (
        <div className="clicker_action" onClick={onClick ? onClick : () => navigate(to)}>
            <ReactSVG src={require(`../../assets/svg/${icon}.svg`)} />
        </div>
    )
};

export default ClickerAction;