import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyandPolicy from './pages/PrivacyandPolicy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import Admindashboard from './pages/admin/Admindashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';


function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/serach" element={<Search />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/category/:slug" element={<CategoryProduct />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/product/:slug" element={<ProductDetails />} />

    <Route path='/dashboard' element={<PrivateRoute/>}>
<Route path="user" element={<Dashboard />} />
<Route path="user/profile" element={<Profile />} />
<Route path="user/orders" element={<Orders />} />
    </Route>

<Route path='/dashboard' element={<AdminRoute/>}>
  
  <Route path="admin" element={<Admindashboard />} />
  <Route path="admin/create-category" element={<CreateCategory />} />
  <Route path="admin/create-product" element={<CreateProduct />} />
  <Route path="admin/product/:slug" element={<UpdateProduct />} />
  <Route path="admin/products" element={<Products />} />
</Route>
  

    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy&policy" element={<PrivacyandPolicy />} />
    <Route path="*" element={<Pagenotfound />} />
   </Routes>
   </>
  );
}

export default App;
