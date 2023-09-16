import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Table() {
  const [searchValue, setSearchValue] = useState("");
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3030/Employees").then((res) => {
      setColumns(Object.keys(res.data[0]));
      setData(res.data);
    });
  }, []);
  const { id } = useParams();
  function handleClick(id) {
    console.log(id);
    axios
      .delete(`http://localhost:3030/Employees/${id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function sort(e) {
    const sortItem = e.target.textContent.toLowerCase();
    setData([...data].sort((a, b) => (a[sortItem] < b[sortItem] ? -1 : 1)));
  }
  function SearchHandle() {
    setData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue) ||
          item.phoneNumber.toLowerCase().includes(searchValue) ||
          item.emailAddress.toLowerCase().includes(searchValue) ||
          item.region.toLowerCase().includes(searchValue) ||
          item.employeeCode.toLowerCase().includes(searchValue) ||
          item.region.toLowerCase().includes(searchValue) ||
          item.jobTitleName.toLowerCase().includes(searchValue)
      )
    );
  }

  return (
    <div>
      <h2>Table</h2>
      <div
        style={{
          color: "red",
          width: "200px",
          margin: "0px auto",
        }}
      >
        <Link to="/create">Add +</Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
        <button style={{ display: "inline" }} onClick={SearchHandle}>
          Search
        </button>
      </div>
      <table style={{ width: "70%", alignItems: "center", margin: "0px auto" }}>
        <thead>
          {/* <tr>
            {columns.map((column, i) => (
              <>
                <th key={i} style={{ padding: "0 10px" }}>
                  {column}
                </th>
              </>
            ))}
          </tr> */}
          <tr>
            <th onClick={sort}>Id</th>

            <th onClick={sort}>Name</th>
            <th>Job</th>
            <th>Empolyee code</th>
            <th>Region</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => (
            <>
              <tr key={i} style={{ padding: "0 10px" }}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.jobTitleName}</td>
                <td>{data.employeeCode}</td>
                <td>{data.region}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.emailAddress}</td>
                <td>
                  <Link to={`/update/${data.id}`}>
                    <button style={{ display: "inline" }}>Update</button>
                  </Link>
                  <button
                    onClick={(e) => handleClick(data.id)}
                    style={{ display: "inline" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
