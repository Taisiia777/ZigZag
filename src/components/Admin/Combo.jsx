import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Combo = () => {
    const [minings, setMinings] = useState('');
    const [award, setAward] = useState('');

    useEffect(() => {
        const fetchCombo = async () => {
            try {
                const response = await axios.post(`${config.url}/api/admin/get-combo`);
                const { minings, award } = response.data;
                setMinings(minings.join(', '));  // Convert array to comma-separated string
                setAward(award);
            } catch (error) {
                console.error('Ошибка при загрузке комбо:', error);
            }
        };

        fetchCombo();
    }, []);

    const handleSave = async () => {
        const miningsArray = minings.split(',').map(item => Number(item));
        try {
            await axios.post(`${config.url}/api/admin/edit-combo`, { minings: miningsArray, award });
            alert('Комбо успешно обновлено');
        } catch (error) {
            console.error('Ошибка при обновлении комбо:', error);
            alert('Ошибка при обновлении комбо');
        }
    };

    return (
        <div>
            <h1>Combo</h1>
            <div>
                <label>Айди майнингов (только с типом rent + максимум указать можно 3):</label>
                <input
                    type="text"
                    value={minings}
                    onChange={(e) => setMinings(e.target.value)}
                />
            </div>
            <div>
                <label>Награда (токены):</label>
                <input
                    type="number"
                    value={award}
                    onChange={(e) => setAward(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Сохранить</button>
        </div>
    );
};

export default Combo;
