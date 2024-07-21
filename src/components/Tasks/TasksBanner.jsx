const TasksBanner = ({ title, text, color, title_color, text_color, icon }) => {
    return (
        <div className="tasks_banner" style={{ backgroundColor: color }}>
            <div className="tasks_banner-text">
                <h1 style={{ color: title_color }}>{title}</h1>
                <h2 style={{ color: text_color }}>{text}</h2>
            </div>

            <div className="tasks_banner-img">
                <img src={`/img/${icon}.png`} alt="" />
            </div>
        </div>
    )
};

export default TasksBanner;