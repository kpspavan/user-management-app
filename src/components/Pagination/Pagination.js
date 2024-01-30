import React from "react";
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserPagination = ({ page, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
    </Stack>
  );
};

export default UserPagination;
