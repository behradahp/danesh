import axios from "axios";

// Create an axios instance
const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

interface ResponseType<T> {
  data: T;
  status: Number;
}

export const getCategories = async () => {
  try {
    const response = await apiInstance.get("categories/");

    return {
      success: true,
      data: response.data,
      error: "",
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: JSON.stringify(err),
    };
  }
};

export const getCategory = async ({ id }: { id: string }) => {
  try {
    const response = await apiInstance.get(`categories/${id}/`);

    return {
      success: true,
      data: response.data,
      error: "",
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: JSON.stringify(err),
    };
  }
};

export const getProducts = async () => {
  try {
    const response = await apiInstance.get("products/");

    return {
      success: true,
      data: response.data,
      error: "",
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: JSON.stringify(err),
    };
  }
};

export const getCategoryProducts = async ({ id }: { id: string }) => {
  try {
    const response = await apiInstance.get(`products/category/${id}/`);

    return {
      success: true,
      data: response.data,
      error: "",
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: JSON.stringify(err),
    };
  }
};

export const productsCategoryCount = async () => {
  try {
    const response = await apiInstance.get("products/category/count/");

    return {
      success: true,
      data: response.data,
      error: "",
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: JSON.stringify(err),
    };
  }
};

export const createProduct = async (data: FormData) => {
  try {
    await axios.post("http://127.0.0.1:8000/api/products/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: null,
      error: "",
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: JSON.stringify(err),
    };
  }
};
