// // import { useSelector } from "react-redux";
// import { apiSignIn, apiSignOut } from "../services/AuthService";
// import { useEffect } from "react";

// function useAuth() {
// //   const dispatch = useDispatch();
// //   const { token, signedIn } = useSelector((state) => state.auth.session);
// //   const user = useSelector((state) => state.auth.user);

//   // SignIn function
//   const signIn = async ({ phone_number, password }) => {
//     try {
//       const resp = await apiSignIn({ phone: phone_number, password });
//       if (resp.data) {
//         const { access_token } = resp.data;
//         localStorage.setItem('token', access_token); // Tokenni localStorage ga saqlash
//         // await dispatch(onSignInSuccess(access_token));
//         return {
//           status: "success",
//           message: "",
//         };
//       }
//     } catch (errors) {
//       return {
//         status: "failed",
//         message: errors?.response?.data?.message || errors.toString(),
//       };
//     }
//   };

//   // SignOut function
//   const signOut = async () => {
//     try {
//       await apiSignOut();
//     //   dispatch(onSignOutSuccess());
//       localStorage.removeItem('token'); // Tokenni localStorage dan o'chirish
//     } catch (errors) {
//       console.error("SignOut Error:", errors);
//     //   dispatch(onSignOutSuccess());
//       localStorage.removeItem('token'); // Tokenni localStorage dan o'chirish
//     }
//   };

//   // Fetch user info function (optional)
//   const getUserInfo = async () => {
//     // Implement your logic to fetch user info
//   };

//   // Automatically fetch user info on component mount (optional)
//   useEffect(() => {
//     if (signedIn) {
//       getUserInfo();
//     }
//   }, [signedIn]);

//   return {
//     authenticated: token && signedIn,
//     user,
//     signIn,
//     signOut,
//   };
// }

// export default useAuth;
