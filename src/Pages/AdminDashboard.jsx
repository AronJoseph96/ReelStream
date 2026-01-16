import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Movie");
  const [poster, setPoster] = useState("");
  const [content, setContent] = useState([]);

  // Load content
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reelstream_content")) || [];
    setContent(stored);
  }, []);

  const uploadContent = () => {
    if (!title || !poster) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      title,
      type,
      poster,
    };

    const updated = [...content, newItem];
    setContent(updated);
    localStorage.setItem("reelstream_content", JSON.stringify(updated));

    setTitle("");
    setPoster("");
  };

  const deleteContent = (id) => {
    const updated = content.filter((item) => item.id !== id);
    setContent(updated);
    localStorage.setItem("reelstream_content", JSON.stringify(updated));
  };

  return (
    <div className="container text-light" style={{ paddingTop: "100px" }}>
      <h2>🎬 Admin Dashboard</h2>
      <p>Upload Movies / TV Series</p>

      {/* Upload Form */}
      <div className="card p-3 mb-4 text-dark">
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Movie</option>
          <option>TV Series</option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Poster Image URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />

        <button className="btn btn-danger" onClick={uploadContent}>
          Upload
        </button>
      </div>

      {/* Uploaded Content */}
      <div className="row">
        {content.map((item) => (
          <div className="col-md-3 mb-3" key={item.id}>
            <div className="card">
              <img
                src={item.poster}
                alt={item.title}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-dark">
                <h6>{item.title}</h6>
                <small className="text-muted">{item.type}</small>
                <button
                  className="btn btn-sm btn-danger w-100 mt-2"
                  onClick={() => deleteContent(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
