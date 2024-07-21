import axios from 'axios';
import config from '../../config';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BackBtn from "../BackBtn";
import TasksBanners from "./TasksBanners";
import TasksList from "./TasksList";
import Reload from "../Reload";
import Banners from '../Banners/Banners';

const Tasks = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [banners, setBanners] = useState([]);

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/tasks');

        setTasks(response.data);
    }

    const fetchBanners = async () => {
        const response = await axios.post(config.url + '/api/banners');

        setBanners(response.data);
    }

    useEffect(() => {BackBtn('/', navigate); fetch(); fetchBanners()}, []);

    return (
        <div className='up'>
            <div className="tasks_title">
                <h1>Daily Tasks</h1>
                <h2>Complete Daily Tasks and Earn Rewards!</h2>
            </div>

            <Banners type='tasks' style={{ marginTop: '32px' }} banners={banners} />

            <div className="tasks_header">
                <h1>Our tasks <span>{tasks.length}</span></h1>

                <Reload onClick={fetch} />
            </div>

            {tasks.length < 1 || <TasksList tasks={tasks} fetchTasks={fetch} />}
        </div>
    )
};

export default Tasks;