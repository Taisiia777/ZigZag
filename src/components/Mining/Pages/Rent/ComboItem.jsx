import config from '../../../../config';
import { ReactSVG } from 'react-svg';
import Question from './Question';
import { useEffect } from 'react';

const ComboItem = ({ i, comboCollected, mining }) => {
    const colors = ['#08F7DA', '#D8B3FC', '#FEC83C'];

    const miningItem = mining.find(k => k.id === comboCollected[i])

    useEffect(() => {
        console.log(miningItem);
        console.log(mining);
        console.log(comboCollected);
    }, []);

    return (
        <div className="combo_item">
            <div className="combo_item-img">
                {comboCollected[i] === undefined ? (
                    <>
                        <Question fill={colors[i]} />
                        <Question fill={colors[i]} />
                    </>
                ) : (
                    miningItem.image.includes('.svg') ? <ReactSVG src={require(config.url + `/${miningItem.image}`)} /> : <img src={config.url + `/${miningItem.image}`} alt='' />
                )}
            </div>

            <h2>{comboCollected[i] === undefined ? 'No card yet' : miningItem.name}</h2>
        </div>
    )
};

export default ComboItem;