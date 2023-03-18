import { useContext, useEffect, useState } from "react";
import "./Home.css"
import { API } from "../../services/API.js"
import { NeovetContext } from "../../context/neovetContext";
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const {login} = useContext(NeovetContext);

  const formSubmit = (formData) => {
    API.post("/staff/login", formData).then((res) => {
      console.log(res.data)
    })
  }


  const [staff, setStaff] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getStaff = () => {
    API.get("/staff").then((res) => {
      setStaff(res.data)
      setLoaded(true)
    })
  }

  useEffect(() => {
    getStaff()

  }, []);
  
  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="username">Username</label>
        <input 
        type="text" 
        id="useranme" 
        name="username" 
        {...register("username")}/>
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        id="password" 
        name="password" 
        {...register("password")}/>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Home;
