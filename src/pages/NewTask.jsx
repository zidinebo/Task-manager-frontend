import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../assets/Vector arrow back.png";

import DropDown from "../components/DropDown";
import toast from "react-hot-toast";

const NewTask = ({ baseURL }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Urgent");
  const [sending, setSending] = useState(false);

  const nav = useNavigate();

  const handleSubmit = async (event) => {
    setSending(true);
    event.preventDefault();

    const formData = {
      title,
      description,
      tag,
    };

    const newData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${baseURL}/api/task/create`, newData);

    const data = await response.json();

    if (response.status === 400) {
      toast.error(data.message);
      setSending(false);
      return;
    }

    toast.success(data.message);
    setSending(false);
    nav("/tasks");
  };

  // =========================================================

  return (
    <div className="newt-con text-start">
      <div className="back-to1 d-flex align-items-center gap-4">
        <Link to="/tasks">
          <img src={backArrow} alt="" />
        </Link>
        <h2 className="m-0">New Task</h2>
      </div>
      {/* ================= */}

      <form onSubmit={handleSubmit} action="" className="newt-form">
        <div className="title-new position-relative">
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
          />
        </div>

        {/* =================== */}

        <div className="describe-new position-relative">
          <label className="position-absolute" htmlFor="description">
            Description
          </label>
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            className="w-100 py-4 px-5 rounded-2"
            name="description"
            id="description"
            cols="30"
            rows="7"
            placeholder="Briefly describe your task..."
          ></textarea>
        </div>

        {/* ============================================ */}

        <DropDown setTag={setTag} />

        {/* ============================================== */}

        <button disabled={sending} className="but-new mt-4">
          Done
        </button>
      </form>
      {/* =============================================== */}
      <div className="my-5 bk-top text-center">
        <a href="#">Back To Top</a>
      </div>
    </div>
  );
};

export default NewTask;
