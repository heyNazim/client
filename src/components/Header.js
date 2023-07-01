import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast';
import SearchInput from './forms/SearchInput';
import useCategory from '../hooks/useCategory';
import { useCart } from '../context/cart';
import { Badge } from 'antd';

const Header = () => {
  const categories = useCategory();
  const [auth, setAuth]= useAuth();
    const [cart] = useCart();
  const logOut = ()=>{
    setAuth({
      ...auth, user:null, token:''
    })
localStorage.removeItem('auth')
toast.success(`${auth.user.name} Logout Success`)
  }
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <SearchInput/>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     
        <li className="nav-item">

          <NavLink className="nav-link active" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active"  to="/about">About</NavLink>
        </li>
        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/categories`}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>


        {/* <li className="nav-item">
          <NavLink className="nav-link active"   to="/privacy&policy">Privacy And Policy</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link active" to="/contact">Contact Us</NavLink>
        </li>

            { 
              !auth.user ? (<>

                <li className="nav-item">
          <NavLink className="dropdown-item" to="/login">LOGIN</NavLink>
        </li>
                <li className="nav-item">
          <NavLink className="nav-link active" to="/register">REGISTER</NavLink>
        </li>

              </>) : (
                 <>
                 <li className="nav-item dropdown">
                   <NavLink
                     className="nav-link dropdown-toggle"
                     href="#"
                     role="button"
                     data-bs-toggle="dropdown"
                     style={{ border: "none" }}
                   >
                     {auth?.user?.name}
                   </NavLink>
                   <ul className="dropdown-menu">
                     <li>
                       <NavLink
                         to={`/dashboard/${
                           auth?.user?.role === 1 ? "admin" : "user"
                         }`}
                         className="dropdown-item"
                       >
                         Dashboard
                       </NavLink>
                     </li>
                     <li>
                       <NavLink
                         onClick={logOut}
                         to="/login"
                         className="dropdown-item"
                       >
                         Logout
                       </NavLink>
                     </li>
                     
                   </ul>
                 </li>
               </>
              )
            }
               <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
   
      </ul>
   
    </div>
  </div>
</nav>

    </>
  )
}

export default Header