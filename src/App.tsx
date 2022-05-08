import React from "react";
import { Route, Routes } from "react-router-dom";
import Airtable from "airtable";

import "./App.css";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/useDispatch";
import { setStudent } from "./redux/ducks/students";

const base = new Airtable({ apiKey: process.env.REACT_APP_AP }).base(
  "app8ZbcPx7dkpOnP0"
);

function App() {
  const dispatch = useAppDispatch();
  // const students = useAppSelector((state) => state.students);
  // useEffect(() => {
  //   base("students")
  //     .select({ filterByFormula: 'SEARCH(' })
  //     .eachPage((records, fetchNextPage) => {
  //       console.log(records);
  //       dispatch(setStudent(records));
  //       fetchNextPage();
  //     });
  // }, []);
  return (
    <div className="App">
      {/* {students?.map(student => (
      <Student 
        key={student.id}
        student={student}

      
      />
      ))} */}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
