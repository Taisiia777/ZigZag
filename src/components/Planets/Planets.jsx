import axios from 'axios';
import config from '../../config';
import { observer } from "mobx-react-lite";
import infoStore from "../../stores/infoStore";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Main/Header";
import PlanetsItem from "./PlanetsItem";
import BackBtn from "../BackBtn";

const Planets = observer(() => {
    const navigate = useNavigate();

    const [planetsCount, setPlanetsCount] = useState({});

    const fetch = async () => {
        const response = await axios.post(config.url + '/api/planets-count');
        
        setPlanetsCount(response.data);
    }

    useEffect(() => {BackBtn('/', navigate); fetch()}, []);

    return (
        <>
            <Header />

            <h1 className="planet_header up">Change your planet</h1>

            <div className="planet_list up">
                {Object.keys(planetsCount).length < 1 || 
                    config.planets_list.map((v, i) => 
                        <PlanetsItem key={i} index={i} {...v} total={planetsCount[v.name].count} persons={planetsCount[v.name].persons} current={infoStore.getInfo().planet === v.name} />
                    )
                }
            </div>
        </>
    )
});

export default Planets;