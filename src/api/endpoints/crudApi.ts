import type { GetAllProductResponse, Product, ProductCreateData, ProductFilter } from '../../typescript/types';
import { getAuthCookie } from '../../utils/cookieUtils';
import api from '../axiosconfig';





const getToken = () => {
  const { token } = getAuthCookie();
  if (!token) {
    console.warn(' token not found in cookies');
  }
  return token;
};



const buildAuthHeaders = () => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const getAllProduct = async (
  filters: ProductFilter = {}
): Promise<GetAllProductResponse> => {
  try {
    const response = await api.get("/api/products", {
      headers: buildAuthHeaders(),
      params: {
        name: filters.name || undefined,
        minprice: filters.minprice || undefined,
        maxprice: filters.maxprice || undefined,
        page: filters.page || 1,
        limit: filters.limit || 20,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id:string) => {
  const response = await api.get(`/api/products/${id}`);

  return response.data;
};

export const createProduct = async (
  data: ProductCreateData
): Promise<{ data: Product }> => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token is required to create a product");
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);

    formData.append("color", JSON.stringify(data.color));
    formData.append("size", JSON.stringify(data.size));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await api.post(
      "/api/create-product",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("CREATE PRODUCT RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};


export const updateProduct = async (
  id: string,
  data: ProductCreateData
): Promise<{ data: Product }> => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token is required to update product");
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));

    formData.append(
      "color",
      JSON.stringify(data.color)
    );

    formData.append(
      "size",
      JSON.stringify(data.size)
    );
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await api.put(
      `/api/products/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "UPDATE PRODUCT RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error
    );

    throw error;
  }
};


export const deleteProduct = async (id:string): Promise<{ message: string }> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error(' token is required to delete a blog');
    }

    const response = await api.delete(`/api/products/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

