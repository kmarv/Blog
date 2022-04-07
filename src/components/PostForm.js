import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { db } from "../firebase";

const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [description, setDescription] = useState("");

  const[loader, setLoader] =- useState(false)

  const handleSubmit =(e)=>{
      e.preventDefault()
      setLoader(true)
      db.collection('posts').add({
          title:title,
          person:person,
          description:description,
      })
      .then(() =>{
          toast.success("Activity Registered SuccessFully")
          setLoader(false)
      })
      .catch((error) =>{
          toast.error('Activty not registered')
          setLoader(false)
      })

      setTitle("")
      setPerson("")
      setDescription("")
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} >
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
        <Button variant="primary" type="submit" style={{background:loader?"#ccc":"rgb(2,2,110)"}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PostForm;
