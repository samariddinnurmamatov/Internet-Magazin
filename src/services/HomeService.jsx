import ApiService from "./ApiService";

export async function apiGetCategory(params = {}) {
  return ApiService.fetchData({
    url: "/category",
    method: "get",
    params,
  });
}

export async function apiGetCategoryId(id) {
  return ApiService.fetchData({
    url: `/category/${id}`,
    method: "get",
  });
}

export async function apiGetProducts(params = {}) {
  return ApiService.fetchData({
    url: "/product",
    method: "get",
    params,
  });
}
export async function apiGetSingleProduct(id) {
  return ApiService.fetchData({
    url: `/${id}/product`,
    method: "get",
  });
}

export async function apiGetFavourites(params = {}) {
  return ApiService.fetchData({
    url: "/favourites",
    method: "get",
    params,
  });
}

export async function apiPostFavourites(data) {
  return ApiService.fetchData({
    url: "/favourites",
    method: "post",
    data
  });
}

export async function apiDeleteFavourites(id) {
  return ApiService.fetchData({
    url: `/favourites/${id}`,
    method: "delete",
  });
}

export async function apiGetBasket(params = {}) {
  return ApiService.fetchData({
    url: "/carts",
    method: "get",
    params,
  });
}

export async function apiPostBasket(data) {
  return ApiService.fetchData({
    url: "/carts",
    method: "post",
    data
  });
}

export async function apiUpdateBasket(data) {
  return ApiService.fetchData({
      url: `/carts/${data.product_id}`,
      method: "put",
      data,
  });
}

export async function apiDeleteBasket(id) {
  return ApiService.fetchData({
    url: `/carts/${id}`,
    method: "delete",
  });
}
export async function apiGetCategoryOfProduct(id) {
  return ApiService.fetchData({
    url: `/category/${id}`,
    method: "get",
  });
}

export async function apiGetBrands(params = {}) {
  return ApiService.fetchData({
    url: "/brand",
    method: "get",
    params,
  });
}
