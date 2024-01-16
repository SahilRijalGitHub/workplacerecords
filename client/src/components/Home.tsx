import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Home.css";

function Home() {
  const [data, setData] = useState([]);

  function getData() {
    axios
      .get("http://localhost:5000/employees")
      .then((resolution) => {
        setData(resolution.data);
        console.log("Set database data into client side");
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getData();
  }, []);

  function onDelete(id: any) {
    axios
      .delete(`http://localhost:5000/employees/byID/${id}`)
      .then((res) => {
        getData();
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container-fluid vh-100 vw-100">
      <h3>Employees</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add Employee
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Age</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee: any, index) => {
            return (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email_address}</td>
                <td>{employee.age}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link className="btn btn-success" to={`/edit/${employee.id}`}>
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    to="/"
                    onClick={() => {
                      onDelete(employee.id);
                      console.log("Delete pressed");
                    }}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
