import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ FIXED

  // Search text
  const [q, setQ] = useState("");

  // Filter state
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [language, setLanguage] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");

  const genres = useMemo(
    () => [
      "Action","Adventure","Animation","Biography","Comedy","Crime","Drama",
      "Family","Fantasy","History","Horror","Music","Musical","Mystery",
      "Romance","Sci-Fi","Sport","Supernatural","Thriller","War","Western",
    ],
    []
  );

  const toggleGenre = (g) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setLanguage("");
    setYearFrom("");
    setYearTo("");
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (selectedGenres.length) params.set("genres", selectedGenres.join(","));
    if (language) params.set("lang", language);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);

    navigate(`/movies?${params.toString()}`);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-overlay">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            ReelStream
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            {/* LEFT */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/series">TV Series</Link>
              </li>
            </ul>

            {/* SEARCH */}
            <form
              className="d-flex ms-lg-3 my-2 my-lg-0 flex-grow-1"
              onSubmit={onSearchSubmit}
            >
              <input
                className="form-control me-2 nav-search"
                type="search"
                placeholder="Search movies, series..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />

              <button
                type="button"
                className="btn btn-outline-light me-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#filtersOffcanvas"
              >
                Filters
              </button>

              <button className="btn btn-danger" type="submit">
                Search
              </button>
            </form>

            {/* RIGHT SIDE */}
            <ul className="navbar-nav ms-lg-3">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {user.name} {user.role === "ADMIN" && "(Admin)"}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    {user.role === "ADMIN" && (
                      <li>
                        <Link className="dropdown-item" to="/admin/dashboard">
                          Admin Panel
                        </Link>
                      </li>
                    )}

                    <li><hr className="dropdown-divider" /></li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

          </div>
        </div>
      </nav>

      {/* FILTER OFFCANVAS (unchanged) */}
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="filtersOffcanvas"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Filters</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="mb-3">
            <div className="fw-semibold mb-2">Genres</div>
            {genres.map((g) => (
              <div className="form-check" key={g}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedGenres.includes(g)}
                  onChange={() => toggleGenre(g)}
                />
                <label className="form-check-label">{g}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Language</label>
            <select
              className="form-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Any</option>
              <option value="english">English</option>
              <option value="malayalam">Malayalam</option>
              <option value="tamil">Tamil</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>

          <div className="row g-2 mb-4">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Year from"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Year to"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary w-50" onClick={clearFilters}>
              Clear
            </button>
            <button
              className="btn btn-danger w-50"
              onClick={applyFilters}
              data-bs-dismiss="offcanvas"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
