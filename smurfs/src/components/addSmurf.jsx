import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Actions//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


export const GET_VILLAGE = "GET_VILLAGE";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_TOGGLE = "GET_TOGGLE";
export const ADD_SMURF = "ADD_SMURF";
export const REMOVE_SMURF = "REMOVE_SMURF";


export const getDisplay = () => dispatch => {
  dispatch({ type: GET_TOGGLE });
  axios
    .get("http://localhost:3333/smurfs")
    .then(res => {
      console.log(res);
      dispatch({ type: GET_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_TOGGLE, payload: err }));
};

export const addSmurf = newSmurf => dispatch => {
  axios
    .post(`http://localhost:3333/smurfs/`, newSmurf)
    .then(res => dispatch({ type: ADD_SMURF, payload: res.data }));
};

export const removeSmurf = smurfID => dispatch => {
  axios
    .delete(`http://localhost:3333/smurfs/${smurfID}`)
    .then(res => dispatch({ type: REMOVE_SMURF, payload: res.data }));
};



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Components//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Adding//////////////////////////////////////////////


export function AddSmurf() {
  const [smurf, setSmurf] = useState({
    name: "",
    height: 0,
    age: 0
  });

  const dispatch = useDispatch();

  const handleChange = e => {
    setSmurf({ ...smurf, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
    e.preventDefault();
    const newSmurf = {
      ...smurf,
      id: Math.random()
    };
    dispatch(addSmurf(newSmurf));
    setSmurf({
      name: "",
      height: 0,
      age: 0
    });
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="name"
        value={smurf.name}
        placeholder="Enter Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="height"
        placeholder="Height"
        onChange={handleChange}
      />
      <input type="text" name="age" placeholder="Age" onChange={handleChange} />
      <button type="submit">Add Smurf! or wehatever you want...</button>
    </form>
  );
}


//////////////////////////////////Display//////////////////////////////////////////////

export const Display = () => {
  const store = useSelector(state => state.asyncReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDisplay());
  }, []);

  return (
    <div>
      {store.smurfs.map(smurf => {
        return (
          <div key={smurf.id}>
            <p>{smurf.name}</p>
            <p>{smurf.height}</p>
            <p>{smurf.age}</p>
            <p>{smurf.id}</p>
            <button onClick={() => dispatch(removeSmurf(smurf.id))}>X</button>
          </div>
        );
      })}
    </div>
  );
};