const BackBtn = (to, navigate) => {
    const tg = window.Telegram.WebApp;
    const backBtn = tg.BackButton;
    backBtn.show();
    backBtn.onClick(() => {
        navigate(to);
        backBtn.hide();
    });
};

export default BackBtn;