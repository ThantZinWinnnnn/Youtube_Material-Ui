import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants.js";

import { SearchBox } from "./index.js";

const Navbar = () => (
  <Stack
    direction={"row"}
    p={2}
    alignItems="center"
    sx={{
      position: "sticky",
      top: 0,
      justifyContent: "space-between",
      background: "#000",
    }}
  >
    <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    <SearchBox/>
  </Stack>
);

export default Navbar;
