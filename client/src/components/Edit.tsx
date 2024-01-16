import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";

interface valuesInterface {
  id: number;
  name: string;
  email_address: string;
  age: string;
  department: string;
  salary: string;
}

function Edit() {
  let { id } = useParams();
  let [employee, setEmployee] = useState<valuesInterface>({
    id: 0,
    name: "",
    email_address: "",
    age: "",
    department: "",
    salary: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    email_address: Yup.string().email("Must be an email address"),
    age: Yup.number().typeError("Must be a number"),
    department: Yup.string(),
    salary: Yup.number().typeError("Must be a number"),
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employees/byID/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit(data: any) {
    console.log(data);
    axios
      .put(`http://localhost:5000/employees/byID/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container-fluid vh-100 vw-100">
      <h3>Edit employee</h3>
      <div className="d-flex justify-content-end">
        <Link to="/" className="btn btn-success">
          Home
        </Link>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={employee}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <ErrorMessage name="name" component="div"></ErrorMessage>
                </th>
                <th>
                  Email Address
                  <ErrorMessage
                    name="email address"
                    component="div"
                  ></ErrorMessage>
                </th>
                <th>
                  Age
                  <ErrorMessage name="age" component="div"></ErrorMessage>
                </th>
                <th>
                  Department
                  <ErrorMessage
                    name="department"
                    component="div"
                  ></ErrorMessage>
                </th>
                <th>
                  Salary
                  <ErrorMessage name="salary" component="div"></ErrorMessage>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Field
                    autoComplete="off"
                    id="inputCreateEntry"
                    name="name"
                  ></Field>
                </td>
                <td>
                  <Field
                    autoComplete="off"
                    id="inputCreateEntry"
                    name="email_address"
                  ></Field>
                </td>
                <td>
                  <Field
                    autoComplete="off"
                    id="inputCreateEntry"
                    name="age"
                  ></Field>
                </td>
                <td>
                  <Field
                    autoComplete="off"
                    id="inputCreateEntry"
                    name="department"
                  ></Field>
                </td>
                <td>
                  <Field
                    autoComplete="off"
                    id="inputCreateEntry"
                    name="salary"
                  ></Field>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default Edit;
