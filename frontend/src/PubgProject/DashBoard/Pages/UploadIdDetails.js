import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPostIdDetails } from "../../Redux/Features/IdeDetailsSlice";
import { FaPlus, FaTint } from "react-icons/fa";
import Form from "../../Components/Forms/Form";
import AppButton from "../../Components/Forms/AppButton";
import AppInput from "../../Components/Forms/AppInput";
import AppSpinner from "../../Components/AppSpinner";
import { toast } from "react-toastify";

const UploadIdDetails = () => {
  const dispatch = useDispatch();
  // const [FilesName, setFilesName] = useState([]);
  const [UploadData, setUploadData] = useState({
    title: "",
    subTitle: "",
    discription: "",
    price: "",
    idLevel: "",
    image: [],
  });
  const { title, subTitle, discription, price, idLevel, image } = UploadData;
  // const onChangeFile = (e) => {
  //   setFilesName([...e.target.files]);
  // };
  const { loading, error } = useSelector((state) => state.IdDetails);
  const onSubmit = async (e) => {
    const fd = new FormData();

    image.map((file) => {
      return fd.append("image", file);
    });

    fd.append("title", title);
    fd.append("subTitle", subTitle);
    fd.append("discription", discription);
    fd.append("price", price);
    fd.append("idLevel", idLevel);

    dispatch(asyncPostIdDetails({ fd, toast }));
    // use taost message
    setUploadData({
      title: "",
      subTitle: "",
      discription: "",
      price: "",
      idLevel: "",
      image: [],
    });
  };
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  return (
    <section className="ml-10 ">
      <Form>
        <label htmlFor="fileUpload">
          select file
          <FaPlus className="py-1 text-4xl bg-blue-700 rounded-full" />
        </label>
        <input
          id="fileUpload"
          className="hidden"
          multiple
          type="file"
          // onChange={onChangeFile}
          onChange={(e) =>
            setUploadData({ ...UploadData, image: [...e.target.files] })
          }
        />
        <AppInput
          icon={<FaTint />}
          placeholder={"title"}
          type="text"
          value={UploadData.title}
          onChange={(e) =>
            setUploadData({ ...UploadData, title: e.target.value })
          }
        />
        <AppInput
          icon={<FaTint />}
          placeholder={"subTitle"}
          type="text"
          value={UploadData.subTitle}
          onChange={(e) =>
            setUploadData({ ...UploadData, subTitle: e.target.value })
          }
        />
        <AppInput
          icon={<FaTint />}
          placeholder={"discription"}
          type="text"
          value={UploadData.discription}
          onChange={(e) =>
            setUploadData({ ...UploadData, discription: e.target.value })
          }
        />
        <AppInput
          icon={<FaTint />}
          placeholder={"price"}
          type="text"
          value={UploadData.price}
          onChange={(e) =>
            setUploadData({ ...UploadData, price: e.target.value })
          }
        />
        <AppInput
          icon={<FaTint />}
          placeholder={"idLevel"}
          type="text"
          value={UploadData.idLevel}
          onChange={(e) =>
            setUploadData({ ...UploadData, idLevel: e.target.value })
          }
        />
        <AppButton onClick={onSubmit}>
          {loading ? <AppSpinner /> : "Submit"}
        </AppButton>
      </Form>
    </section>
  );
};

export default UploadIdDetails;
