import React from "react";
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";

import Settings from "./Settings";

const Home = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Box textAlign={"center"} mt={5}>
        <Typography variant="h1">Quiz App</Typography>
        <Settings/>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
