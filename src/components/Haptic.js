import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Haptic = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const tg = window.Telegram.WebApp;

        tg.HapticFeedback.impactOccurred('medium');
    }, [pathname]);

    return null;
};

export default Haptic;