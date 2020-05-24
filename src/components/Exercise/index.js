import React, {useEffect, useState} from "react";
import {getAuth} from "../../services/utils";

export default function Exercise({match}) {
    const [exercise, setExercise] = useState({})

    useEffect(() => {
        fetch('/api/exercise/' + match.params.id, {
            headers: {
                'Authorization': 'Basic ' + getAuth()
            }
        })
            .then(response => response.json())
            .then(exercise => {setExercise(exercise)})
    }, [match.params.id]);

    return (
        <div className='Exercise'>
            <h1>{exercise.title}</h1>
            <p>{exercise.description}</p>
        </div>
    )
}