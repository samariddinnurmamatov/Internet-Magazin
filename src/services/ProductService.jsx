import ApiService from "./ApiService";

export async function apiGetProducts(params = {}) {
  return ApiService.fetchData({
    url: "/order",
    method: "get",
    params,
  });
}

export async function apiUpdateProducts(id, updateOrder, params) {
  return ApiService.fetchData({
    url: `/order/${id}`,
    method: "patch",
    data: updateOrder,
    params,
  });
}