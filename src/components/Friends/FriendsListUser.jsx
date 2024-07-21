const FriendsListUser = ({ name, total, percents, avatarId }) => {
    return (
        <div className="friends_list-user">
            <div className="friends_list-user_info">
                <div className="friends_list-user_img">
                    <img src={`/img/avatars/${avatarId}.png`} alt="" />
                </div>

                <div className="friends_list-user_text">
                    <h1>{name}</h1>
                    <h2>+{total}</h2>
                </div>
            </div>

            <div className="friends_list-user_percents">
                +{percents}%
            </div>
        </div>
    );
};

export default FriendsListUser;