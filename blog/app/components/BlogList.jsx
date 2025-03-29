"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

function BlogList() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Blog deleted successfully!");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api", {
          method: "GET",
        });

        if (response.ok) {
          const blogs = await response.json();
          console.log("Blogs:", blogs);
          setData(blogs);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  let filteredData = data;
  if (searchQuery.trim() !== "") {
    filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div>
      <div className="container bg-light" style={{ marginTop: "5rem" }}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="row">
          {filteredData.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt="Blog"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {`${item.description.substring(0, 30)}...`}
                  </p>
                  <div className="d-flex justify-content-between align-items-center row">
                    <div>
                      <p className="m-0 small col">
                        {"posted by "}
                        {item.author}
                      </p>
                      <small className="text-muted">{item.date}</small>
                    </div>
                  </div>
                  <Link href={`/${item.id}`}>
                    <button className="btn btn-primary" style={{marginTop: "1rem"}}>Read more</button>
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    style = {{marginTop: "1rem"}}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BlogList;
