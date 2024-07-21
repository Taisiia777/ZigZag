import React, { useEffect, useState } from "react";

import { ReactComponent as Close } from '../../assets/svg/close.svg';

import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

const Modal = ({ onClose, br, icon, currency_icon, title, subtitle, price, lvl, buttons, buttons_text, clan, connect_wallet }) => {
    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(false);
    const coin = 'coin.svg';
    const isPlanet = icon.includes('planets');

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.HapticFeedback.impactOccurred('medium')

        let backBtn = tg.BackButton;
        backBtn.show();
        backBtn.onClick(() => {
            onClose();
            backBtn.hide();
            navigate('/');
        } );
    }, []);

    return (
        <div className='modal transparentus'>
            <Close className='modal_close' onClick={(e) => {e.stopPropagation(); onClose()}} />
            <div className="modal_content">
                <div className="modal_img" style={isPlanet ? {minHeight: '200px', minWidth: '200px'} : {maxHeight: '120px', maxWidth: '120px'}}>
                    {icon.includes('.svg') ? 
                        (icon.includes('uploads') ? <ReactSVG src={icon} beforeInjection={(svg) => svg.setAttribute('style', 'border-radius: ' + br)} /> : <ReactSVG src={require(`../../assets/svg/${icon}`)} beforeInjection={(svg) => svg.setAttribute('style', 'border-radius: ' + br)} />)
                        :
                        <img src={icon} alt='' style={isPlanet ? {width: '240px', height: '211px', objectFit: 'cover'} : {borderRadius: br}} />
                    }
                </div>

                <h1 className="modal_title" style={isPlanet ? {marginTop: 0} : null}>{title}</h1>
                {subtitle && <h2 className="modal_subtitle">{subtitle}</h2>}
                {lvl && <h2 className="modal_lvl">{lvl}</h2>}
                {clan && <div className="single_clans-info">
                    <h2 className='single_clans-info_persons'>{clan.persons}</h2>
                    <div className='vertical_line'></div>
                    <h2 className='single_clans-info_count'>{clan.count}</h2>
                </div>}

                {price && <h1 className="modal_price">
                    <ReactSVG src={require(`../../assets/svg/${currency_icon ? currency_icon : 'coin.svg'}`)} />
                    {price}
                </h1>}
            </div>

            <div className="modal_buttons">
                {buttons_text && (
                    <div className="modal_buttons-header">
                        <h1>{buttons_text.left}</h1>
                        <h2>
                            {buttons_text.right_icon ? 
                                (buttons_text.right_icon.includes('.svg') ? <ReactSVG src={require('../../assets/svg/' + buttons_text.right_icon)} /> : <img src={buttons_text.right_icon} alt='' />)
                                :
                                <ReactSVG src={require(`../../assets/svg/${coin}`)} />
                            }
                            {buttons_text.right}
                        </h2>
                    </div>
                )}
                {connect_wallet ? buttons[0] : (
                    buttons.map((v, i) => {
                        if (!v) return null;
                        return <button disabled={disabled} className={`no_active ${v[0].includes('[s]') ? 'secondary' : ''}`} onClick={
                            v[1] ? async (e) => {
                                if (disabled) return;
                                e.stopPropagation();

                                setDisabled(true);
                                await Promise.resolve(v[1]());
                                setDisabled(false);
                            } : null
                        }>
                            {v[0].includes('[s]') ? v[0].replace('[s]', '') : v[0]}
                        </button>
                    })
                )}
            </div>
        </div>
    );
};

export default Modal;