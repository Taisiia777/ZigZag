import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Banners = () => {
    const [formData, setFormData] = useState({
        type: 'rent',
        big_image: null,
        small_image: null,
    });
    const [banners, setBanners] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBigImageChange = (e) => {
        setFormData({
            ...formData,
            big_image: e.target.files[0],
        });
    };

    const handleSmallImageChange = (e) => {
        setFormData({
            ...formData,
            small_image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('type', formData.type);
        data.append('big_image', formData.big_image);
        data.append('small_image', formData.small_image);

        try {
            await axios.post(`${config.url}/api/admin/new-banner`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Баннер успешно добавлен');
            fetchBanners();  // Refresh the list
        } catch (error) {
            console.error('Ошибка при добавлении баннера:', error);
            alert('Ошибка при добавлении баннера');
        }
    };

    const fetchBanners = async () => {
        try {
            const response = await axios.post(`${config.url}/api/admin/get-banners`);
            setBanners(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке баннеров:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${config.url}/api/admin/delete-banner`, { id });
            alert('Баннер успешно удален');
            fetchBanners();  // Refresh the list
        } catch (error) {
            console.error('Ошибка при удалении баннера:', error);
            alert('Ошибка при удалении баннера');
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <div>
            <h1>Banners</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="rent">Rent</option>
                        <option value="tasks">Tasks</option>
                        <option value="friends">Friends</option>
                    </select>
                </div>
                <div>
                    <label>Big Image:</label>
                    <input type="file" name="big_image" onChange={handleBigImageChange} required />
                </div>
                <div>
                    <label>Small Image:</label>
                    <input type="file" name="small_image" onChange={handleSmallImageChange} required />
                </div>
                <button type="submit">Сохранить</button>
            </form>
            <h2>Список баннеров</h2>
            <ul>
                {banners.map(banner => (
                    <li key={banner.id}>
                        <img src={`${config.url}/uploads/banners/${banner.big_image}`} alt="" />
                        <img src={`${config.url}/uploads/banners/${banner.small_image}`} alt="" />
                        <button onClick={() => handleDelete(banner.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Banners;
