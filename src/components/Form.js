import db from '../firebase';
import React,{useState} from 'react';

const Form= () => {
	const [author , Setauthor] = useState("");
	const [activity , Setactivity] = useState("");
	const [details , Setdetails] = useState("");
	const sub = (e) => {
		e.preventDefault();
		
		// Add data to the store
		db.collection("data").add({
			Author: author,
			Activity: activity,
			ActivityDetails: details
		})
		.then((docRef) => {
			alert("Data Successfully Submitted");
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
	}

	return (
		<div>
			<center>
				<form style={{marginTop:"200px" }}
				onSubmit={(event) => {sub(event)}}>
					<input type="text" placeholder="Authorname"
					onChange={(e)=>{Setname(e.target.value)}} />
					<br/><br/>
					<input type="text" placeholder="ActivityName"
					onChange={(e)=>{Setage(e.target.value)}}/>
					<br/><br/>
					<input type="text" placeholder="ActivityDescription"
					onChange={(e)=>{Setcourse(e.target.value)}}/>
					<br/><br/>
					<button type="submit">Submit</button>
				</form>
			</center>
		</div>
	);
}

export default Form;
