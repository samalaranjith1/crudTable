import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function Delete() {
  const { id } = useParams();
  axios
    .delete(`http://localhost:3030/Employees${id}`)
    .then((response) => {
      console.log(`Deleted post with ID ${id}`);
    })
    .catch((error) => {
      console.error(error);
    });
  return <div>Delete</div>;
}

export default Delete;
