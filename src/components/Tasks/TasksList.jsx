import config from "../../config";
import TasksItem from "./TasksItem";

const TasksList = ({ tasks, fetchTasks }) => {
    return (
        <div className='tasks_list transparentus'>
           {/*  <TasksItem icon='ads' task='Watch Ads' award='20 000' />
            <TasksItem icon='hmf' task='Hyper mining farm' hint='Forever (lvl1)' award='1 000 000/5h' instead_arrow='3' instead_arrow_icon='stars' />
            <TasksItem icon='smf' task='Super mining farm' hint='3h' award='1 000 000' taskbar={{width: '50%', text: '2 hours left'}} done={true} /> */}
            {tasks.map((v, i) => 
                <TasksItem fetchTasks={fetchTasks} key={i} id={v.id} type={v.type} icon={config.url + '/' + v.img} task={v.name} award={v.award} done={v.completed} chatId={v.chatId} />
            )}
        </div>
    )
};

export default TasksList;