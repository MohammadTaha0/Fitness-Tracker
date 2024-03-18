import React, { useEffect, useState } from 'react'
import Auth from '../services/authServices';
import '../assets/nutrition.css';
import $ from 'jquery';
import Chart from 'chart.js/auto';

export default function Nutrition({ loader, setLoader, alert_, setMsgs, setTypes }) {
  const { authAxios } = Auth();
  const [nutritionDetail, setNutritionDetail] = useState();
  const [mealType, setMealType] = useState();
  const [foodItem, setFoodItem] = useState();
  const [quantity, setQuantity] = useState();
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [dId, setDId] = useState();
  const [strengthData, setStrengthData] = useState(null);
  const [cardioData, setCardioData] = useState(null);
  const [chartDates, setChartDates] = useState([]);
  const [myChart, setMyChart] = useState();
  const [myChart1, setMyChart1] = useState();

  const fetching_data = async () => {
    try {
      setLoader(true);
      const res = await authAxios.get("get-nutrition");
      if (res.data.status === 200) {
        console.log(res.data.data)
        setData(res.data.data);
      } else {
        alert_("Something Went Wrong!", 'danger');
        console.log("Something Went Wrong Fetching Data");
      }
      setLoader(false);

    } catch (err) {
      alert_("Something Went Wrong!", 'danger');
      console.log(err);
      setLoader(false);

    }
  }
  const fetch_calories = async () => {
    try {
      const res = await authAxios.get("get-nutrition-by-nutritionDetail/calories");
      if (res.data.status === 200) {
        const strength = res.data.data;
        setStrengthData(strength);

        const ctx = document.getElementById('nutrition-chart-calories');
        if (ctx) {
          const quantityData = Object.keys(strength).map(date => strength[date].quantity);
          const foodItemData = Object.keys(strength).map(date => strength[date].foodItem);
          if (myChart1) {
            myChart1.destroy();
          }
          setMyChart1(new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(strength),
              datasets: [
                {
                  label: 'Total Quantity Intake',
                  data: quantityData,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Total Food Item Intake',
                  data: foodItemData,
                  backgroundColor: 'rgba(54, 162, 235, .2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          }));
        }

      } else {
        alert_("Something Went Wrong!", 'danger');
        console.log("Something Went Wrong Fetching Data");

      }
    } catch (err) {
      alert_("Something Went Wrong!", 'danger');
      console.log(err)
    }
  }
  const fetch_macros = async () => {
    try {
      const res = await authAxios.get("get-nutrition-by-nutritionDetail/macros");
      if (res.data.status === 200) {
        const strength = res.data.data;
        setCardioData(strength);
        const ctx = document.getElementById('nutrition-chart-macros');
        if (ctx) {
          const quantityData = Object.keys(strength).map(date => strength[date].quantity);
          const foodItemData = Object.keys(strength).map(date => strength[date].foodItem);
          if (myChart) {
            myChart.destroy();
          }

          setMyChart(new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(strength),
              datasets: [
                {
                  label: 'Total Quantity Intake',
                  data: quantityData,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Total Food Item Intake', 
                  data: foodItemData,
                  backgroundColor: 'rgba(54, 162, 235, .2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          }));
        }

      } else {
        alert_("Something Went Wrong!", 'danger');
        console.log("Something Went Wrong Fetching Data");

      }
    } catch (err) {
      alert_("Something Went Wrong!", 'danger');
      console.log(err)
    }
  }
  useEffect(() => {
    fetching_data();
    fetch_calories();
    fetch_macros();

  }, []);
  const handleSave = async (e) => {
    e.preventDefault();
    try {

      setMsgs([]);
      setTypes([]);

      if (!nutritionDetail) {
        alert_("Name Is required", 'danger');
      }

      if (!mealType) {
        alert_("set Is required", 'danger');
      }
      if (!foodItem) {
        alert_("reps Is required", 'danger');
      }

      if (!quantity) {
        alert_("Weight Is required", 'danger');
      }

      if (!nutritionDetail || !mealType || !foodItem || !quantity) {
        return false;
      }
      let formData = {
        nutritionDetail: nutritionDetail,
        mealType: mealType,
        foodItem: foodItem,
        quantity: quantity,
      };
      if (id) {
        formData.id = id;
      }
      console.log(formData)
      setLoader(true);

      let response = await authAxios.post("add-nutrition", formData);
      if (response.data.status === 200) {
        alert_(response.data.msg, 'success');
        await fetching_data();
        await fetch_calories();
        await fetch_macros();
        setNutritionDetail("");
        setMealType("");
        setFoodItem("");
        setQuantity("");
        if (id) {
          document.getElementById("card-" + id)?.classList.add("highlight");
        }
        setId("");
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
  const handleDelete = async () => {
    setLoader(true);
    try {
      let formData = {
        id: dId,
      };
      let response = await authAxios.post("delete-nutrition", formData);
      if (response.data.status === 200) {
        alert_(response.data.msg, 'success');
        await fetching_data();
        await fetch_calories();
        await fetch_macros();
        setNutritionDetail("");
        setMealType("");
        setFoodItem("");
        setQuantity("");
        setId("");
        setDId("");
        document.body.classList.remove('modal-open'); // Remove modal-open class from body
        const backdrop = document.getElementsByClassName('modal-backdrop');
        if (backdrop.length > 0) {
          backdrop[0].remove(); // Remove the modal backdrop
        }
        // $(".modal").modal("hide");
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


      {dId && <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-bg-danger">
              <h5 className="modal-title fw-bold">Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className='p-0 m-0 h5 text-center'>Are You Sure?</p>
              {
                loader && <h6 className='p-0 m-0 my-1 text-center text-danger'>Processing! Please Wait <span className='spinner-border spinner-border-sm ms-1 border-1'></span></h6>
              }
            </div>
            {
              !loader &&
              <div className="modal-footer my-0 py-1 text-center d-flex justify-content-center align-items-center">
                <button type="button" className="btn btn-secondary btn-sm close-btn" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleDelete} className="btn btn-outline-danger btn-sm">Delete</button>
              </div>
            }
          </div>
        </div>
      </div>
      }

      <div className="row justify-content-center align-items-start mx-auto gy-3 mb-5 " id='nutrition-body' style={{ "minHeight": "90vh" }} >
        <div className="col-md-4 col-8 border rounded-3 shadow row p-3 align-items-center mt-4 light-bg">
          <form onSubmit={handleSave} id='form' className="input-group mx-0 px-0 gap-3">
            <h2 className='text-center fw-bold w-100 text-primary'>Nutrition <i className='fa-light fa-dumbbell'></i></h2>

            {
              !loader ?
                <>
                  <select name="nutritionDetail" id="nutritionDetail" placeholder='Name' className='form-select text-capitalize' value={nutritionDetail} onChange={(e) => setNutritionDetail(e.target.value)}>
                    <option value="">Select Nutrition Detail</option>
                    <option value="calories">calories</option>
                    <option value="macros">macros</option>
                  </select>
                  <input type="text" value={mealType} onChange={(e) => setMealType(e.target.value)} className='form-control w-100' placeholder='Meal Type' />

                  <input type="number" value={foodItem} onChange={(e) => setFoodItem(e.target.value)} className='form-control w-100' placeholder='Food Item' />

                  <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className='form-control w-100' placeholder='Quantity' />

                  <button type='submit' className='btn btn-outline-primary w-100'><i className='fa-light fa-check-circle'></i> {id ? "Edit" : "Save"} </button></> : <>
                  <div className="col text-center d-flex  gap-2 justify-content-center align-items-center">
                    <span className='spinner-border border-1 '></span> Please Wait
                  </div>
                </>
            }
          </form>
        </div>
        {strengthData &&
          <>
            <h2 className="text-center text-bg-light text-uppercase fw-bold fw-bold ">
              Calories
            </h2>
            <canvas id="nutrition-chart-calories" className='light-bgg'></canvas>
          </>
        }
        {cardioData &&
          <>
            <h2 className="text-center text-bg-light text-uppercase fw-bold fw-bold ">
              Macros
            </h2>
            <canvas id="nutrition-chart-macros" className='light-bgg chart'></canvas>
          </>
        }
        <div className="col-12 col-md-12 col-sm-12"></div>
        <div className="row mx-0 px-0 row-cols-md-5 row-cols-1 col-md-11 col-12 gy-2 justify-content-center">
          {
            loader && <span className='spinner-border spinner-border-lg border-1'></span>
          }
          {!loader && data.map((data_, index) => (
            <div className="col p-1" key={index}>
              <div className={"border shadow p-1  text-center  position-relative rounded-3 border-secondary light-bg" + (id == data_._id ? 'bg-highlight' : '')} id={`card-${data_._id}`}>

                <h4 className='p-0 m-0 text-capitalize py-3 text-dark fw-bold text-primary'>{data_.nutritionDetail}</h4>

                <div className='h6 text-secondary tooltip-inner' title="sets">Meal type: {data_.mealType}</div>
                <div className='h6 text-secondary'>Food Item: {data_.foodItem}</div>
                <div className='h6 text-secondary'>Quantity: {data_.quantity}</div>
                <div className="input-group m-0 justify-content-center gap-1">
                  <button className='btn btn-sm btn-outline-success border-0' onClick={() => {
                    setId(data_._id);
                    setNutritionDetail(data_.nutritionDetail);
                    setMealType(data_.mealType);
                    setFoodItem(data_.foodItem);
                    setQuantity(data_.quantity);
                    $('body').get(0).scrollIntoView({ behavior: 'smooth' });

                  }}><i className='fa-light fa-edit'></i> </button>
                  <button className='btn btn-sm btn-outline-danger border-0' onClick={() => {
                    setDId(data_._id);
                    setNutritionDetail("");
                    setMealType("");
                    setFoodItem("");
                    setQuantity("");
                    setId("");
                  }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className='fa-light fa-trash'></i></button>
                </div>
                {
                  data_.created_at && data_.created_at?.toString() === data_.updated_at?.toString() ?
                    <div className="h6 badge fw-normal text-dark bg-info position-absolute top-0 end-0">{new Date(data_.created_at)?.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</div>
                    :
                    <></>
                }
                {
                  data_.created_at?.toString() !== data_.updated_at?.toString() ?
                    <>
                      <div className="h6 badge fw-normal text-dark bg-info ms-1 position-absolute start-0 top-0">Modified: {new Date(data_.updated_at)?.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })} </div>
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
