const SingleClansItem = ({ avatar, name, count }) => {
    return (
        <div className="single_clans-item">
            <div className="single_clans-item_info">
                <div className="single_clans-item_img">
                    <img src={`/img/avatars/${avatar}.png`} alt="" />
                </div>

                <div className="single_clans-item_text">
                    <h1>{name}</h1>
                    <h2>{count}</h2>
                </div>
            </div>
        </div>
    );
};

export default SingleClansItem;