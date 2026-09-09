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
  Pagination,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  fetchProduct,
  deleteExistingProduct,
} from "../../features/crud/crudSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const PRODUCTS_PER_PAGE = 4;

  const { product, loading, error, totalpage, currentpage, totalproduct } =
    useAppSelector((state: any) => state.crud);

  const [searchName, setSearchName] = useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const products = Array.isArray(product)
    ? product.filter((item: any) => item != null)
    : [];

  useEffect(() => {
    dispatch(
      fetchProduct({
        page: 1,
        limit: PRODUCTS_PER_PAGE,
      }),
    );
  }, [dispatch]);

  const handleSearch = () => {
    const name = searchName.trim();
    const min = minPrice.trim();
    const max = maxPrice.trim();

    if (min && max && Number(min) > Number(max)) {
      return;
    }

    dispatch(
      fetchProduct({
        name: name || undefined,

        minprice: min ? Number(min) : undefined,

        maxprice: max ? Number(max) : undefined,

        page: 1,

        limit: PRODUCTS_PER_PAGE,
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
        limit: PRODUCTS_PER_PAGE,
      }),
    );
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(
      fetchProduct({
        name: searchName.trim() || undefined,

        minprice: minPrice.trim() ? Number(minPrice) : undefined,

        maxprice: maxPrice.trim() ? Number(maxPrice) : undefined,

        page: value,

        limit: PRODUCTS_PER_PAGE,
      }),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/updateproduct/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(deleteExistingProduct(id)).unwrap();

      dispatch(
        fetchProduct({
          name: searchName.trim() || undefined,

          minprice: minPrice.trim() ? Number(minPrice) : undefined,

          maxprice: maxPrice.trim() ? Number(maxPrice) : undefined,

          page: currentpage || 1,

          limit: PRODUCTS_PER_PAGE,
        }),
      );
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  if (loading && products.length === 0) {
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

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 2,
          mb: 3,
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
            Product Management
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage all products in your store.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/createproduct")}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Create Product
        </Button>
      </Box>

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
            }}
          >
            Search & Filter
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {/* Search Name */}

            <TextField
              label="Product Name"
              placeholder="Search by name..."
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
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
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              onKeyDown={handleKeyDown}
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
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
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              onKeyDown={handleKeyDown}
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
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
                textTransform: "none",
              }}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClear}
              sx={{
                height: 56,
                px: 3,
                textTransform: "none",
              }}
            >
              Clear
            </Button>
          </Box>

          {minPrice && maxPrice && Number(minPrice) > Number(maxPrice) && (
            <Typography
              color="error"
              variant="body2"
              sx={{
                mt: 2,
              }}
            >
              Minimum price cannot be greater than maximum price.
            </Typography>
          )}
        </CardContent>
      </Card>

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

      {!loading && products.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing <strong>{products.length}</strong> products
            {totalproduct !== undefined && ` of ${totalproduct} products`}
          </Typography>
        </Box>
      )}

      {!loading && products.length === 0 ? (
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <CardContent
            sx={{
              py: 8,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 1,
              }}
            >
              No Products Found
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 3,
              }}
            >
              Try changing your search or price filters.
            </Typography>

            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClear}
              sx={{
                textTransform: "none",
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
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
            {products.map((item: any) => {
              if (!item) {
                return null;
              }

              return (
                <Card
                  key={item._id}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",

                    display: "flex",
                    flexDirection: "column",

                    height: "100%",

                    boxShadow: 2,

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
                      height: 230,
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
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
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
                    {/* Name */}

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {item?.name || "Unnamed Product"}
                    </Typography>

                    {/* Description */}

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

                    {/* Price */}

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                      }}
                    >
                      ₹{item?.price ?? 0}
                    </Typography>

                    {/* Colors */}

                    {Array.isArray(item?.color) && item.color.length > 0 && (
                      <Box
                        sx={{
                          mb: 2,
                        }}
                      >
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

                    {/* Sizes */}

                    {Array.isArray(item?.size) && item.size.length > 0 && (
                      <Box
                        sx={{
                          mb: 3,
                        }}
                      >
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

                    {/* Buttons */}

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: "auto",
                      }}
                    >
                      {/* Edit */}

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(item._id)}
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(item._id)}
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {totalpage > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
                mb: 3,
              }}
            >
              <Pagination
                count={totalpage}
                page={currentpage || 1}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      {loading && products.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            pointerEvents: "none",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
