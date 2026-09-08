/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  Product,
  ProductCreateData,
  ProductFilter,
} from "../../typescript/types/index";
import toast from "react-hot-toast";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../../api/endpoints/crudApi";

interface ProductState {
  product: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  totalproduct: number;
  currentpage: number;
  totalpage: number;
}

const initialState: ProductState = {
  product: [],
  loading: false,
  error: null,
  selectedProduct: null,
  totalproduct: 0,
  currentpage: 1,
  totalpage: 1,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProducts",
  async (filters: ProductFilter | undefined, { rejectWithValue }) => {
    try {
      const response = await getAllProduct(filters);

      console.log("GET ALL PRODUCT RESPONSE:", response);

      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to fetch products";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

export const fetchMyProduct = createAsyncThunk(
  "blog/fetchMyBlogs",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getProductById(id);

      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to fetch your blogs";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

export const createNewProduct = createAsyncThunk(
  "blog/createNewBlog",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await createProduct(data);
      toast.success(" Product created successfully!");
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create blog";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateExistingProduct = createAsyncThunk(
  "blog/updateExistingBlog",
  async (data: ProductCreateData & { id: string }, { rejectWithValue }) => {
    try {
      const response = await updateProduct(data.id, data);

      toast.success("Blog updated successfully!");

      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update blog";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);

export const deleteExistingProduct = createAsyncThunk(
  "blog/deleteExistingBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      toast.success("Blog deleted successfully!");
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete blog";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSeletedBlog: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.product = action.payload.data;

        state.totalproduct = action.payload.totalproduct;

        state.currentpage = action.payload.currentpage;

        state.totalpage = action.payload.totalpage;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (!state.product) {
          state.product = [];
        }

        state.product.unshift(action.payload);
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateExistingProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (Array.isArray(state.product)) {
          const index = state.product.findIndex(
            (product) => product._id === action.payload._id,
          );

          if (index !== -1) {
            state.product[index] = action.payload;
          }
        }

        state.selectedProduct = action.payload;
      })
      .addCase(updateExistingProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteExistingProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = state.product.filter(
          (blog) => blog._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteExistingProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(fetchMyProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSeletedBlog, setError } = BlogSlice.actions;
export default BlogSlice.reducer;
