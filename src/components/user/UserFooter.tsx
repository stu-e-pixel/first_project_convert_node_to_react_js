

import {
  Box,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const UserFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111827",
        color: "#fff",
        mt: 6,
      }}
    >

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 5, md: 7 },

          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: 4, md: 8 },
        }}
      >

        <Box
          sx={{
            flex: 1,
            minWidth: 220,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}
          >
            MyStore
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#cbd5e1",
              lineHeight: 1.8,
              maxWidth: 320,
            }}
          >
            Discover quality products at the best
            prices. Shop your favorite products
            anytime, anywhere.
          </Typography>

          

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 3,
            }}
          >
            <IconButton
              sx={{
                color: "#fff",
                backgroundColor: "#1f2937",
                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "#fff",
                backgroundColor: "#1f2937",
                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "#fff",
                backgroundColor: "#1f2937",
                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              <TwitterIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "#fff",
                backgroundColor: "#1f2937",
                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Box>

        

        <Box
          sx={{
            flex: 1,
            minWidth: 160,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Quick Links
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.3,
            }}
          >
            <Link
              href="/user/home"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Home
            </Link>

            <Link
              href="/user/viewproduct"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Products
            </Link>

            <Link
              href="/user/profile"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              My Profile
            </Link>

            <Link
              href="/user/bookmark"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Bookmarks
            </Link>
          </Box>
        </Box>



        <Box
          sx={{
            flex: 1,
            minWidth: 180,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Customer Service
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.3,
            }}
          >
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Contact Us
            </Link>

            <Link
              href="#"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              FAQ
            </Link>

            <Link
              href="#"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              underline="none"
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Terms & Conditions
            </Link>
          </Box>
        </Box>


        <Box
          sx={{
            flex: 1,
            minWidth: 200,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Contact Us
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#cbd5e1",
              }}
            >
              Email: support@mystore.com
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#cbd5e1",
              }}
            >
              Phone: +91 98765 43210
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#cbd5e1",
                lineHeight: 1.6,
              }}
            >
              Address: Kolkata, West Bengal,
              India
            </Typography>
          </Box>
        </Box>
      </Box>


      <Divider
        sx={{
          borderColor: "#374151",
        }}
      />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: 2.5,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,

          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#94a3b8",
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          © {new Date().getFullYear()} MyStore.
          All rights reserved.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#94a3b8",
            textAlign: {
              xs: "center",
              sm: "right",
            },
          }}
        >
          Made with ❤️ for our customers
        </Typography>
      </Box>
    </Box>
  );
};

export default UserFooter;
