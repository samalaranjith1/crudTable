import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    jobTitleName: "",
    employeeCode: "",
    region: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);
  const { id } = useParams();

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3030/Employees/${id}`).then((res) => {
      setData(res.data);
      setFormData(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form values from formData

    //posting data to json server
    if (
      formData.name &&
      formData.emailAddress &&
      formData.employeeCode &&
      formData.phoneNumber &&
      formData.jobTitleName &&
      formData.region
    ) {
      axios
        .patch(`http://localhost:3030/Employees/${id}`, formData)
        .then(function (response) {
          console.log(response);
          alert("Data updated successfully");
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // Add your form submission logic here
  };
  return (
    <div className="App">
      <h1>My Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="jobTitleName">jobTitleName</label>
          <input
            type="text"
            id="jobTitleName"
            name="jobTitleName"
            value={formData.jobTitleName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="employeeCode">Employee code</label>
          <input
            type="text"
            id="employeeCode"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="region">Region</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email</label>
          <input
            type="text"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Update;
