// pages/[id].js
// 'use client';
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const BlogDetails = () => {
  const [blogDetail, setBlogDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("myData"));
    const selectedBlog = blogs.find((blog) => blog.id === parseInt(id));
    setBlogDetail(selectedBlog);
  }, [id]);

  if (!blogDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-light" style={{ marginTop: "5rem" }}>
      <div className="card mt-5">
        <img
          src={blogDetail.imageUrl}
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            objectFit: "cover",
          }}
          className="card-img-top"
          alt="Blog"
        />
        <div className="card-body">
          <h1 className="card-title">{blogDetail.title}</h1>
          <p className="card-text">{blogDetail.description}</p>
          <p className="card-text">Author: {blogDetail.author}</p>
          <p className="card-text">Date: {blogDetail.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
