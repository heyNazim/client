import React from 'react';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [auth, setAuth]= useAuth();
    
    const navigate = useNavigate()
    const location = useLocation();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
            if(res && res.data.success){
                toast.success(res.data.message)
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/');
              }else{
                toast.error(res.data.message)
              }
        } catch (error) {
          console.log(error)
          toast.error("Something went Wrong")
        }
       }
  return (
    <>

    <Layout title={'Login'}>
        <div className="re-log">

  <form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" className="form-control" id="exampleInputEmail" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" className="form-control" id="exampleInputPassword1" required />
  </div>



  <button type="submit" className="btn btn-primary">Submit</button>
  <div className="d-flex">
  <NavLink to={'/register'}>Create Account </NavLink>
  <NavLink to={'/forgot-password'}> Forgot Password</NavLink>
  </div>


</form>
        </div>

    </Layout>
    </>
  )
}

export default Login