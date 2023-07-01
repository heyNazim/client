import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/UserMenu';

const Orders = () => {
  const [auth]= useAuth();
  return (
<>
<Layout title={'admin dashboard'}>
<div>
  <div className="container-fluid">
  <div className="row">
    <div className="col-md-3">
      <UserMenu/>
    </div>
    <div className="col-md-9">
        <h1>Category</h1>
      <h1>{auth?.user?.name}</h1>
   
    </div>
  </div>

  </div>
</div>
</Layout>
</>
  )
}

export default Orders;