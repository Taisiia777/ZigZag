import TasksBanner from "./TasksBanner";

const TasksBanners = () => {
    return (
        <div className="tasks_banners">
            <TasksBanner title_color='#FFFFFF' text_color='#FFFFFF' title='Complete daily tasks & win' text='Ferrari 296 GTB 2023 Vermelho' color='var(--main-color)' icon='ferrari' />

            <TasksBanner title_color='#191919' text_color='#8008F7' title='Airdrop for Most active users' text='$2 000 000' color='#F8F8FA' icon='raccoon_little' />
        </div>
    )
};

export default TasksBanners;