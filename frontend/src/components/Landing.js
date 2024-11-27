import React from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import Navbar from "./Navbar";
import landingImage from "./assets/img/landingImage.png";
import lI from "./assets/img/landingImage.jpg";
import Feature from "./Features";

const LandingPage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      

      {/* Hero Section */}
      <Box
        sx={{
          height: "35vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${landingImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
             // Dark overlay for better readability
            
          }}
        />
        <Container sx={{ position: "relative", zIndex: 2,}}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: "bold" }}>
            Get Fit with Us!
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              mt: 2,
              mb: 4,
              maxWidth: "600px",
              marginX: "auto",
              fontSize: "1.2rem",
              
            }}
          >
            PULSE is your daily health companion, designed to help you achieve your wellness goals.
          </Typography>
         < a href='/signin'>
          <Button 
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: "25px",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Join Now
          </Button>
          </a>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6, backgroundColor: "#f9f9f9", backgroundImage: `url(${lI})`,
          backgroundSize: "cover",}}>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 4,
              
            }}
          >
            Why Choose PULSE?
          </Typography>
          <Feature />
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ py: 6, backgroundColor: "#1976d2", color: "white" }}>
        <Container>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          >
           Live, Love, Laugh!
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ textAlign: "center", mb: 1 }}
          >
            PULSE: Experience a Healthy Lifestyle
          </Typography>
          <Typography variant="body2" component="p" sx={{ textAlign: "center" }}>
            Ananya Patankar | Yash Shah | Chaitralee Datar
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;
