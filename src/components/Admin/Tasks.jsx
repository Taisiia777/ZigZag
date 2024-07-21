import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Tasks = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'mining',
        award: '',
        img: null,
        chatId: null,
        miningId: null,
        friendsCount: null
    });
    const [tasks, setTasks] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            img: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post(`${config.url}/api/admin/new-task`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Задание успешно добавлено');
            fetchTasks(); // Обновить список заданий
        } catch (error) {
            console.error('Ошибка при добавлении задания:', error);
            alert('Ошибка при добавлении задания');
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.post(`${config.url}/api/admin/get-tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке заданий:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${config.url}/api/admin/delete-task`, { id });
            alert('Задание успешно удалено');
            fetchTasks(); // Обновить список заданий
        } catch (error) {
            console.error('Ошибка при удалении задания:', error);
            alert('Ошибка при удалении задания');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="mining">Mining</option>
                        <option value="friends">Friends</option>
                        <option value="link">Link</option>
                        <option value="tg">Telegram</option>
                        <option value="connect_wallet">Connect Wallet</option>
                        <option value="watch_ads">Watch Ads</option>
                    </select>
                </div>
                <div>
                    <label>Name (опционально):</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Award:</label>
                    <input type="number" name="award" value={formData.award} onChange={handleChange} required />
                </div>
                {formData.type !== 'mining' && (
                    <div>
                        <label>Image:</label>
                        <input type="file" name="img" onChange={handleFileChange} />
                    </div>
                )}
                <div>
                    <label>Chat ID (опционально):</label>
                    <input type="text" name="chatId" value={formData.chatId} onChange={handleChange} />
                </div>
                {formData.type === 'mining' && (
                    <div>
                        <label>Mining ID (опционально):</label>
                        <input type="text" name="miningId" value={formData.miningId} onChange={handleChange} />
                    </div>
                )}
                {formData.type === 'friends' && (
                    <div>
                        <label>Friends Count (опционально):</label>
                        <input type="number" name="friendsCount" value={formData.friendsCount} onChange={handleChange} />
                    </div>
                )}
                <button type="submit">Добавить задание</button>
            </form>
            <h2>Текущие задания</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        [{task.id}] [{task.type}] {task.name ? task.name : `Mining ID: ${task.miningId}`}
                        <button onClick={() => handleDelete(task.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
