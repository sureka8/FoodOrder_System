import React from "react";
import UseMenu from "../../../hooks/UseMenu";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const Manageitem = () => {
  const [menu, refetch] = UseMenu();

  //handle delete item
  const handleDeleteitem = (item) => {
    fetch(`http://localhost:6001/menu/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
      //  refetch();
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
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
           
            });
          }
        });
        refetch()
      });
      
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All<span className="text-green"> Menu Items</span>{" "}
      </h2>

      {/* menu table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Prices</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs">
                        <BiEdit className="text-emerald-500 text-2xl" />
                      </button>
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDeleteitem(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <MdDeleteOutline className="text-red text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manageitem;
