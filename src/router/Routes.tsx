import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import ProtectedRoute from "../pages/ProtectedRoute";
import UserLayout from "../layout/UserLayout";
import ViewProduct from "../pages/user/ViewProduct";
import MyProfile from "../pages/user/MyProfile";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductList from "../pages/admin/ProductList";
import UpdateProduct from "../pages/admin/UpdateProduct";
import AdminProfile from "../pages/admin/AdminProfile";
import VerifyPage from "../pages/auth/Verify";

const Routes = createBrowserRouter([
    {
        path:"/login",
        element:<LoginPage/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/verify",
        element:<VerifyPage/>
    },
    {
        path:"/",
        element:<Home/>
    },
    {
        element:<ProtectedRoute  allowedRole="user"/>,
        children:[
            {
                path:"/user",
                element:<UserLayout/>,
                children:[
                    {
                        path:"viewproduct/:id",
                        element:<ViewProduct/>
                    },
                    {
                        path:"profile",
                        element:<MyProfile/>
                    }
                ]
            }
        ]
    },
    {
       element:<ProtectedRoute allowedRole="admin"/>,
        children:[
            {
                path:"/admin",
                element:<AdminLayout/>,
                children:[
                    {
                        path:"dashboard",
                        element:<AdminDashboard/>
                    },
                    {
                        path:"create",
                        element:<CreateProduct/>

                    },
                    {
                        path:"allproduct",
                        element:<ProductList/>
                    },
                    {
                        path:"updateproduct/:id",
                        element:<UpdateProduct/>
                    },
                    {
                        path:"profile",
                        element:<AdminProfile/>
                    }
                ]
            }
        ] 
    }

])

export default Routes