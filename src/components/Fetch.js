// Import Firestore database
import db from "./firbase";
import { useState } from "react";
import "./read.css";

const Fetch = () => {
  const [info, setInfo] = useState([]);

  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener("load", () => {
    Fetchdata();
  });

  // Fetch the required data using the get() method
  const Fetchdata = () => {
    db.collection("data")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setInfo((arr) => [...arr, data]);
        });
      });
  };

  // Display the result on the page
  return (
    <div>
      <center>
        <h2>Student Details</h2>
      </center>

      {info.map((data) => (
        <Frame course={data.CourseEnrolled} name={data.Nane} age={data.Age} />
      ))}
    </div>
  );
};

// Define how each display entry will be structured
const Frame = ({ details, author, activity }) => {
  console.log(course + " " + name + " " + age);
  return (
    <center>
      <div className="div">
        <p>AUTHOR : {author}</p>

        <p>ACTIVITY : {activity}</p>

        <p>DESCRIPTIONN : {details}</p>
      </div>
    </center>
  );
};

export default Fetch;
