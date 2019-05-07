const initialState = {
  user: {},
  userRoutes: []
};

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const SAVE_USER_ROUTE = "SAVE_USER_ROUTE";
const GET_USER_ROUTES = "GET_USER_ROUTES";
const DELETE_USER_ROUTE = "DELETE_USER_ROUTE";
const UPDATE_USER_ROUTE = "UPDATE_USER_ROUTE";
const LOGOUT = "LOGOUT";

export default function reducer(state = initialState, action) {
  let { payload } = action;
  switch (action.type) {
    case LOGIN:
      return { ...state, user: payload };
    case REGISTER:
      return { ...state, user: payload };
    case SAVE_USER_ROUTE:
      return { ...state, userRoutes: payload };
    case GET_USER_ROUTES:
      return { ...state, userRoutes: payload };
    case DELETE_USER_ROUTE:
      return { ...state, userRoutes: payload };
    case UPDATE_USER_ROUTE:
      return { ...state, userRoutes: payload };
    case LOGOUT:
      return {
        user: {},
        userRoutes: []
      };

    default:
      return state;
  }
}

export function login(user) {
  return {
    type: LOGIN,
    payload: user
  };
}

export function register(user) {
  return {
    type: REGISTER,
    payload: user
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function saveUserRoute(userRoute) {
  return {
    type: SAVE_USER_ROUTE,
    payload: userRoute
  };
}

export function getUserRoutes(userRoutes) {
  return {
    type: GET_USER_ROUTES,
    payload: userRoutes
  };
}

export function deleteUserRoute(userRoute) {
  return {
    type: DELETE_USER_ROUTE,
    payload: userRoute
  };
}

export function updateUserRoute(userRoute) {
  return {
    type: UPDATE_USER_ROUTE,
    payload: userRoute
  };
}
