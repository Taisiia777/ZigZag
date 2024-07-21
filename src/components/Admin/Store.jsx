import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Store = () => {
    const [formData, setFormData] = useState({
        name: '',
        currency: 'tokens',
        award: '',
        award_type: 'coins_per_click',
        startPrice: '',
        multiplyPrice: '',
        needLvl: '',
        image: null,
    });

    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
        fetchStoreItems();
    }, []);

    const fetchStoreItems = async () => {
        try {
            const response = await axios.post(`${config.url}/api/admin/get-store`);
            setStoreItems(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка предметов:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
            } else if (key === 'needLvl' && formData[key].trim() === '') {
                data.append('needLvl', null);
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            await axios.post(`${config.url}/api/admin/store`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Предмет успешно добавлен в магазин');
            fetchStoreItems(); // Обновляем список после добавления
        } catch (error) {
            console.error('Ошибка при добавлении предмета в магазин:', error);
            alert('Ошибка при добавлении предмета в магазин');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.post(`${config.url}/api/admin/delete-store`, { id });
            alert('Предмет успешно удален');
            fetchStoreItems(); // Обновляем список после удаления
        } catch (error) {
            console.error('Ошибка при удалении предмета:', error);
            alert('Ошибка при удалении предмета');
        }
    };

    return (
        <div>
            <h1>Store</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Валюта:</label>
                    <select name="currency" value={formData.currency} onChange={handleChange} required>
                        <option value="tokens">Tokens</option>
                        <option value="stars">Stars</option>
                    </select>
                </div>
                <div>
                    <label>Награда:</label>
                    <input type="number" name="award" value={formData.award} onChange={handleChange} required />
                </div>
                <div>
                    <label>Тип награды:</label>
                    <select name="award_type" value={formData.award_type} onChange={handleChange} required>
                        <option value="coins_per_click">Coins per Click</option>
                        <option value="energy_per_second">Energy per Second</option>
                        <option value="max_energy">Max Energy</option>
                    </select>
                </div>
                <div>
                    <label>Начальная цена:</label>
                    <input type="number" name="startPrice" value={formData.startPrice} onChange={handleChange} required />
                </div>
                <div>
                    <label>Множитель цены:</label>
                    <input type="number" name="multiplyPrice" value={formData.multiplyPrice} onChange={handleChange} required />
                </div>
                <div>
                    <label>Необходимый уровень (опционально) (сначала необходимый уровень, потом через пробел айди предмета [например, 3 1 (3 уровень 1 айди)]):</label>
                    <input type="text" name="needLvl" value={formData.needLvl} onChange={handleChange} />
                </div>
                <div>
                    <label>Изображение:</label>
                    <input type="file" name="image" onChange={handleFileChange} required />
                </div>
                <button type="submit">Добавить предмет</button>
            </form>

            <div>
                <h2>Список предметов:</h2>
                <ul>{storeItems.length < 1 ||
                        storeItems.map((item) => (
                            <li key={item.id} style={{margin: '2px 0'}}>
                                [{item.id}] {item.name}
                                <button style={{marginLeft: '5px', padding: '7px', height: 'auto'}} onClick={() => handleDeleteItem(item.id)}>/\ Удалить</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Store;
