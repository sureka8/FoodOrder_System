import React, { useContext, useState } from "react";
import Usecarts from "../../hooks/Usecarts";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const Cartpage = () => {
  //get user
  const {user} =useContext(AuthContext);

  //fetch card data from usecard oage the start menagement
  const [cart, refetch] = Usecarts();
  const [cardItems,setCardItems] =useState([])

  //calculte price
  const calculateprice=(item) =>{
    return item.price*item.quantity
  }

  //decrease item quantity
  const handledecrease=(item) =>{
   if(item.quantity>1) {
    fetch(`http://localhost:6001/carts/${item._id}`,{
      method:"PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({quantity:item.quantity-1})

    }).then(res=>res.json()) .then(data=>{
      const updatedcard=cardItems.map((cardItem)=>{
        if(cardItem.id===item.id){
          return {
            ...cardItem,
            quantity:cardItem.quantity -1
          }
          
        }
        return cardItem;
      })
      refetch()
      setCardItems(updatedcard)
    });
    refetch()
   }
   else{alert("item can't be zero")}
  };
  //increase

  const handleincrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cardItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCardItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  //total price
  const cardtotal=cart.reduce((total,item)=>{
    return total + calculateprice(item)

  },0);
  const orderTotal=cardtotal;



  //delete card
  
  const handledelete =   (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:6001/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
             Swal.fire("Deleted!", "Your file has been deleted.", "success");
           }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className="section-container">
      <div>
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
          <div className="py-24 flex flex-col  justify-items-center items-center gap-8">
            {/*text */}
            <div className="space-y-7 px-4">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
                Items <span className="text-green">Added</span> to the{" "}
                <span className="text-green">Cart</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/*table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Items Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                //show card iteam data

                cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <button onClick={() => handledecrease(item)} className="btn btn-xs ">-</button>
                    <input  type="number" value={item.quantity} className="w-10 mx-2 text-center overflow-hidden appearance-none py-5"/>  
                    <button onClick={() => handleincrease(item)} className="btn btn-xs">+</button>
                    <td>${calculateprice(item).toFixed(2)}</td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs text-red"
                        onClick={() => handledelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                ))
              }
            </tbody>
            
          </table>
        </div>
      </div>

      {/*customer details */}
      <div className="my-12">
        <div className="md:w-1/2 space-y-3 "> 
        <h3 className="font-medium">Customer Details</h3>
        <p>Name:{}</p>
        
        </div>

        <div className="md:w-1/2 space-y-3 "> 
        <h3 className="font-medium">Shoping Details</h3>
        <p>Total item:{cart.length}</p>
        <p>Total order price:${orderTotal.toFixed(2)}</p>

       <Link to="/process-checkout"> <button className="btn btn-md bg-green text-white px-8 py-1 ">
              Procceed to Checkout
            </button>
            </Link>
        

        </div>
      </div>

  
    </div>
  );
};

export default Cartpage;
