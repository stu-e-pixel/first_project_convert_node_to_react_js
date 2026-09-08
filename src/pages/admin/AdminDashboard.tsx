
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks";

import {
  fetchProduct,
  deleteExistingProduct,
} from "../../features/crud/crudSlice";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useAppSelector(
    (state: any) => state.crud
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const products = Array.isArray(product)
    ? product.filter((item: any) => item != null)
    : [];

  const totalProducts = products.length;

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(deleteExistingProduct(id)).unwrap();

      dispatch(fetchProduct());
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/updateproduct/${id}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 2,
          mb: 4,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Admin Dashboard
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Manage your products and store from one place.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/create")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 2.5,
            py: 1.2,
          }}
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#ffebee",
          }}
        >
          <Typography color="error">
            {error}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Total Products
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                {loading ? "..." : totalProducts}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Products in your store
              </Typography>
            </Box>

            <Box
              sx={{
                width: 55,
                height: 55,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e3f2fd",
              }}
            >
              <Inventory2OutlinedIcon
                sx={{
                  fontSize: 30,
                  color: "#1976d2",
                }}
              />
            </Box>
          </CardContent>
        </Card>


        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Store Inventory
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                {loading ? "..." : totalProducts}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Active products
              </Typography>
            </Box>

            <Box
              sx={{
                width: 55,
                height: 55,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e8f5e9",
              }}
            >
              <ShoppingBagOutlinedIcon
                sx={{
                  fontSize: 30,
                  color: "#2e7d32",
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent
            sx={{
              p: 3,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Quick Action
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Create a new product
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/admin/create")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Create Product
            </Button>
          </CardContent>
        </Card>
      </Box>


      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          mb: 3,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Recent Products
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Your latest products
              </Typography>
            </Box>

            <Button
              variant="text"
              endIcon={<ArrowForwardIcon />}
              onClick={() =>
                navigate("/admin/allproduct")
              }
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              View All
            </Button>
          </Box>

          <Divider />


          {loading && products.length === 0 ? (
            <Box
              sx={{
                minHeight: 250,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (

            <Box
              sx={{
                minHeight: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                }}
              >
                No Products Found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                You haven't created any products yet.
              </Typography>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  navigate("/admin/create")
                }
                sx={{
                  textTransform: "none",
                }}
              >
                Create Product
              </Button>
            </Box>
          ) : (
            

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {products
                .slice(0, 5)
                .map((item: any, index: number) => (
                  <Box key={item._id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        py: 2,
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                      }}
                    >
                      {/* IMAGE */}

                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          overflow: "hidden",
                          backgroundColor: "#f5f5f5",
                          flexShrink: 0,
                        }}
                      >
                        {item.image ? (
                          <CardMedia
                            component="img"
                            image={item.image}
                            alt={
                              item.name ||
                              "Product"
                            }
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              No Image
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      

                      <Box
                        sx={{
                          flexGrow: 1,
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            mb: 0.5,
                          }}
                        >
                          {item.name ||
                            "Unnamed Product"}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display:
                              "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient:
                              "vertical",
                            overflow: "hidden",
                            mb: 1,
                          }}
                        >
                          {item.description ||
                            "No description"}
                        </Typography>

                        

                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            flexWrap: "wrap",
                          }}
                        >
                          {Array.isArray(
                            item.color
                          ) &&
                            item.color
                              .slice(0, 3)
                              .map(
                                (
                                  color: string,
                                  colorIndex: number
                                ) => (
                                  <Chip
                                    key={`${color}-${colorIndex}`}
                                    label={color}
                                    size="small"
                                  />
                                )
                              )}

                          {Array.isArray(
                            item.size
                          ) &&
                            item.size
                              .slice(0, 3)
                              .map(
                                (
                                  size: string,
                                  sizeIndex: number
                                ) => (
                                  <Chip
                                    key={`${size}-${sizeIndex}`}
                                    label={size}
                                    size="small"
                                    variant="outlined"
                                  />
                                )
                              )}
                        </Box>
                      </Box>

                      

                      <Box
                        sx={{
                          minWidth: 90,
                          textAlign: {
                            xs: "left",
                            sm: "right",
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          ₹{item.price ?? 0}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleEdit(
                              item._id
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    {index <
                      Math.min(
                        products.length,
                        5
                      ) -
                        1 && <Divider />}
                  </Box>
                ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          startIcon={<Inventory2OutlinedIcon />}
          onClick={() =>
            navigate("/admin/allproduct")
          }
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Manage All Products
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
