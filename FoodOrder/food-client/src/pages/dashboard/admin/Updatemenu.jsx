import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';

const Updatemenu = () => {
    const item=useLoaderData();
    console.log(item)
    const { register, handleSubmit,reset } = useForm();

    const axiosPublic=useAxiosPublic();

    const naviget=useNavigate();

    //image hosting key
    const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
   // console.log(image_hosting_key)
   const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    
      const onSubmit = async (data) => {
        
       console.log(data)
       const imageFile={image:data.image[0]};

       const hostingimage=await axiosPublic.post(image_hosting_api,imageFile, {
        headers:{
            "content-type": "multipart/form-data",
        }
       });

       //console.log(hostingimage)
      if(hostingimage.data.success){
        const menuitem={
            name: data.name,
          category: data.category,
          price: parseFloat(data.price), 
          recipe: data.recipe,
          image: hostingimage.data.data.display_url
        };
        
       // console.log(menuitem)
       fetch(`http://localhost:6001/menu/${item._id}` ,{
        method:"PATCH",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(menuitem)
    }).then(res =>res.json()).then(data =>{
       // console.log(data)
       //alert("Book Update Successfully!!")
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item update successfullu",
        showConfirmButton: false,
        timer: 1500
      });
      naviget("/dashboard/manage-item")
       reset();

    })
       
      }
    
    };
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update This<span className="text-green"> Menu Items</span>{" "}
      </h2>

      {/* form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <div className="label">
              <span className="label-text">Recip Name</span>
            </div>
            <input
              type="text"
              defaultValue={item.name}
              {...register("name", { required: true })}
              placeholder="Recip Name"
              className="input input-bordered w-full "
            />
          </div>
          {/* 2nd row  */}
          {/*category */}
          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Choose Category</span>
              </label>
              <select 
              {...register("category", { required: true })}
              
              className="select select-bordered" defaultValue={item.category}>
                <option disabled >
                  Select
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            {/* price */}
            <div className="form-control w-full ">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                defaultValue={item.price}
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/* 3rd row */}
          <div>
            <div className="form-control my-6">
              <label className="label">
                <span className="label-text">Recip Details</span>
              </label>
              <textarea
              defaultValue={item.recipe}
              {...register("recipe", { required: true })}
                className="textarea textarea-bordered h-24"
                placeholder="About your resipe"
              ></textarea>
            </div>
          </div>

          {/*4th row */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text">Choost the image</span>
              
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full max-w-xs"
            />   
          </div>

          <button className="btn bg-green text-white my-5 px-6"> Update Item<FaUtensils/> </button>
        </form>
      </div>
    </div>
  )
}

export default Updatemenu