import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncLoginUser, selectError } from "../Redux/Features/UserSlice";
import { toast } from "react-toastify";
import AppButton from "../Components/Forms/AppButton";
import AppInput from "../Components/Forms/AppInput";
import Form from "../Components/Forms/Form";
import { useEffect } from "react";
import AppHeader from "../Components/AppHeader";
import AppSpinner from "../Components/AppSpinner";

const Login = () => {
  const [phoneNumber, setphoneNumber] = useState();
  const [password, setUserPassword] = useState();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const { loading } = useSelector((state) => ({ ...state.UserSlice }));

  const handleLogin = async () => {
    dispatch(asyncLoginUser({ phoneNumber, password, Navigate, toast }));
  };
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  return (
    <section className="flex flex-col items-center">
      <AppHeader>User Login</AppHeader>
      <Form>
        <AppInput
          type="text"
          placeholder="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <AppInput
          type="text"
          placeholder="userPassword"
          value={password}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <AppButton onClick={handleLogin}>
          {loading ? <AppSpinner /> : "Login"}
        </AppButton>
      </Form>
    </section>
  );
};

export default Login;
