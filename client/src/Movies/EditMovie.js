import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import axios from "axios";


const EditMovie = props => {
    const [formState, setFormState] = useState({});
    const {id} = useParams();
    const {push} = useHistory();

    useEffect(() => {
        const findMovie = props.movieList.find(movie => 
            `${movie.id}` === id);
            if(findMovie) {
                setFormState(findMovie);
            }
    }, [props.movieList, id]);

    const changeHandler = e => {
        e.persist();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        console.log(formState);
        axios.put(`http://localhost:5000/api/movies/${id}`, formState)
            .then(res => {
                console.log(res);
                push(`/movie-list/${id}`)
            })
            .catch(err => console.log(err));
        setFormState({});
    };

    return (
        <div className="editForm">
            <h1>Edit Movie</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="title">Title: </label>
                <input 
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={changeHandler}
                ></input>
                <br/>

                <label htmlFor="director">Director: </label>
                <input 
                    type="text"
                    name="director"
                    value={formState.director}
                    onChange={changeHandler}
                ></input>
                <br/>

                
                <label htmlFor="metascore">Metascore: </label>
                <input 
                    type="number"
                    name="metascore"
                    value={formState.metascore}
                    onChange={changeHandler}
                ></input>
                <br/>

                                
                <label htmlFor="stars">Stars: </label>
                <input 
                    type="text"
                    name="stars"
                    value={formState.stars}
                    onChange={changeHandler}
                ></input>
                <br/>

                <button type="submit">Submit</button>

            </form>
        </div>
    );
};

export default EditMovie;