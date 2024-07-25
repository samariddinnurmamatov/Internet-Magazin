import { Fragment, useState } from "react";
import Container from "../../../components/shared/Container";
import LoginLeft from "../../../assets/common/img/login.png"
import { apiLogin } from "../../../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { session } from "../../../services/session";
import { apiPostBasket } from "../../../services/HomeService";

const InputField = ({ id, name, type = "text", placeholder, value, onChange, label }) => (
    <div className="form-group mb-4">
      <label htmlFor={id}> {label} </label>
      <input 
        type={type} 
        id={id} 
        name={name} 
        className="form-control" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />
    </div>
);

const Login = () => {
    const navigate = useNavigate();
    const initialFormData = {
        phone_number: "",
        password: "",
    }; 
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await apiLogin(formData);
            if (response.success) {
                toast.success("Login successful!");
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));

                const basketProd = session.get("products") || [];
                const newBasketItems = await Promise.all(
                    basketProd.map(product => apiPostBasket({ product_id: product, quantity: 1 }))
                );

                console.log("A", response);

                setFormData(initialFormData); 
                navigate("/profile"); 
            } else {
                toast.error(response.message || "Login failed. Please check your information.");
            }
        } catch (err) {
            toast.error("Login failed. Please check your information.");
        }
    };

    return (
        <Fragment>
            <div className="home-style3 login-pg-1 py-3">
                <Container>
                    <section className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb fw-bold mb-0">
                                <li className="breadcrumb-item color-999"><a href="#">Home</a></li>
                                <li className="breadcrumb-item color-999"><a href="#">pages</a></li>
                                <li className="breadcrumb-item active color-000" aria-current="page">login</li>
                            </ol>
                        </nav>
                    </section>
                    <section className="tc-login p-5 radius-4 bg-white mt-3 mb-3">
                        <div className="row align-items-center justify-content-around">
                            <div className="col-lg-4">
                                <div className="img">
                                    <img src={LoginLeft} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="login-form">
                                    <div className="title mb-30">
                                        <h3 className="color-green2 mb-10" style={{ fontSize: "25px" }}> Welcome Back </h3>
                                        <p className="fsz-14 text-uppercase ltspc-2 color-999"> login to continue </p>
                                    </div>
                                    <form action="" className="form d-block" onSubmit={login}>
                                        <InputField 
                                            id="phone_number" 
                                            name="phone_number" 
                                            label="Phone Number" 
                                            placeholder="+998 99 999 99 99" 
                                            value={formData.phone_number} 
                                            onChange={handleInputChange} 
                                        />
                                        <InputField 
                                            id="password" 
                                            name="password" 
                                            type="password" 
                                            label="Password" 
                                            placeholder="...." 
                                            value={formData.password} 
                                            onChange={handleInputChange} 
                                        />
                                        <a href="#" className="d-block text-decoration-underline mt-2 color-999 fsz-13"> Forget Password ? </a>
                                        <div className="btns"><button type="submit" className="butn bg-green2 text-white radius-4 fw-500 fsz-14 text-uppercase text-center mt-40 px-5" style={{display: "flex", alignItems: "center", justifyContent: "center"}}><span> Login </span></button></div>
                                        <a href="#" className="text-uppercase color-999 fsz-13 mt-3"> new user ? <span className="color-green2"> Sign Up </span> </a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        </Fragment>
    );
};

export default Login;

