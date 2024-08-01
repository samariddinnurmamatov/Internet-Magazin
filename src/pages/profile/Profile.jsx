import { Fragment, useEffect, useState } from 'react';
import Container from '../../components/shared/Container';
import { apiLogout, apiUserInfo, apiUserInfoEdit, apiUserPasswordUpd } from '../../services/AuthService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Person from "../../assets/person-remov.png"
import { FcNext } from 'react-icons/fc';
import { GrNext } from 'react-icons/gr';
import { apiGetUserOrderInfo } from '../../services/HomeService';


export const Profile = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userOrderInfoData, setUserOrderInfoData] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiUserInfo();
      const userOrderInfo = await apiGetUserOrderInfo();
      console.log('User data:', response);
      if (userOrderInfo) setUserOrderInfoData(userOrderInfo.data)
      if (response) {
        const { first_name, last_name, phone_number } = response.user;
        setUsers([response.user]);
        setFirstName(first_name);
        setLastName(last_name);
        setPhoneNumber(phone_number);
        setPhoneNumber(phone_number);
      } else {
        toast.error('Failed to fetch user data.');
      }
    } catch (error) {
      // toast.error('Failed to fetch user data.');
    }
  };

  const handleUpdateUser = async () => {
    const updatedUserData = {
      id: users[0].id,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };

    try {
      const response = await apiUserInfoEdit(updatedUserData);
      console.log('Update response:', response);
      if (response.message) {
        toast.success('User data updated successfully.');
        fetchUserData(); // Fetch updated user data
      } else {
        toast.error('Failed to update user data.');
      }
    } catch (error) {
      toast.error('Failed to update user data.');
    }
  };

  const handlePasswordChange = async () => {
    const passwordData = {
      old_password: oldPassword,
      password: newPassword,
    };

    try {
      const response = await apiUserPasswordUpd(passwordData);
      console.log('Password change response:', response);
      if (response.message) {
        toast.success('Password changed successfully.');
      } else {
        toast.error('Failed to change password.');
      }
    } catch (error) {
      toast.error('Failed to change password.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await apiLogout();
      console.log('Logout response:', response);
      if (response) {
        toast.success('Logged out successfully.');
        localStorage.removeItem('token'); // Clear the token from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('products');
        localStorage.removeItem('like');
        navigate('/login'); // Navigate to login page
      } else {
        toast.error('Failed to log out.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out.');
    }
  };

  return (
    <Fragment>
      <div className="home-style3 profile-pg-1 py-10">
        <Container>
          <section className="tc-profile p-30 radius-4 bg-white mt-3 wow fadeInUp mb-3">
            <div className="row">
              <div className="col-md-3">
                <div className="tabs-side me-lg-5 mb-4 mb-lg-0 lg:d-flex">
                  <div className="main-info">
                    <div className="img">
                      <img src={Person} alt="" className="main-img img-cover" />
                    </div>
                    <h5 className="fw-bold">
                      {users.map(user => (
                        <span key={user.id}>{user.first_name} {user.last_name}</span>
                      ))}
                    </h5>
                    <ul className="mt-2 color-666 lh-lg">
                    </ul>
                  </div>
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pills-prof1-tab" data-bs-toggle="pill" data-bs-target="#pills-prof1">
                        <span> Account info </span> <GrNext />
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-prof2-tab" data-bs-toggle="pill" data-bs-target="#pills-prof2">
                        <span> My order </span> <GrNext />
                      </button>
                    </li> */}
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-prof4-tab" data-bs-toggle="pill" data-bs-target="#pills-prof4">
                        <span> Change password </span> <GrNext />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-prof1">
                    <div className="account-tab">
                      <h4 className="fw-bold text-capitalize mb-30"> Account info </h4>
                      <div className="content">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group mb-4">
                              <label> First Name <span className="color-red1"> * </span> </label>
                              <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />

                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group mb-4">
                              <label> Last Name <span className="color-red1"> * </span> </label>
                              <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />

                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mb-4">
                              <label> Email Address <span className="color-red1"> * </span> </label>
                              <input type="text" className="form-control" placeholder="" value="swoo@gmail.com" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mb-4">
                              <label> Phone Number <span className="color-666"> (Optional) </span> </label>
                              <input
                                type="text"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />

                            </div>
                          </div>
                          <div className="col-lg-12 flex gap-4">
                            <button className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-20 py-3 px-5" onClick={handleUpdateUser}
                            >
                              <span> save </span>
                            </button>
                            <button className="butn bg-red2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-20 py-3 px-5"  onClick={handleLogout}
                            >
                              <span> Log Out </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="tab-pane fade" id="pills-prof2">
                    <div className="orders-tab">
                      <h4 className="fw-bold text-capitalize mb-30"> Orders History </h4>
                      <div className="orders">
                        <div className="order-card">

                          <div className="products">
                            <div className="row gx-3">
                              
                              <div className="col-lg-6">
                                <div className="product-card">
                                  <a href="#0" className="img">
                                    <img src="assets/img/products/prod27.png" alt="" className="img-contain main-image" />
                                  </a>
                                  <div className="info">
                                    <h6>
                                      <a href="#" className="prod-title fsz-14 fw-bold mt-2 hover-blue1"> aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB </a>
                                    </h6>
                                    <div className="price mt-15">
                                      <h5 className="fsz-18 fw-600"> $979.00 </h5>
                                    </div>
                                    <div className="meta">
                                      <a href="#" className="meta-item color-222"> $2.98 Shipping <span className="bg bg-222"></span> </a>
                                    </div>
                                    <p className="fsz-12 mt-2">
                                      <i className="fas fa-check-circle color-green2 me-1"></i> 45
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="product-card">
                                  <div className="top-inf">
                                    <small className="fsz-10 py-1 px-2 radius-2 bg-222 text-white text-uppercase"> new </small>
                                  </div>
                                  <a href="#0" className="img">
                                    <img src="assets/img/products/prod65.png" alt="" className="img-contain main-image" />
                                  </a>
                                  <div className="info">
                                    <div className="rating">
                                      <div className="stars">
                                        <i className="la la-star"></i>
                                        <i className="la la-star"></i>
                                        <i className="la la-star"></i>
                                        <i className="la la-star"></i>
                                        <i className="la la-star"></i>
                                      </div>
                                      <small className="text-muted"> (1 Review) </small>
                                    </div>
                                    <h6>
                                      <a href="#" className="prod-title fsz-14 fw-bold mt-2 hover-green2"> WD Purple Surveillance Hard Disk Drive </a>
                                    </h6>
                                    <div className="price mt-15">
                                      <h5 className="fsz-18 fw-600"> $22.00 </h5>
                                    </div>
                                    <div className="meta">
                                      <a href="#" className="meta-item color-222"> $2.98 Shipping <span className="bg bg-222"></span> </a>
                                    </div>
                                    <p className="fsz-12 mt-2">
                                      <i className="fas fa-check-circle color-green2 me-1"></i> In stock
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="order-foot">
                            <a href="#0" className="btns btns-border-green2 fsz-12 fw-500 px-4 py-2 radius-25">
                              <span> Order Details </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="tab-pane fade" id="pills-prof4">
                    <div className="changepass-tab">
                      <h4 className="fw-bold text-capitalize mb-30"> Change Password </h4>
                      <div className="content">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-4">
                              <label> Current Password <span className="color-red1"> * </span> </label>
                              <input type="password" className="form-control" placeholder="" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mb-4">
                              <label> New Password <span className="color-red1"> * </span> </label>
                              <input type="password" className="form-control" placeholder="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <button className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-20 py-3 px-5">
                              <span> save </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pills-prof5">
                    <div className="details-tab">
                      <h4 className="fw-bold text-capitalize mb-30"> Account Details </h4>
                      <div className="content">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group mb-4">
                              <label> User Name <span className="color-red1"> * </span> </label>
                              <input type="text" className="form-control" placeholder="" value="Mark Cole" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mb-4">
                              <label> Email Address <span className="color-red1"> * </span> </label>
                              <input type="text" className="form-control" placeholder="" value="swoo@gmail.com" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <button className="butn bg-green2 text-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-20 py-3 px-5">
                              <span> save </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pills-prof6">
                    <div className="delete-tab">
                      <h4 className="fw-bold text-capitalize mb-30"> Delete Account </h4>
                      <div className="content">
                        <p className="color-666 mb-50">
                          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                        </p>
                        <button className="butn bg-red1 color-white radius-4 fw-500 fsz-12 text-uppercase text-center mt-20 py-3 px-5" onClick={handlePasswordChange}>
                          <span> Delete Account </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </Fragment>
  );
};

export default Profile;
