import React from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { setStudent } from "../redux/ducks/students";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.REACT_APP_AP }).base(
  "app8ZbcPx7dkpOnP0"
);
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = React.useState(Boolean);
  const [alert, setAlert] = React.useState({ type: "", message: "" });
  const [value, setValue] = React.useState("");
  const students = useAppSelector((state) => state.students);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });
    base("Students")
      .select({
        filterByFormula: `SEARCH(${value}, Name)`,
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        dispatch(setStudent(records));
        fetchNextPage();
      });
    // axios
    //   .get(`${process.env.REACT_APP_API}`, event.target.values)
    //   .then((res: AxiosResponse) => {
    //     console.log("response", res);
    //     console.log("clicked");
    //     setLoading(false);
    //     setStudent(res);
    //     // navigate("/details", { replace: true });
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     const apiErrors = err;
    //     console.log(err);
    //   });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
