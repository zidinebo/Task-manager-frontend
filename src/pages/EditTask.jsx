import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import backArrow from "../assets/Vector arrow back.png";
import DropDown from "../components/DropDown";
import { useFetch } from "../hooks/useFetch";
import toast from "react-hot-toast";

const EditTask = ({ baseURL }) => {
  const { id } = useParams();

  const { data } = useFetch(`${baseURL}/api/task/${id}`);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [tag, setTag] = useState("");

  const [sending, setSending] = useState(false);

  // ============ CONNECTING THEM TO THE ID WE CLICK ON
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setTag(data.tag);
    }
  }, [data]);

  const navigate = useNavigate();

  // ============ FUNCTION FOR HANDLE SUBMIT

  const handleSubmit = async (event) => {
    setSending(true);
    event.preventDefault();

    const editedData = {
      title,
      description,
      tag,
    };

    const oldData = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    };

    // FETCHING A RESPONSE TO SUBMIT
    const response = await fetch(`${baseURL}/api/task/${id}`, oldData);

    const resData = await response.json();

    if (response.status === 200) {
      toast.success(resData.message);
      setSending(false);
      navigate("/tasks");
      return;
    } else {
      toast.error(resData.message);
    }

    setSending(false);
  };

  return (
    <div className="editt-con text-start">
      <div className="back-to2 d-flex align-items-center gap-4">
        <Link to="/tasks">
          <img src={backArrow} alt="" />
        </Link>
        <h2 className="m-0">Edit Task</h2>
      </div>

      {/* ================= */}

      <form onSubmit={handleSubmit} className="editt-form" action="">
        <div className="title-edit position-relative">
          <label className="position-absolute" htmlFor="title">
            Task Title
          </label>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className="w-100 py-4 px-5 rounded-2"
            type="text"
            placeholder="E.g Project Defense, Assignment..."
            id="title"
            value={title}
          />
        </div>

        {/* =================== */}

        <div className="describe-edit position-relative">
          <label className="position-absolute" htmlFor="description">
            Description
          </label>
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            className="w-100 py-4 px-5 rounded-2"
            name=""
            id="description"
            cols="30"
            rows="7"
            placeholder="Briefly describe your task..."
            value={description}
          ></textarea>
        </div>

        {/* ===================================== */}

        <DropDown setTag={setTag} />

        {/* ===================================== */}

        <button disabled={sending} className="but-edit mt-4">
          Done
        </button>
      </form>
      {/* =================== */}
      <div className="my-5 bk-top text-center">
        <a href="#">Back To Top</a>
      </div>
    </div>
  );
};

export default EditTask;
