import ApiService from "./ApiService";

export async function apiRegister(data) {
  return ApiService.fetchData({
    url: "/register",
    method: "post",
    data,
  });
}

export async function apiLogin(data) {
  return ApiService.fetchData({
    url: "/login",
    method: "post",
    data,
  });
}

export async function apiLogout(data) {
    return ApiService.fetchData({
      url: "/logout",
      method: "post",
      data,
    });
}


export async function apiUserInfoEdit(data) {
    return ApiService.fetchData({
      url: "/users/update",
      method: "put",
      data,
    });
}


export async function apiUserInfo() {
    return ApiService.fetchData({
      url: "/user/info",
      method: "get",
    });
}


export async function apiUserPasswordUpd() {
  return ApiService.fetchData({
    url: "/change/password",
    method: "post",
  });
}
