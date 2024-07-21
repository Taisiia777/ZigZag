import config from '../../config';

const Banners = ({ type, banners, style }) => {
    return (banners.find(i => i.type === type)) === undefined || (
        <div className="banners" style={style}>
            {banners.map((v, i) => {
                if (type !== v.type) return null;
                return <div key={i} className="banners_item">
                    <img src={config.url + `/uploads/banners/${window.screen.width > 398 ? v.big_image : v.small_image}`} alt='' />
                </div>
            })}
        </div>
    );
};

export default Banners;