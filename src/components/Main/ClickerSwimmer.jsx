import { useEffect, useState } from "react";

const ClickerSwimmer = ({ x, y, taps, swimmers, setSwimmers }) => {
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
        const time = setTimeout(() => {
            setVisible(false);

            if (swimmers.length >= 30) {
                setSwimmers([]);
            }
        }, 999);

        return () => clearTimeout(time);
    }, []);

    if (!visible) return null;
    return (
        <h1 className='clicker_swimmer' style={{ top: y - 21, left: x - 30 }}>+{taps}</h1>
    )
};

export default ClickerSwimmer;