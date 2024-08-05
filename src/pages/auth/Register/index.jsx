import { Fragment, useState } from "react";
import Container from "../../../components/shared/Container";
import LoginLeft from "../../../assets/common/img/login.png";
import { apiRegister } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const Register = () => {
    const navigate = useNavigate();
    const initialFormData = {
        first_name: "",
        last_name: "",
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

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await apiRegister(formData);
            console.log(response);
            if (response.message) {
                toast.success("Registration successful! Please login.", {
                  position: "bottom-right"
                });
                setFormData(initialFormData); // Inputlarni to'zalash
                navigate("/login");
            } else {
                toast.error("Register failed. Please check your information.", {
                  position: "bottom-right"
                });
            }
        } catch (err) {
            toast.error("Registration failed. Please check your information.", {
              position: "bottom-right"
            });
        } 
    };

    return (
      <Fragment>
        <div className="home-style3 login-pg-1 py-3">
          <Container>
            <section className="tc-breadcrumb-style6 p-30 radius-4 bg-white mt-3 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp"}}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb fw-bold mb-0">
                        <li className="breadcrumb-item color-999"><a href="#">Home</a></li>
                        <li className="breadcrumb-item color-999"><a href="#">pages</a></li>
                        <li className="breadcrumb-item active color-000" aria-current="page">Register</li>
                    </ol>
                </nav>
            </section>
            <section className="tc-login p-5 radius-4 bg-white mt-3 mb-3">
              <div className="row align-items-center justify-content-around">
                <div className="col-lg-4">
                  <div className="img">
                    <img src={LoginLeft} alt="Login Image" />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="login-form">
                    <div className="title mb-30">
                      <h3 className="color-green2 mb-10" style={{ fontSize: "25px" }}> Register </h3>
                      <p className="fsz-14 text-uppercase ltspc-2 color-999"> JOIN TO US </p>
                    </div>
                    <form className="form d-block" onSubmit={register}>
                      <InputField 
                        id="first_name" 
                        name="first_name" 
                        label="First Name" 
                        placeholder="John" 
                        value={formData.first_name} 
                        onChange={handleInputChange} 
                      />
                      <InputField 
                        id="last_name" 
                        name="last_name" 
                        label="Last Name" 
                        placeholder="Doe" 
                        value={formData.last_name} 
                        onChange={handleInputChange} 
                      />
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
                      <div className="btns">
                        <button type="submit" className="butn bg-green2 text-white radius-4 fw-500 fsz-14 text-uppercase text-center mt-40 px-5"> 
                          <span> Register </span> 
                        </button>
                      </div>
                      <p className="text-uppercase color-999 fsz-13 mt-3"> Already a user? <a href="/login" className="color-green2"> Login </a> </p>
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

export default Register;
