import React, {useEffect, useState} from "react";

const Exercise = ({match}) => {
    const [exercise, setExercise] = useState({})

    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem('auth'))
        fetch('/api/exercise/' + match.params.id, {
            headers: {
                'Authorization': 'Basic ' + auth
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

export default Exercise