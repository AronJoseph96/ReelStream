import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function TVSeries() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  // TV Series only
  const tvSeriesData = [
    { id: 101, title: "Game of Thrones", year: 2011, poster: "https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", type: "series" },
    { id: 102, title: "Breaking Bad", year: 2008, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOcWkpWG_NRrU2M8-WB8EbEcJk7smhdrY1eO0ttKXm0bo2ooOEWxk3zBSbsFrSgSJh2OEKOQ&s=10", type: "series" },
    { id: 103, title: "Stranger Things", year: 2016, poster: "https://resizing.flixster.com/-3HM6Vvl24jDCKtAkqOoGCVAwRI=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vZGM3MTljMzQtMjk5Yy00NjE0LTg4M2EtMjEwOTE1NjIyOTIxLmpwZw==", type: "series" },
    { id: 104, title: "The Mandalorian", year: 2019, poster: "https://m.media-amazon.com/images/M/MV5BNjgxZGM0OWUtZGY1MS00MWRmLTk2N2ItYjQyZTI1OThlZDliXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", type: "series" },
    { id: 105, title: "The Boys", year: 2019, poster: "https://m.media-amazon.com/images/M/MV5BMGRlZDE2ZGEtZTU5Mi00ODdkLWFmMTEtY2UwMmViNWNmZjczXkEyXkFqcGc@._V1_.jpg", type: "series" },
    { id: 106, title: "The Witcher", year: 2019, poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p17580215_b_v13_ab.jpg", type: "series" },
    { id: 107, title: "Squid Game", year: 2021, poster: "https://etimg.etb2bimg.com/photo/87149411.cms", type: "series" },
    { id: 108, title: "House of the Dragon", year: 2022, poster: "https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", type: "series" },
    { id: 109, title: "The Last of Us", year: 2023, poster: "https://m.media-amazon.com/images/M/MV5BYWI3ODJlMzktY2U5NC00ZjdlLWE1MGItNWQxZDk3NWNjN2RhXkEyXkFqcGc@._V1_.jpg", type: "series" },
    { id: 110, title: "Arcane", year: 2021, poster: "https://m.media-amazon.com/images/M/MV5BYjA2NzhlMDItNWRmZC00MzRjLWE3ZjAtZjBlZDAwOWY2ODdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", type: "series" },
    { id: 111, title: "Wednesday", year: 2022, poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDHsfLAMuUX0Cl58x5WWUzcAsUvTgaiwO0w&s", type: "series" },
    { id: 112, title: "The Crown", year: 2016, poster: "https://m.media-amazon.com/images/M/MV5BODcyODZlZDMtZGE0Ni00NjBhLWJlYTAtZDdlNWY3MzkwMGVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", type: "series" },
  ];

  // Filter by search
  const filteredSeries = tvSeriesData.filter(series =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = [
    { title: "All TV Series", items: filteredSeries },
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
        <h1 className="mb-5">TV Series</h1>
        
        {rows.map((row) => (
          <div key={row.title} className="mb-5">
            <h4 className="mb-4">{row.title} ({filteredSeries.length})</h4>

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
                {row.items.map((series) => (
                  <div key={series.id} className="me-4" style={{ minWidth: "160px" }}>
                    <div
                      className="movie-card rounded-3 mb-2 position-relative overflow-hidden"
                      style={{
                        width: "150px",
                        height: "225px",
                        backgroundImage: `url(${series.poster})`,
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
                          {series.title}
                        </small>
                        <small className="text-muted ms-1">{series.year}</small>
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

export default TVSeries;
