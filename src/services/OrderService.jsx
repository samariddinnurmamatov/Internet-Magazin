import { data } from "autoprefixer";
import ApiService from "./ApiService";

export async function apiGetOrders(params = {}) {
  return ApiService.fetchData({
    url: "/order",
    method: "get",
    params,
  });
}

export async function apiUpdateOrder(id, updateOrder, params) {
  return ApiService.fetchData({
    url: `/order/${id}`,
    method: "patch",
    data: updateOrder,
    params,
  });
}


export async function apiGetMe() {
    return ApiService.fetchData({
      url: "/auth/userinfo",
      method: "get",
    });
  }
  


 export async function createOrder(data) {
    console.log(data)
  return ApiService.fetchData({
    url: "/orders",
    method: "post",
    data,
  });
}