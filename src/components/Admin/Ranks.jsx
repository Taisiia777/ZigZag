import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Ranks = () => {
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        const fetchRanks = async () => {
            try {
                const response = await axios.post(`${config.url}/api/admin/get-ranks`);
                setRanks(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке рангов:', error);
            }
        };

        fetchRanks();
    }, []);

    const handleInputChange = (index, event) => {
        const newRanks = [...ranks];
        newRanks[index].name = event.target.value;
        setRanks(newRanks);
    };

    const handleSave = async (id, name) => {
        try {
            await axios.post(`${config.url}/api/admin/edit-rank`, { id, name });
            alert('Ранг успешно обновлен');
        } catch (error) {
            console.error('Ошибка при обновлении ранга:', error);
            alert('Ошибка при обновлении ранга');
        }
    };

    return (
        <div>
            <h1>Ranks</h1>
            {ranks.length < 1 || ranks.map((rank, index) => (
                <div key={rank.id} style={{margin: '2px 0'}}>
                    <input
                        type="text"
                        value={rank.name}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <button style={{padding: '8px', height: 'auto', marginLeft: '7px'}} onClick={() => handleSave(rank.id, rank.name)}>Сохранить</button>
                </div>
            ))}
        </div>
    );
};

export default Ranks;
