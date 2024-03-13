import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import Updateprofile from "../pages/dashboard/Updateprofile";
import Cartpage from "../pages/shop/Cartpage";
import Dashbordlayout from "../layout/Dashbordlayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Addmenu from "../pages/dashboard/admin/Addmenu";
import Manageitem from "../pages/dashboard/admin/Manageitem";
import Updatemenu from "../pages/dashboard/admin/Updatemenu";
import Payment from "../pages/shop/Payment";
import ManageBooking from "../pages/dashboard/admin/ManageBooking";

const router = createBrowserRouter([

    
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/menu",
          element:<Menu/>
        },
        {
          path:"/update-profile",
          element:<Updateprofile/>
        },
        {
          path:"/card-page",
          element:<Cartpage/>
        },
        {
        path:"/process-checkout",
        element:<Payment/>
        }
        
      ]
    },

    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"dashboard",
      element:<Dashbordlayout/>,
      children:[

        {
          path:'',
          element:<Dashboard/>
        },
        {

          path:'user',
          element:<Users/>
        },
        {
          path:"add-menu",
          element:<Addmenu/>
        },
        {
          path:"manage-item",
          element:<Manageitem/>

        },
        {
          path:"update-menu/:id",
          element:<Updatemenu/>,
          loader:({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
        },
       {
        path:"manage-boking",
        element:<ManageBooking/>
       }
       
       
        
      ]
    }
  ]);
  export default router;