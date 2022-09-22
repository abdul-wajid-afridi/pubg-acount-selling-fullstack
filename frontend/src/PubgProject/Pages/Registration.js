import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../Config/UrlConfig";
import { toast } from "react-toastify";
import Form from "../Components/Forms/Form";
import AppInput from "../Components/Forms/AppInput";
import AppButton from "../Components/Forms/AppButton";
import AppHeader from "../Components/AppHeader";
import { asyncSignUp, selectError } from "../Redux/Features/UserSlice";
import AppSpinner from "../Components/AppSpinner";

const Registration = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => ({ ...state.UserSlice }));

  const error = useSelector(selectError);
  const handleRegistration = async () => {
    dispatch(
      asyncSignUp({ toast, navigate, userName, email, password, phoneNumber })
    );
    setUserName("");
    setEmail("");
    setPassword("");
    setphoneNumber("");
  };
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center ">
      <AppHeader>User Registration</AppHeader>
      <Form
        onSubmit={handleRegistration}
        className="flex flex-col gap-10 bg-gray-200 w-[400px] py-20"
      >
        <AppInput
          type="text"
          placeholder="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <AppInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AppInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AppInput
          type="number"
          placeholder="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <AppButton onClick={handleRegistration}>
          {loading ? <AppSpinner /> : "Register"}
        </AppButton>
      </Form>
    </section>
  );
};

export default Registration;
