// Createblog.js

"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

const Createblog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choice, setChoice] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const router = useRouter();
  const isValidImageUrl = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" }); 
      return response.ok && response.headers.get("Content-Type").startsWith("image/");
    } catch {
      return false;
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   file && setImageUrl(file); // Lưu file vào state
  //   // const reader = new FileReader();
  //   // reader.onloadend = () => {
  //   //   setImageUrl(reader.result);
  //   // };
  //   // reader.readAsDataURL(file);
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };
  
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  const addData = async () => {
    const currentDate = new Date().toLocaleDateString();
    if (!author || !title || !description || !imageUrl) {
      alert("Please fill in all fields and provide a valid image.");
      return;
    }
    const newId = generateUniqueId();

    const newData = {
      id: newId,
      author: author,
      date: currentDate,
      title: title,
      description: description,
      imageUrl: imageUrl,
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });


      if (response.ok) {
        setAuthor("");
        setTitle("");
        setDescription("");
        setChoice("");
        setImageUrl("");
        alert("Bài viết đã được thêm thành công!");
        router.push("/");
      } else {
        console.error("Failed to add data");
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }

    // router.push("/blog");
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
            <div
              className="flex justify-center"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
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
                    // style={{}}
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
// *Chọn nhiều ảnh
// const handleImageChange = (e) => {
//   const files = Array.from(e.target.files); // Chuyển FileList thành mảng
//   const objectUrls = files.map((file) => URL.createObjectURL(file)); // Tạo URL cho từng file
//   setImageUrl(objectUrls); // Lưu danh sách URL vào state
// };
// * Nếu dùng  cách này thì cập nhật state 
// const [imageUrl, setImageUrl] = useState([]); // Lưu danh sách URL của ảnh