import { useEffect } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

function ModalClass (props) {
    const modalRoot = document.querySelector('#root');
    const windowEl = document.querySelector('.window');

    useEffect(() => {
        if (windowEl)
            props.showModal ? windowEl.classList.add('blur') : windowEl.classList.remove('blur')
    }, [props.showModal, windowEl]);

    const close = () => {
        props.setShowModal(false);
        
        setTimeout(() => windowEl.classList.remove('blur'), 10);
    }

    return props.showModal ? createPortal(<Modal onClose={close} {...props} />, modalRoot) : null;
}

export default ModalClass;