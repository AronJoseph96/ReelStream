import React, { useRef } from "react";

function Home() {
  const featured = {
    title: "Welcome to ReelStream",
    subtitle: "Stream movies and TV series anytime, anywhere.",
    description: "Discover trending titles, classics, and hidden gems in one place.",
  };

  // Real movie data with poster URLs
  const moviesData = {
    trending: [
      { id: 1, title: "Avengers: Endgame", year: 2019, poster: "https://m.media-amazon.com/images/I/91G-Ha5ibRL._UF1000,1000_QL80_.jpg" },
      { id: 2, title: "Manjummel Boys", year: 2024, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEp-4WeaQWdHyKPf4HYMvvfWXLJDJRyNkZUg&s" },
      { id: 3, title: "RRR", year: 2022, poster: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/250px-RRR_Poster.jpg" },
      { id: 4, title: "Watch Wake Up Dead Man: A Knives Out Mystery", year: 2009, poster: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/202/2025/11/30203950/G691ZROWUAAxSOe.jpeg" },
      { id: 5, title: "Marty Supreme", year: 2025, poster: "https://m.media-amazon.com/images/M/MV5BZTRhYjI1MTItMWYwMi00MjY5LWI1OTktMzQwNzA3MWJlN2QyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { id: 6, title: "Oppenheimer", year: 2023, poster: "https://m.media-amazon.com/images/M/MV5BM2RmYmVmMzctMzc5Ny00MmNiLTgxMGUtYjk1ZDRhYjA2YTU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { id: 7, title: "Dune: Part Two", year: 2024, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMysalZCd7ljRGx7WFAJO15rqeGTuOCDfLZxMcFBJHqsazY3yJJrL6xFxp7MFohluCvEH9ms_fI4og1d5HCmmZDhHyY03g6Ig67X0oyA&s=10" },
      { id: 8, title: "Kantara", year: 2022, poster: "https://i0.wp.com/whatsonsidsmind.com/wp-content/uploads/2024/08/38c27-kantara-poster-1-1.jpeg?fit=900%2C900&ssl=1" },
      { id: 9, title: "Jawan", year: 2023, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3giEteXGggow1hYtpRIuy3bDLO_Z9aoximYp_tuFK0Bb0N_fnmPaChKv1l_mgBxiiOwN3&s=10" },
      { id: 10, title: "Spider-Man: No Way Home", year: 2021, poster: "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Spider-Man_No_Way_Home_%E2%80%93_The_More_Fun_Stuff_Version_poster.jpeg/250px-Spider-Man_No_Way_Home_%E2%80%93_The_More_Fun_Stuff_Version_poster.jpeg" }
    ],
    topRated: [
      { id: 11, title: "The Shawshank Redemption", year: 1994, poster: "https://image.tmdb.org/t/p/w200/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
      { id: 12, title: "The Godfather", year: 1972, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJY4UJfQF1iSBB8uI7AD-NgtDmJZBdP5Pp5kB0nN04gZKN_HdZRkVDEzmp0HHRsp-B0dmXKuaLYEbQ71z-hXJWRqv4r-EDBD9MufBpq1s&s=10" },
      { id: 13, title: "12th Fail", year: 2023, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5DkHD2DdxZsC6JwO2bWHD087VaJiANsYHDU7nr_JjRYwQzby5CdS6HkQqDHjmDw-U0r-4_g&s=10" },
      { id: 14, title: "Schindler's List", year: 1993, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDamS313reFwrSpbNAS5Vc3ThDQctKP7cuyBBTPKxxkDPKjCkaFNxjXi0VdhJSZWLcFyV_&s=10" },
      { id: 15, title: "Forrest Gump", year: 1994, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNI2SBzYW95C8Wo7zYV3bzVzem58xPnUzsZGLsnLg17mSMgR574acQZpgNK7a5XeF3THjqgQ&s=10" },
      { id: 16, title: "The Dark Knight", year: 2008, poster: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg" }
    ],
    newReleases: [
      { id: 17, title: "Weapons", year: 2025, poster: "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_QL75_UY281_CR18,0,190,281_.jpg" },
      { id: 18, title: "Wicked", year: 2024, poster: "https://upload.wikimedia.org/wikipedia/en/3/3c/Wicked_%282024_film%29_poster.png" },
      { id: 19, title: "The Conjuring: Last Rites", year: 2025, poster: "https://m.media-amazon.com/images/M/MV5BOGRhNWVhZWUtNWUzMi00ZWQ0LWI3YmUtNTk5YTNiNDRlNDEwXkEyXkFqcGc@._V1_.jpg" },
      { id: 20, title: "Eko", year: 2025, poster: "https://m.media-amazon.com/images/M/MV5BYWZmMGFmZWItYzM5Ny00N2FjLWI5OWItMzBjZTE5MTgxMmZkXkEyXkFqcGc@._V1_.jpg" },
      { id: 21, title: "Kraven The Hunter", year: 2025, poster: "https://upload.wikimedia.org/wikipedia/en/e/ec/Kraven_the_Hunter_%28film%29_poster.jpg" }
    ]
  };

  const rows = [
    { title: "Trending Now", items: moviesData.trending },
    { title: "Top Rated", items: moviesData.topRated },
    { title: "New Releases", items: moviesData.newReleases },
  ];

  // store refs for each row
  const rowRefs = useRef({});

  const scrollRow = (rowKey, dir) => {
    const el = rowRefs.current[rowKey];
    if (!el) return;

    const amount = 500;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="home-page bg-dark text-light min-vh-100">
      {/* Hero / banner */}
      <section className="hero-section text-light">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="display-4 fw-bold mb-3">{featured.title}</h1>
              <h4 className="mb-3 text-muted">{featured.subtitle}</h4>
              <p className="mb-4">{featured.description}</p>

              <button className="btn btn-danger btn-lg me-2">Start Watching</button>
              <button className="btn btn-outline-light btn-lg">Browse Library</button>
            </div>

            <div className="col-md-5 d-none d-md-block">
              <div className="hero-poster rounded-3 shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Rows of content */}
      <section className="py-4">
        <div className="container">
          {rows.map((row) => (
            <div key={row.title} className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0">{row.title}</h4>
              </div>

              <div className="row-strip">
                {/* Left overlay arrow */}
                <button
                  className="row-arrow-overlay left"
                  type="button"
                  onClick={() => scrollRow(row.title, -1)}
                  aria-label="Scroll left"
                >
                  ‹
                </button>

                {/* Scroll container */}
                <div
                  className="d-flex flex-row flex-nowrap overflow-auto hide-scrollbar pb-2 row-scroll"
                  ref={(el) => (rowRefs.current[row.title] = el)}
                >
                  {row.items.map((movie) => (
                    <div key={movie.id} className="me-3" style={{ minWidth: "160px" }}>
                      {/* Movie poster */}
                      <div
                        className="movie-card rounded-3 mb-2 position-relative overflow-hidden"
                        style={{
                          width: "150px",
                          height: "225px",
                          backgroundImage: `url(${movie.poster})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          border: "2px solid transparent",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#dc3545";
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "transparent";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        {/* Play button overlay */}
                        <div
                          className="position-absolute top-50 start-50 translate-middle"
                          style={{
                            background: "rgba(220, 53, 69, 0.8)",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          <span style={{ color: "white", fontSize: "20px" }}>▶</span>
                        </div>
                      </div>
                      
                      {/* Movie info */}
                      <div className="text-start">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <small className="fw-semibold text-light" style={{ maxWidth: "110px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {movie.title}
                          </small>
                          <small className="text-muted ms-1">{movie.year}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right overlay arrow */}
                <button
                  className="row-arrow-overlay right"
                  type="button"
                  onClick={() => scrollRow(row.title, 1)}
                  aria-label="Scroll right"
                >
                  ›
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
