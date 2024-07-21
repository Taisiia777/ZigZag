const ShowPopup = (msg, title) => {
    const tg = window.Telegram.WebApp;

    tg.showPopup({title: title, message: msg, buttons: [{type: 'ok', text: 'OK'}]});
};

export default ShowPopup;