/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { fetchProduct } from "../features/crud/crudSlice";

import UserNavbar from "../components/user/UserNavbar";
import UserFooter from "../components/user/UserFooter";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useAppSelector(
    (state: any) => state.crud,
  );

  const [searchName, setSearchName] = useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProduct(undefined));
  }, [dispatch]);

  const products = Array.isArray(product)
    ? product.filter((item) => item != null)
    : [];

  const handleSearch = () => {
    const name = searchName.trim();

    const minprice = minPrice.trim();

    const maxprice = maxPrice.trim();
    if (minprice && maxprice && Number(minprice) > Number(maxprice)) {
      return;
    }

    dispatch(
      fetchProduct({
        name: name || undefined,

        minprice: minprice ? Number(minprice) : undefined,

        maxprice: maxprice ? Number(maxprice) : undefined,

        page: 1,

        limit: 20,
      }),
    );
  };

  const handleClear = () => {
    setSearchName("");

    setMinPrice("");

    setMaxPrice("");

    dispatch(
      fetchProduct({
        page: 1,
        limit: 20,
      }),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleView = (id: string) => {
    navigate(`/user/viewproduct/${id}`);
  };

  if (loading && products.length === 0) {
    return (
      <>
        <UserNavbar />

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

        <UserFooter />
      </>
    );
  }

  return (
    <>
      <UserNavbar />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f5f6fa",
          p: {
            xs: 2,
            sm: 3,
            md: 5,
          },
        }}
      >
        <Box
          sx={{
            mb: 4,
            p: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,

            display: "flex",
            gap: 2,

            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            label="Search Product"
            placeholder="Enter product name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              flex: 1,
              minWidth: {
                xs: "100%",
                sm: 220,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <SearchIcon
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                    }}
                  />
                ),
              },
            }}
          />

          <TextField
            label="Min Price"
            type="number"
            placeholder="Minimum"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              width: {
                xs: "100%",
                sm: 150,
              },
            }}
          />

          <TextField
            label="Max Price"
            type="number"
            placeholder="Maximum"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              width: {
                xs: "100%",
                sm: 150,
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{
              height: 56,
              px: 3,
            }}
          >
            Search
          </Button>

          <Button
            variant="outlined"
            onClick={handleClear}
            sx={{
              height: 56,
              px: 3,
            }}
          >
            Clear
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
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        

        {!loading && products.length === 0 ? (
          <Card>
            <CardContent
              sx={{
                py: 8,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">No Products Found</Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try changing your search or price filters.
              </Typography>
            </CardContent>
          </Card>
        ) : (

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },

              gap: 3,
            }}
          >
            {products.map((item: any) => (
              <Card
                key={item._id}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",

                  display: "flex",
                  flexDirection: "column",

                  height: "100%",

                  transition: "0.2s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 5,
                  },
                }}
              >
        

                <Box
                  sx={{
                    width: "100%",
                    height: 250,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {item?.image ? (
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name || "Product"}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography color="text.secondary">No Image</Typography>
                    </Box>
                  )}
                </Box>


                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {item?.name || "Unnamed Product"}
                  </Typography>

                

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,

                      display: "-webkit-box",

                      WebkitLineClamp: 2,

                      WebkitBoxOrient: "vertical",

                      overflow: "hidden",
                    }}
                  >
                    {item?.description || "No description available"}
                  </Typography>

                

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    ₹{item?.price ?? 0}
                  </Typography>


                  {Array.isArray(item?.color) && item.color.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Colors
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          flexWrap: "wrap",
                        }}
                      >
                        {item.color.map((color: string, index: number) => (
                          <Chip
                            key={`${color}-${index}`}
                            label={color}
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}


                  {Array.isArray(item?.size) && item.size.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Sizes
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          flexWrap: "wrap",
                        }}
                      >
                        {item.size.map((size: string, index: number) => (
                          <Chip
                            key={`${size}-${index}`}
                            label={size}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleView(item._id)}
                    sx={{
                      mt: "auto",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {loading && products.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <CircularProgress size={30} />
          </Box>
        )}
      </Box>

      <UserFooter />
    </>
  );
};

export default Home;
