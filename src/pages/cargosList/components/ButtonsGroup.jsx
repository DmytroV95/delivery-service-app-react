import React from "react";
import Button from "@mui/material/Button";
import pageURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {Link} from "react-router-dom";

export default function ButtonsGroup({ onFilterClick, showFilters  }) {
    const handleClick = () => {
            onFilterClick();
    };

  return (
    <>
        <Button
            variant="contained"
            component={Link}
            to={`${pageURLs[pages.cargosList]}/create`}
        >
            NEW CARGO
        </Button>
        <Button variant="contained" onClick={handleClick}>
            {showFilters ? "CLOSE FILTER" : "FILTER"}
        </Button>
    </>
  );
}
