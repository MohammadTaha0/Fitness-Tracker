import React, { useEffect, useState } from 'react'
import AuthUtils from '../Utils/AuthUtils';
import Auth from '../services/authServices';
import Avator from '../../public/avator.jpg';
export default function Profile({ loader, setLoader, alert_, setMsgs, setTypes }) {
  const { authAxios } = Auth();
  const [name, setName] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [note, setNote] = useState();
  const [data, setData] = useState([]);
  // const display_data = (res) => {
  //   for (const data of res.data) {

  //   }
  // }
  const fetching_data = async () => {
    const res = await authAxios.get("get-workout");
    if (res.data.status === 200) {
      console.log(res.data.data)
      setData(res.data.data);
    }
  }
  useEffect(() => {
    fetching_data();
  }, []);
  const handleSaveWorkout = async (e) => {
    e.preventDefault();
    try {

      setMsgs([]);
      setTypes([]);

      if (!name) {
        alert_("Name Is required", 'danger');
      }

      if (!sets) {
        alert_("set Is required", 'danger');
      }
      if (!reps) {
        alert_("reps Is required", 'danger');
      }

      if (!weight) {
        alert_("Weight Is required", 'danger');
      }
      // if (!note) {
      //   alert_("Note Is required", 'danger');
      // }
      if (!name || !sets || !reps || !weight) {
        return false;
      }
      let formData = {
        name: name,
        sets: sets,
        reps: reps,
        weight: weight,
        note: note,
      };
      console.log(formData)
      setLoader(true);

      let response = await authAxios.post("add-workout", formData);
      if (response.data.status === 200) {
        alert_(response.data.msg, 'success');
        fetching_data();
      } else if (response.data.status === 443) {
        alert_(response.data.msg, 'danger');
      }
      else if (response.data.status === 500) {
        alert_(response.data.msg, 'danger');
      }
      else {
        alert_("Something Went Wrong!", 'danger');
      }
      setLoader(false);
    }
    catch (error) {
      setLoader(false);
      alert_("Something Went Wrong! ", 'danger');
      console.log(error)
    }
  }

  return (
    <>
      <div className="row justify-content-start align-items-start mx-auto position-relative" style={{ "minHeight": "90vh" }} >
        <div className="col-md-3 col-8 border rounded-3 shadow row p-3 position-fixed end-0 h-100 align-items-center" style={{ "top": "10%" , "z-index":"-1 !important"}}>
          <form onSubmit={handleSaveWorkout} className="input-group mx-0 px-0 gap-3">
            <h2 className='text-center fw-bold w-100 text-primary'>Workout <i className='fa-light fa-dumbbell'></i></h2>

            {
              !loader ?
                <>
                  <select name="name" id="name" placeholder='Name' className='form-select text-capitalize' value={name} onChange={(e) => setName(e.target.value)}>
                    <option value="">Select Workout Name</option>
                    <option value="strength">strength</option>
                    <option value="cardio">cardio</option>
                  </select>
                  <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} className='form-control w-100' placeholder='Sets' />

                  <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className='form-control w-100' placeholder='Reps' />

                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className='form-control w-100' placeholder='Weight' />

                  <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className='form-control w-100' placeholder='Note' />

                  <button type='submit' className='btn btn-outline-primary w-100'><i className='fa-light fa-check-circle'></i> Save </button></> : <>
                  <div className="col text-center d-flex  gap-2 justify-content-center align-items-center">
                    <span className='spinner-border border-1 '></span> Please Wait
                  </div>
                </>
            }
          </form>
        </div>
        <div className="row mx-0 px-0 row-cols-md-3 row-cols-1 col-md-9 col-4 gy-2">
          {data.map((data_, index) => (
            <div className="col p-1" key={index}>
              <div className="border shadow p-1  text-center  position-relative rounded-3 border-dark">

                <h4 className='p-0 m-0 text-capitalize py-3 text-dark fw-bold'>{data_.name}</h4>

                <div className='h6'>Sets: {data_.sets}</div>
                <div className='h6'>Reps: {data_.reps}</div>
                <div className='h6'>Weight: {data_.weight}</div>
                {data_.note ?
                  <div className='h6 text-bg-primary rounded-pill badge fw-normal'>Note: {data_.note}</div> : <></>

                }
                {
                  data_.created_at ?
                    <div className="h6 badge fw-normal text-dark bg-info position-absolute top-0 end-0">{new Date(data_.created_at)?.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</div>
                    :
                    <></>
                }
                {
                  data_.created_at?.toString() !== data_.updated_at?.toString() ?
                    <>
                      <div className="h6 badge fw-normal text-dark bg-info ms-1 position-absolute start-0 top-0">Modified: {new Date(data_.updated_at)?.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</div>
                    </>
                    : <></>
                }
              </div>
            </div>
          ))}


        </div>
      </div>
    </>
  )
}
