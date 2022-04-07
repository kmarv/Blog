import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, navigate, user]);
  return (
    <body id="page-top">
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
    <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#page-top">BSE22-21 Project</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto my-2 my-lg-0">
                <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="#services">Project</a></li>
                <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
                <li className="nav-item"><a className=" btn btn-primary" onClick={logout} href="#contact">Logout</a></li>
            </ul>
        </div>
    </div>
</nav>
{/* Masthead */}
<header className="masthead">
    <div className="container px-4 px-lg-5 h-100">
        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
                <h1 className="text-white font-weight-bold">BSE22-21 Blog  </h1>
                <h1 className="text-white font-weight-bold">Malaria Parasite Detection Artificial Intelligence  </h1>
                <hr className="divider" />
            </div>
            <div className="col-lg-8 align-self-baseline">
                <p className="text-white-75 mb-5">We are team of students in out final year at Makerere University Undertaking a final Project</p>
                <a className="btn btn-primary btn-xl" href="#about">Find Out More</a>
            </div>
        </div>
    </div>
</header>
{/* About */}
        <section className="page-section bg-primary" id="about">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 className="text-white mt-0">Project: Malaria Parasite Detection Using Image Processing And Machine learning</h2>
                        <hr className="divider divider-light" />
                        <p className="text-white-75 mb-4">We are team of  4 students in out final year at Makerere University Undertaking a final Project looking to achieve a degree in software engineering</p>
                        <h2 className="text-white ">Project Description</h2>
                        <p className="text-white-75 mb-4">Our project Is an Artificial Intelligent system that Will help doctors and lab technician in detecting malaria parasites in blood samples taken from blood streams of patients </p>
                        <h2 className="text-white ">Project Aims & Goals</h2>
                        <p className="text-white-75 mb-4"> Aim to provide an automated process for detecting malaria parasites</p>
                        <p className="text-white-75 mb-4"> Aim to reduce the time spent by lab technicians when checking blood samples for malaria parasites</p>
                        <p className="text-white-75 mb-4">Aim to make use of technologies like AI to further better medical services in our country</p>
                    </div>
                </div>
            </div>
        </section>
        
</body>
  );
}
export default Dashboard;
