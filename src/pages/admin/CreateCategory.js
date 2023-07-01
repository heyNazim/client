import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/forms/CategoryForm';
import { Modal } from "antd";



const CreateCategory = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("nishani",JSON.parse( localStorage.getItem("auth")))
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name},
      {headers: localStorage.getItem("auth")}
      );

      if(data?.success){
        toast.success(`${name} is Created`);
        getAllCategory();
      }else{
        toast.error(`${data.name} is not Created`)
      }
    } catch (error) {
      console.log(error);
      toast.error("SOMETHING WENT WRONG IN INPUT FORM")
    }
  }

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
 //update category
 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
      { name: updatedName }
    );
    if (data?.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message, "nazim");
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
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
        <h1>Manage Category by Admin </h1>
        <div className="p-3">
          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
        </div>
    <table class="table table-dark table-striped w-50">
      <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
  
      { categories?.map((c)=>(
        <tr>
          <td key={c._id}>{c.name}</td>
          <td><button className='btn btn-primary mx-2' onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}} >Edit</button>
          <button className="btn btn-danger ms-2" onClick={() => {handleDelete(c._id)}}> Delete</button></td>
        </tr>
        )) }
    </tbody>
</table>
   
    </div>
    <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}>

<CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
    </Modal>
  </div>

  </div>
</div>
</Layout>
</>
  )
}

export default CreateCategory;