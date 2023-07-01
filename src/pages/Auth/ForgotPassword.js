import React from 'react';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail]= useState('');
    const [newpassword, setNewpassword]= useState('');
    const [answer, setAnswer]= useState('');
    
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
              email, newpassword, answer
            });
            if(res){
                toast.success(res.data && res.data.message)
                navigate('/login');
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
    <Layout title={'forgot password'}>
        <div className="re-log">

  <form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" className="form-control" id="exampleInputEmail" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
    <input value={newpassword} onChange={(e)=>setNewpassword(e.target.value)}  type="password" className="form-control" id="exampleInputPassword1" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputAnswer" className="form-label">Your Faviourate Sport</label>
    <input value={answer} onChange={(e)=>setAnswer(e.target.value)}  type="password" className="form-control" id="exampleInputAnswer" required />
  </div>



  <button type="submit" className="btn btn-primary">Submit</button>
  <div className="d-flex">
  <NavLink to={'/register'}>Create Account </NavLink>
  </div>


</form>
        </div>

    </Layout>
  </>
  )
}

export default ForgotPassword