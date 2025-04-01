import React, { useState, useEffect } from "react";
import ReactGA from 'react-ga4'
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize Google Analytics
  useEffect(() => {
    ReactGA.initialize("G-M8E6Z3NGZV"); // Replace with your GA Measurement ID
  }, []);
  
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("https://exp-backend-01.onrender.com/api/v1/users/register", values);
      message.success("Registeration Successfull");
       // Track user info as a lead
   ReactGA.set({
    user_id: values.email, // You can use email as a unique identifier
    name: values.name,
    email: values.email,
    phone: values.phone,
    address: values.address,
    gender: values.gender,
  });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
    <div className="register-page">
    {loading && <Spinner />}
      <Form layout="vertical"  onFinish={submitHandler}>
        <h1>Register Form</h1>
        <Form.Item label="Name" name="name">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input type="tel" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <div className="d-flex justify-content-between">
            <Link to="/login">Already Register ? Cleck Here to login</Link>
            <button className="btn btn-primary">Resgiter</button>
          </div>
      </Form>
    </div>
    
    </>
  )
}

export default Register;
