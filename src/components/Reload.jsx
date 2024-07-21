import { useState } from "react";
import { ReactComponent as ReloadIcon } from '../assets/svg/reload.svg';

const Reload = ({ onClick }) => {
    const [reload, setReload] = useState(false);

    const onReload = () => {
        if (reload) return;
        
        setReload(true);

        if (onClick) onClick();

        setTimeout(() => setReload(false), 5000);
    }

    return <ReloadIcon className={reload ? 'rotate' : ''} style={{cursor: 'pointer'}} width='21px' height='21px' onClick={onReload} />
};

export default Reload;