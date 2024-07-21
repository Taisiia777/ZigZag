const RentBanner = ({ title, subtitle, count }) => {
    return (
        <div className="rent_banner">
            <div className="rent_banner-info">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <h3>+{count}</h3>
            </div>
        </div>
    );
};

export default RentBanner;