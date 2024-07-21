const RatingItem = ({ name, total, place, style, avatarId}) => {
    return (
        <div className="rating_item" style={style}>
            <div className="rating_item-info">
                <div className="rating_item-info_img">
                    <img src={`/img/avatars/${avatarId}.png`} alt="" />
                </div>

                <div className="rating_item-info_text">
                    <h1>{name}</h1>
                    <h2>{total}</h2>
                </div>
            </div>

            <h1>#{place}</h1>
        </div>
    )
};

export default RatingItem;