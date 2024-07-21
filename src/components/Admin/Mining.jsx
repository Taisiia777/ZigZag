import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Mining = () => {
    const [formData, setFormData] = useState({
        type: 'mining',
        name: '',
        currency: 'tokens',
        award: '',
        startPrice: '',
        multiplyPrice: '',
        needLvl: '',
        hoursAward: '',
        timeRentHours: '',
        priceX2: '',
        currencyX2: 'null',
        image: null,
    });
    const [miningItems, setMiningItems] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'currencyX2' && (value === 'null' || value === 'stars' || value === 'ad')) {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: e.target.value,
            });
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            if (key === 'currency' && formData[key] === 'tokens') {
                data.append('currency', null);
            } else if ((key === 'needLvl' || key === 'timeRentHours' || key === 'priceX2') && formData[key].trim() === '') {
                data.append(key, null);
            } else if (key === 'currencyX2' && (formData[key] === 'null' || formData[key] === 'ad' || formData[key] === 'stars')) {
                data.append('currencyX2', formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            await axios.post(`${config.url}/api/admin/new-mining`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Элемент успешно добавлен в майнинг');
            fetchMiningItems();  // Refresh the list
        } catch (error) {
            console.error('Ошибка при добавлении элемента в майнинг:', error);
            alert('Ошибка при добавлении элемента в майнинг');
        }
    };

    const fetchMiningItems = async () => {
        try {
            const response = await axios.post(`${config.url}/api/admin/get-mining`);
            setMiningItems(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке майнинга:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${config.url}/api/admin/delete-mining`, { id });
            alert('Элемент успешно удален');
            fetchMiningItems();  // Refresh the list
        } catch (error) {
            console.error('Ошибка при удалении элемента из майнинга:', error);
            alert('Ошибка при удалении элемента из майнинга');
        }
    };

    useEffect(() => {
        fetchMiningItems();
    }, []);

    return (
        <div>
            <h1>Mining</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="mining">Mining</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Currency:</label>
                    <select name="currency" value={formData.currency} onChange={handleChange} required>
                        <option value="tokens">Tokens</option>
                        <option value="stars">Stars</option>
                    </select>
                </div>
                <div>
                    <label>Award:</label>
                    <input type="number" name="award" value={formData.award} onChange={handleChange} required />
                </div>
                <div>
                    <label>Start Price:</label>
                    <input type="number" name="startPrice" value={formData.startPrice} onChange={handleChange} required />
                </div>
                <div>
                    <label>Multiply Price:</label>
                    <input type="number" name="multiplyPrice" value={formData.multiplyPrice} onChange={handleChange} required />
                </div>
                <div>
                    <label>Need Level (опционально):</label>
                    <input type="text" name="needLvl" value={formData.needLvl} onChange={handleChange} />
                </div>
                <div>
                    <label>Hours Award:</label>
                    <input type="number" name="hoursAward" value={formData.hoursAward} onChange={handleChange} required />
                </div>
                <div>
                    <label>Time Rent Hours (опционально) (если навсегда, укажите -1):</label>
                    <input type="number" name="timeRentHours" value={formData.timeRentHours} onChange={handleChange} />
                </div>
                <div>
                    <label>Price X2 (опционально):</label>
                    <input type="number" name="priceX2" value={formData.priceX2} onChange={handleChange} />
                </div>
                <div>
                    <label>Currency X2 (Null - это токены):</label>
                    <select name="currencyX2" value={formData.currencyX2} onChange={handleChange} required>
                        <option value="null">Null</option>
                        <option value="stars">Stars</option>
                        <option value="ad">Ad</option>
                    </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleFileChange} required />
                </div>
                <button type="submit">Добавить элемент</button>
            </form>
            <h2>Текущие элементы</h2>
            <ul>
                {miningItems.map(item => (
                    <li key={item.id}>
                        [{item.id}] [{item.type}] {item.name}
                        <button onClick={() => handleDelete(item.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mining;
