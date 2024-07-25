import { BrowserRouter, Routes, Route } from "react-router-dom"
import BaseLayout from "../components/layouts"
import Home from "../pages/Home"
import SingleProduct from "../pages/singleproduct"
import Basket from "../pages/basket/Basket"
import About from "../pages/about/about"
import { Profile } from "../pages/profile/Profile"
import Favorites from "../pages/favorites/favorites"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import { Contact } from "../pages/contact/Contact"
import {Checkout} from "../pages/checkout/Checkout"
import Category from "../pages/category/Category"
 

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<Profile />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="single_product/:id" element={<SingleProduct />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="basket" element={<Basket />} /> 
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
