import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Rewards = () => {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        fetchRewards();
    }, []);

    const fetchRewards = async () => {
        try {
            const response = await axios.post(`${config.url}/api/admin/get-rewards`);
            setRewards(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных о наградах:', error);
            // Можно добавить обработку ошибки, например, вывод сообщения об ошибке
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedRewards = [...rewards];
        updatedRewards[index][field] = value;
        setRewards(updatedRewards);
    };

    const handleSave = async (name) => {
        const reward = rewards.find(item => item.name === name);
        if (!reward) return;

        try {
            await axios.post(`${config.url}/api/admin/edit-reward`, reward);
            alert(`Награда ${name} успешно сохранена`);
        } catch (error) {
            console.error(`Ошибка при сохранении награды ${name}:`, error);
            alert(`Ошибка при сохранении награды ${name}`);
        }
    };

    return (
        <>
            <h1>Rewards</h1>
            {rewards.length < 1 || rewards.map((reward, index) => (
                <div key={index}>
                    <h3>{reward.name}</h3>
                    <div>
                        {reward.delay && (
                            <div>
                                <label>Задержка (секунды):</label>
                                <input
                                    type="number"
                                    value={reward.delay}
                                    onChange={(e) => handleInputChange(index, 'delay', e.target.value)}
                                />
                            </div>
                        )}
                        {reward.coins !== null && (
                            <div>
                                <label>Монеты:</label>
                                <input
                                    type="number"
                                    value={reward.coins}
                                    onChange={(e) => handleInputChange(index, 'coins', e.target.value)}
                                />
                            </div>
                        )}
                        {reward.tapMultiplier !== null && (
                            <div>
                                <label>Множитель нажатия:</label>
                                <input
                                    type="number"
                                    value={reward.tapMultiplier}
                                    onChange={(e) => handleInputChange(index, 'tapMultiplier', e.target.value)}
                                />
                            </div>
                        )}
                        {reward.tapDurationMinutes !== null && (
                            <div>
                                <label>Длительность нажатия (минуты):</label>
                                <input
                                    type="number"
                                    value={reward.tapDurationMinutes}
                                    onChange={(e) => handleInputChange(index, 'tapDurationMinutes', e.target.value)}
                                />
                            </div>
                        )}
                        {reward.energyMax !== null && (
                            <div>
                                <label>Максимальная энергия:</label>
                                <input
                                    type="number"
                                    value={reward.energyMax}
                                    onChange={(e) => handleInputChange(index, 'energyMax', e.target.value)}
                                />
                            </div>
                        )}
                        {reward.energyDelayMinutes !== null && (
                            <div>
                                <label>Задержка энергии (минуты):</label>
                                <input
                                    type="number"
                                    value={reward.energyDelayMinutes}
                                    onChange={(e) => handleInputChange(index, 'energyDelayMinutes', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <button onClick={() => handleSave(reward.name)}>Сохранить</button>
                </div>
            ))}
        </>
    );
}

export default Rewards;
