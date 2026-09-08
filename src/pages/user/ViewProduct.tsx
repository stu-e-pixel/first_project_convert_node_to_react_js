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
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks";

import {
  fetchMyProduct,
} from "../../features/crud/crudSlice";

const ViewProduct = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useAppSelector(
    (state: any) => state.crud
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMyProduct(id));
    }
  }, [dispatch, id]);
  const selectedProduct = Array.isArray(product)
    ? product[0]
    : product;

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography color="error">
          {error}
        </Typography>

        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  if (!selectedProduct) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">
          Product Not Found
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        p: { xs: 2, sm: 3, md: 5 },
      }}
    >
      
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          textTransform: "none",
        }}
      >
        Back
      </Button>


      <Card
        sx={{
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              minHeight: {
                xs: 350,
                md: 550,
              },
              backgroundColor: "#f5f5f5",
            }}
          >
            {selectedProduct?.image ? (
              <CardMedia
                component="img"
                image={selectedProduct.image}
                alt={
                  selectedProduct.name ||
                  "Product"
                }
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: {
                    xs: 350,
                    md: 550,
                  },
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: {
                    xs: 350,
                    md: 550,
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color="text.secondary">
                  No Image
                </Typography>
              </Box>
            )}
          </Box>

          
          <CardContent
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              {selectedProduct.name}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              ₹{selectedProduct.price}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              Description
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              {selectedProduct.description}
            </Typography>


            {Array.isArray(
              selectedProduct.color
            ) &&
              selectedProduct.color.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    Available Colors
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {selectedProduct.color.map(
                      (
                        color: string,
                        index: number
                      ) => (
                        <Chip
                          key={`${color}-${index}`}
                          label={color}
                        />
                      )
                    )}
                  </Box>
                </Box>
              )}

            {Array.isArray(
              selectedProduct.size
            ) &&
              selectedProduct.size.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    Available Sizes
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {selectedProduct.size.map(
                      (
                        size: string,
                        index: number
                      ) => (
                        <Chip
                          key={`${size}-${index}`}
                          label={size}
                          variant="outlined"
                        />
                      )
                    )}
                  </Box>
                </Box>
              )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ViewProduct;