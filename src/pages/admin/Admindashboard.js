import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../context/auth';

const Admindashboard = () => {
  const [auth]= useAuth();
  return (
<>
<Layout title={'admin dashboard'}>
<div>
  <div className="container-fluid">
  <div className="row">
    <div className="col-md-3">
      <AdminMenu/>
    </div>
    <div className="col-md-9">
      <h1>{auth?.user?.name}</h1>
      <h1>{auth?.user?.email}</h1>
      <h1>{auth?.user?.phone}</h1>
    </div>
  </div>

  </div>
</div>
</Layout>
</>
  )
}

export default Admindashboard;