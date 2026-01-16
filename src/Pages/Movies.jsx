import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Movies() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  // Filter movies only
  const moviesData = [
    { id: 1, title: "Avengers: Endgame", year: 2019, poster: "https://m.media-amazon.com/images/I/91G-Ha5ibRL._UF1000,1000_QL80_.jpg", type: "movie" },
    { id: 2, title: "Manjummel Boys", year: 2024, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEp-4WeaQWdHyKPf4HYMvvfWXLJDJRyNkZUg&s", type: "movie" },
    { id: 3, title: "RRR", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/250px-RRR_Poster.jpg", type: "movie" },
    { id: 4, title: "Oppenheimer", year: 2023, poster: "https://m.media-amazon.com/images/M/MV5BM2RmYmVmMzctMzc5Ny00MmNiLTgxMGUtYjk1ZDRhYjA2YTU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", type: "movie" },
    { id: 5, title: "Dune: Part Two", year: 2024, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMysalZCd7ljRGx7WFAJO15rqeGTuOCDfLZxMcFBJHqsazY3yJJrL6xFxp7MFohluCvEH9ms_fI4og1d5HCmmZDhHyY03g6Ig67X0oyA&s=10", type: "movie" },
    { id: 6, title: "Kantara", year: 2022, poster: "https://i0.wp.com/whatsonsidsmind.com/wp-content/uploads/2024/08/38c27-kantara-poster-1-1.jpeg?fit=900%2C900&ssl=1", type: "movie" },
    { id: 7, title: "Jawan", year: 2023, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3giEteXGggow1hYtpRIuy3bDLO_Z9aoximYp_tuFK0Bb0N_fnmPaChKv1l_mgBxiiOwN3&s=10", type: "movie" },
    { id: 8, title: "3 Idiots", year: 2009, poster: "https://th.bing.com/th/id/OIP.ykoSilpU1bXjXOumImNsgwHaKq?w=123&h=180&c=7&r=0&o=7&pid=1.7&rm=3", type: "movie" },
    { id: 9, title: "Pulimurugan", year: 2016, poster: "https://th.bing.com/th/id/OIP.DcxEWojHGPIFzf86eHzJigHaLJ?w=115&h=180&c=7&r=0&o=7&pid=1.7&rm=3", type: "movie" },
    { id: 10, title: "12th Fail", year: 2023, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5DkHD2DdxZsC6JwO2bWHD087VaJiANsYHDU7nr_JjRYwQzby5CdS6HkQqDHjmDw-U0r-4_g&s=10", type: "movie" },
    { id: 11, title: "The Shawshank Redemption", year: 1994, poster: "https://image.tmdb.org/t/p/w200/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", type: "movie" },
    { id: 12, title: "The Godfather", year: 1972, poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", type: "movie" },
  ];

  // Filter by search
  const filteredMovies = moviesData.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = [
    { title: "All Movies", items: filteredMovies },
  ];

  const rowRefs = useRef({});

  const scrollRow = (rowKey, dir) => {
    const el = rowRefs.current[rowKey];
    if (!el) return;
    el.scrollBy({ left: dir * 500, behavior: "smooth" });
  };

  return (
    <div className="bg-dark text-light min-vh-100" style={{ paddingTop: "80px" }}>
      <div className="container py-5">
        <h1 className="mb-5">Movies</h1>
        
        {rows.map((row) => (
          <div key={row.title} className="mb-5">
            <h4 className="mb-4">{row.title} ({filteredMovies.length})</h4>

            <div className="row-strip">
              <button
                className="row-arrow-overlay left"
                type="button"
                onClick={() => scrollRow(row.title, -1)}
              >
                ‹
              </button>

              <div
                className="d-flex flex-row flex-nowrap overflow-auto hide-scrollbar pb-3 row-scroll"
                ref={(el) => (rowRefs.current[row.title] = el)}
              >
                {row.items.map((movie) => (
                  <div key={movie.id} className="me-4" style={{ minWidth: "160px" }}>
                    <div
                      className="movie-card rounded-3 mb-2 position-relative overflow-hidden"
                      style={{
                        width: "150px",
                        height: "225px",
                        backgroundImage: `url(${movie.poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="position-absolute top-50 start-50 translate-middle bg-danger bg-opacity-75 rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px", opacity: 0, transition: "opacity 0.3s" }}
                      >
                        <span style={{ color: "white", fontSize: "20px" }}>▶</span>
                      </div>
                    </div>
                    
                    <div className="text-start">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <small className="fw-semibold text-light" style={{ 
                          maxWidth: "110px", 
                          display: "-webkit-box", 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: "vertical", 
                          overflow: "hidden" 
                        }}>
                          {movie.title}
                        </small>
                        <small className="text-muted ms-1">{movie.year}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="row-arrow-overlay right"
                type="button"
                onClick={() => scrollRow(row.title, 1)}
              >
                ›
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
