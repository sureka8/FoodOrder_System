//card is import the menu pages

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from 'axios';
import Usecarts from "../hooks/Usecarts";

const Card = ({ item }) => {
  const { name, image, price, recipe, _id } = (item);

  const [isHeartFillted, setIsHeartFillted] = useState(false);

  const { user } = useContext(AuthContext);
  const [cart, refetch] = Usecarts();

  //dederatic the signup page
  const navigate = useNavigate();
  const location = useLocation();

  //add to card button
  const handleAddtocart = item => {
    if (user && user?.email) {
      const cardItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      }

      //add to the card item to the db
    /* fetch("http://localhost:6001/carts", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cardItem),
      })
        .then((res) => res.json())
        .then((data) => {
          //alert card
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Adad card",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });*/
        axios.post('http://localhost:6001/carts', cardItem)
        .then((response) => {
          //console.log(response);
          if(response){
            refetch(); // refetch cart
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Food added on the cart.',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
        })
        .catch( (error) => {
          //console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    
    // do you havent account sho allert
    else {
      Swal.fire({
        title: "Please login?",
        text: "Without an account can't able to add card!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup  Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup"), { state: { from: location } };
        }
      });
    }
  };

  //card click

  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar  bg-green ${
          isHeartFillted ? "text-rose-500" : "text-white" } `}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>


      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          {" "}
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2 ">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtocart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
