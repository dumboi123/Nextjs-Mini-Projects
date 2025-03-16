// Createblog.js

"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { redirect } from "next/navigation";

const Createblog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choice, setChoice] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const initialBlogs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("myData")) || []
      : [];
  const [data, setData] = useState(initialBlogs);

  const isValidImageUrl = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(data));
  }, [data]);

  const addData = () => {
    const currentDate = new Date().toLocaleDateString();
    if (!author || !title || !description || !imageUrl) {
      alert("Please fill in all fields and provide a valid image.");
      return;
    }

    const newData = {
      id: data.length + 1,
      author: author,
      date: currentDate,
      title: title,
      description: description,
      imageUrl: imageUrl,
    };
    const updatedData = [...data, newData];
    setData(updatedData);
    setAuthor("");
    setTitle("");
    setDescription("");
    setChoice("");
    setImageUrl("");
  };

  return (
    <div>
      <div className="container bg-light" style={{ marginTop: "5rem" }}>
        <div>
          <div>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="mb-2"></div>
            <label className="form-label">Image Source</label>
            <select
              className="form-select mb-2"
              onChange={(e) => setChoice(e.target.value)}
            >
              <option value="">Select Image Source</option>
              <option value="link">Link URL</option>
              <option value="file">From File</option>
            </select>
            {choice === "link" && (
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Image URL"
                onChange={(e) => setImageUrl(e.target.value)}
              />
            )}
            {choice === "file" && (
              <input
                type="file"
                className="form-control mb-2"
                onChange={handleImageChange}
              />
            )}
            <div className="flex justify-center" style={{ marginTop: "1rem" }}>
              {imageUrl &&
                (choice === "link" ? (
                  isValidImageUrl(imageUrl) ? (
                    <Image
                      src={imageUrl}
                      alt="image"
                      width={400}
                      height={400}
                    ></Image>
                  ) : (
                    <p>
                      No valid image URL provided. Please upload an image or
                      provide a valid image URL.
                    </p>
                  )
                ) : (
                  <Image
                    src={imageUrl}
                    alt="image"
                    width={400}
                    height={400}
                    style={{}}
                  ></Image>
                ))}
            </div>
          </div>
          <button
            onClick={addData}
            className={`btn btn-primary mb-2 form-control`}
            // style={{ width: 500 }}
          >
            Add Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createblog;
