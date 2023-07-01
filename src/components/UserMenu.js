import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <div>
<div className="list-group">
  <NavLink to="/" className="list-group-item list-group-item-action">
    Home
  </NavLink>
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
</div>

    </div>
  )
}

export default UserMenu 