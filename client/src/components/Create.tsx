import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface valuesInterface {
  name: string;
  email_address: string;
  age: string;
  department: string;
  salary: string;
}

function Create() {
  const initialValues: valuesInterface = {
    name: "",
    email_address: "",
    age: "",
    department: "",
    salary: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
    email_address: Yup.string()
      .email("Must be an email address")
      .required("Email Address is a required field"),
    age: Yup.number()
      .required("Age is a required field")
      .typeError("Must be a number"),
    department: Yup.string().required("Department is a required field"),
    salary: Yup.number()
      .required("Salary is a required field")
      .typeError("Must be a number"),
  });

  const navigate = useNavigate();

  function handleSubmit(data: any) {
    axios
      .post("http://localhost:5000/employees", data)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container-fluid vh-100 vw-100">
      <h3>Add Employee</h3>
      <div className="d-flex justify-content-end">
        <Link to="/" className="btn btn-success">
          Home
        </Link>
      </div>
      <div className="row">
        <Formik
          initialValues={initialValues}
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
                      name="email_address"
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
                      placeholder="(Ex. John...)"
                    ></Field>
                  </td>
                  <td>
                    <Field
                      autoComplete="off"
                      id="inputCreateEntry"
                      name="email_address"
                      placeholder="(Ex. Johndoe@outlook.com...)"
                    ></Field>
                  </td>
                  <td>
                    <Field
                      autoComplete="off"
                      id="inputCreateEntry"
                      name="age"
                      placeholder="(Ex. 20...)"
                    ></Field>
                  </td>
                  <td>
                    <Field
                      autoComplete="off"
                      id="inputCreateEntry"
                      name="department"
                      placeholder="(Ex. Marketing...)"
                    ></Field>
                  </td>
                  <td>
                    <Field
                      autoComplete="off"
                      id="inputCreateEntry"
                      name="salary"
                      placeholder="(Ex. 100000...)"
                    ></Field>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default Create;
