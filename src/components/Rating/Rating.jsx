import axios from 'axios';
import config from '../../config';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Reload from "../Reload";
import RatingItem from "./RatingItem";
import BackBtn from "../BackBtn";

const Rating = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState({});

    const fetch = async () => {
        let response = await axios.post(config.url+'/api/rating');

        setRating(response.data);
    };

    useEffect(() => {
        BackBtn('/', navigate);

        fetch();
    }, []);

    return (
        <div className='up'>
            <h1 className='rating_title'>Worldwide rating</h1>

            {Object.keys(rating).length < 1 || (
                <div className='transparentus'>
                    <RatingItem name={rating.rating[rating.rating.length - 1].name} total={rating.rating[rating.rating.length - 1].coins.toLocaleString('ru')} place={rating.rating[rating.rating.length - 1].place} avatarId={rating.rating[rating.rating.length - 1].avatarId} style={{marginTop: '32px', backgroundColor: '#661FAD51'}} />

                    <div className="rating_header">
                        <div className="rating_header-text">
                            <h1>Worldwide players</h1>
                            <h2>{rating.count.toLocaleString('ru')}</h2>
                        </div>
        
                        <Reload onClick={fetch} />
                    </div>
        
                    <div className="rating_list">
                        {
                            rating.rating.slice(0, -1).map((v, i) => 
                                <RatingItem key={i} name={v.name} total={v.coins.toLocaleString('ru')} place={i + 1} avatarId={v.avatarId} />
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
};

export default Rating;