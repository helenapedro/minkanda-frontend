// import { createSlice } from "@reduxjs/toolkit";
// import { apiCallBegan } from "./api";
// import _ from "underscore";

// const TOKEN_KEY = "notesapp:userToken";
// const RID = "notesapp:rid";

// const ROLE_ADMIN = -1;

// export const AUTH_TOKEN_HEADER = "Bearer"

// // authentication slice for reducer
// const slice = createSlice({
//      name: "auth",
//      initialState: {
//           currentUser: undefined,
//      },
//      reducers: {
//           // action => action handler
//           // save authentication data (json web token and role id) to keep user signed
//           loggedInWithJwt: (auth, action) => {
//                const jwt = action.payload.token;
//                const rid = action.payload.rid;
//                localStorage.setItem(TOKEN_KEY, jwt);
//                localStorage.setItem(RID, rid);
//           },
//           // remove authentication data (json web token and role id) to sign out user
//           loggedOut: (auth, action) => {
//                auth.currentUser = undefined;
//                localStorage.removeItem(TOKEN_KEY);
//                localStorage.removeItem(RID);
//           },
//           // set current user in store, if empty sign out user 
//           currentUserReceived: (auth, action) => {
//                if (_.isEmpty(action.payload)) {
//                     auth.currentUser = undefined;
//                     localStorage.removeItem(TOKEN_KEY);
//                     localStorage.removeItem(RID);
//                } else {
//                     auth.currentUser = action.payload;
//                }
//           },
//           currentUserUpdated: (auth, action) => {
//                auth.currentUser = action.payload;
//           },
//      },
// });

// // expose action handlers
// export const {
//      loggedOut,
//      loggedInWithJwt,
//      currentUserReceived,
//      currentUserUpdated,
// } = slice.actions;

// export const register = (user) => apiCallBegan({
//      url: "/register",
//      method: "post",
//      responseHeader: AUTH_TOKEN_HEADER,
//      data: {
//           // active: true,
//           ..._.pick(user, [
//                "email",
//                "password",
//                "firstname",
//                "lastname",
//           ]),
//      },
// });

// export const updateCurrentUser = (data) => {
//      const userFields = [
//           "firstname",
//           "lastname",
//           "birthday",
//           "gender",
//           "phoneNumber",
//           "address"
//      ]; 

//      return apiCallBegan( uid, {
//           url: `api/users/${uid}`,
//           method: "put",
//           data: {
//                ..._.pick(data, userFields),
//           },
//           onSuccess: currentUserUpdated.type,
//      });
// };

// export const getCurrentUser = () => apiCallBegan({
//      url: "/api/users/me",
//      method: "get",
//      onSuccess: currentUserReceived.type,
// });

// export const login = ({ email, password }) => apiCallBegan({
//      url: "/auth/login",
//      method: "post",
//      data: { email, password },
//      onSuccess: loggedInWithJwt.type,
// });

// export const logout = () => loggedOut();

// // get json authentication web token from local storage 
// export const getJwtFromLocalStorage = () => {
//      return localStorage.getItem(TOKEN_KEY);
// };

// // check if autheticated user is admin
// export const isAdmin = () => {
//      if (isLoggedIn() && parseInt(localStorage.getItem(RID)) === ROLE_ADMIN) return true;
//      else return false;
// };

// // check is user is authenticated
// export const isLoggedIn = () => getJwtFromLocalStorage() !== null;

// export default slice.reducer;