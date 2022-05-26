import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";



const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [description, setDescription] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [loader, setLoader] = -useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/postreg");
  }, [user, loading])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    db.collection("posts")
      .add({
        title: title,
        person: person,
        description: description,
      })
      .then(() => {
        toast.success("Activity Registered SuccessFully");
        setLoader(false);
      })
      .catch((error) => {
        toast.error("Activty not registered");
        setLoader(false);
      });

    setTitle("");
    setPerson("");
    setDescription("");
  };
  return (
    <div className="postreg">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Text className="text-muted">
            Please include title of activity
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Person Responsible</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author/ Person Responsible"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Control
            as="textarea"
            placeholder="enter Activity Description"
            style={{ height: "100px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ background: loader ? "#ccc" : "rgb(2,2,110)" }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PostForm;
