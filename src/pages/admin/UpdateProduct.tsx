/* eslint-disable react-hooks/set-state-in-effect */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Chip,
  OutlinedInput,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  fetchMyProduct,
  updateExistingProduct,
} from "../../features/crud/crudSlice";

const colors = ["Red", "Blue", "Black"];

const sizes = ["S", "M", "L", "XL"];

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { product, loading, error } = useAppSelector(
    (state) => state.crud
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    color: [] as string[],
    size: [] as string[],
  });

  const [image, setImage] = useState<File | null>(null);

  const [existingImage, setExistingImage] = useState("");

  const [validationError, setValidationError] = useState("");

  

  useEffect(() => {
    if (id) {
      dispatch(fetchMyProduct(id));
    }
  }, [dispatch, id]);

  

  useEffect(() => {
    if (!id || !product) {
      return;
    }

    const selectedProduct = Array.isArray(product)
      ? product.find((item: any) => item?._id === id)
      : product;

    if (!selectedProduct) {
      return;
    }

    setFormData({
      name: selectedProduct.name || "",
      description: selectedProduct.description || "",
      price:
        selectedProduct.price !== undefined
          ? String(selectedProduct.price)
          : "",
      color: Array.isArray(selectedProduct.color)
        ? selectedProduct.color
        : [],
      size: Array.isArray(selectedProduct.size)
        ? selectedProduct.size
        : [],
    });

    setExistingImage(selectedProduct.image || "");
  }, [id, product]);

 

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationError("");
  };



  const handleColorChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      color: e.target.value,
    }));

    setValidationError("");
  };

  

  const handleSizeChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      size: e.target.value,
    }));

    setValidationError("");
  };

 

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setValidationError("");
    }
  };

 

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const {
      name,
      description,
      price,
      color,
      size,
    } = formData;

    

    if (!id) {
      setValidationError(
        "Product ID is missing."
      );
      return;
    }

   

    if (
      !name.trim() ||
      !description.trim() ||
      !price.trim()
    ) {
      setValidationError(
        "Please fill in all required fields."
      );
      return;
    }



    if (Number(price) <= 0) {
      setValidationError(
        "Price must be greater than 0."
      );
      return;
    }

    

    if (color.length === 0) {
      setValidationError(
        "Please select at least one color."
      );
      return;
    }

    
    if (size.length === 0) {
      setValidationError(
        "Please select at least one size."
      );
      return;
    }

    try {
      

      await dispatch(
        updateExistingProduct({
          id,

          name: name.trim(),

          description: description.trim(),

          price: price,

          color,

          size,

          image: image || existingImage,
        } as any)
      ).unwrap();

      navigate("/admin/allproduct");
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );
    }
  };

  

  if (
    loading &&
    !formData.name
  ) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
          }}
        >
          

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: 700,
              }}
            >
              Update Product
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Update your product information.
            </Typography>
          </Box>



          {(validationError || error) && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 1,
                backgroundColor: "#ffebee",
                color: "error.main",
              }}
            >
              <Typography variant="body2">
                {validationError || error}
              </Typography>
            </Box>
          )}

        

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >


            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />



            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              multiline
              rows={5}
              required
            />

            

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: 0.01,
                },
              }}
              required
            />

            

            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>

              <Select
                multiple
                value={formData.color}
                onChange={handleColorChange}
                input={
                  <OutlinedInput label="Color" />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    {(selected as string[]).map(
                      (value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                        />
                      )
                    )}
                  </Box>
                )}
              >
                {colors.map((color) => (
                  <MenuItem
                    key={color}
                    value={color}
                  >
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            

            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>

              <Select
                multiple
                value={formData.size}
                onChange={handleSizeChange}
                input={
                  <OutlinedInput label="Size" />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    {(selected as string[]).map(
                      (value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                        />
                      )
                    )}
                  </Box>
                )}
              >
                {sizes.map((size) => (
                  <MenuItem
                    key={size}
                    value={size}
                  >
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>



            {existingImage && !image && (
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  Current Product Image
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    height: 220,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Box
                    component="img"
                    src={existingImage}
                    alt={
                      formData.name ||
                      "Current product"
                    }
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />
                </Box>
              </Box>
            )}

           

            <Box sx={{ mt: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Product Image
              </Typography>

              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  borderStyle: "dashed",
                  textTransform: "none",
                }}
              >
                {image
                  ? image.name
                  : "Choose New Product Image"}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {image && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mt: 1,
                  }}
                >
                  New image: {image.name}
                </Typography>
              )}
            </Box>

            {image && (
              <Box
                sx={{
                  width: "100%",
                  height: 220,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fafafa",
                }}
              >
                <Box
                  component="img"
                  src={URL.createObjectURL(image)}
                  alt="New product preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 1,
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Button
                type="button"
                variant="outlined"
                color="inherit"
                onClick={() => navigate(-1)}
                disabled={loading}
                sx={{
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  minWidth: 150,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                  />
                ) : (
                  "Update Product"
                )}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdateProduct;

