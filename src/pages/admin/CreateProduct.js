import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';
const {Option} =Select

const CreateProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");




     //get all cat
     const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error(`Something wwent wrong in getting catgeory ${error}`);
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
      //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/create-product");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
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
        <h1>Create Product</h1>
        <div className="m-1 w-75">
          <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
          {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))} 
          </Select>
                  </div>

          <div className="mb-3 w-75">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}  hidden/>
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3 w-75">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='form-control' placeholder='Write a Name' />
              </div>
              <div className="mb-3 w-75">
                <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className='form-control' placeholder='Write a product description' />
              </div>
              <div className="mb-3 w-75">
                <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className='form-control' placeholder='Enter Price' />
              </div>
              <div className="mb-3 ">
                <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='form-control' placeholder='Enter Quantity' />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}> CREATE PRODUCT</button>
              </div>
       
    </div>
  </div>

  </div>
</div>
</Layout>
</>
  )
}

export default CreateProduct;