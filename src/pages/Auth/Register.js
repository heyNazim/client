import React from 'react';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [phone, setPhone]= useState('');
    const [address, setAddress]= useState('');
    const [answer, setAnswer]= useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{
                name,email,password,phone,address,answer
            });
            if(result.data.success){
                toast.success('user Register Successfully')
                navigate('/login');
              }else{
                toast.error('Try Again')
              }
        } catch (error) {
          console.log(error)
          toast.error("ERROR IN REGISTER")
        }
       }
  return (
    <>

    <Layout title={'Register'}>
        <div className="re-log">

  <form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="Name" className="form-label">Name</label>
    <input value={name} onChange={(e)=>setName(e.target.value)}  type="text" className="form-control" id="Name" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" className="form-control" id="exampleInputEmail" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" className="form-control" id="exampleInputPassword1" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
    <input value={phone} onChange={(e)=>setPhone(e.target.value)}  type="text" className="form-control" id="exampleInputPhone" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input value={address} onChange={(e)=>setAddress(e.target.value)}  type="text" className="form-control" id="exampleInputAddress" required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputAnswer" className="form-label">Your Faviorate sport</label>
    <input value={answer} onChange={(e)=>setAnswer(e.target.value)}  type="text" className="form-control" id="exampleInputAnswer" required />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
  <NavLink to={'/login'}>Already have Accounf</NavLink>

</form>
        </div>

    </Layout>
    </>
  )
}

export default Register