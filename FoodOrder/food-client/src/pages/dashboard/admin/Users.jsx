import React from 'react'
import {useQuery} from "@tanstack/react-query"
import { FaTrashAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";


const Users = () => {

  const {refetch,data:users=[]} =useQuery({
    queryKey: ['users'],

    queryFn: async () => {
        const res = await fetch(`http://localhost:6001/users`)

        return res.json();
       
      },
})

console.log(users)
  return (
    <div>
    <div className='flex items-center justify-between m-4 '>
      <h5>All Users</h5> 
      <h5>Total Users:{users.length}</h5>
      </div>

      {/*table */}
      <div>
      <div className="overflow-x-auto">
  <table className="table table-zebra md:w-[870px]">
    {/* head */}
    <thead className='bg-green text-white rounded-lg'>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row  */}
      {
        users.map((user,index) =>(
          <tr key={index}>
            <th>{index+1}</th>
            <th>{user.name}</th>
            <th>{user.email}</th>
            <th>{user.role==='admin' ? "Admin" :(<button className='btn btn-xs bg-indigo-500 text-white'><FaUserTie /></button>)}</th>
            <th><button className='btn btn-xs bg-red text-white'><FaTrashAlt /></button></th>
            


          </tr>
        ))
      }
     
      
      
    </tbody>
  </table>
</div>
      </div>
      </div>
  )
}

export default Users