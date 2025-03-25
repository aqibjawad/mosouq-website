import React, { useState, useEffect } from "react";
import { Row, Col, Spinner, Badge, Collapse, Card } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GET } from "../../apicontrollers/apiController";
import { useParams, Link } from "react-router-dom";

import "./styles.css"; // Create this file for the CSS

const TravelInsurancePage = () => {
  const [sortBy, setSortBy] = useState("Most relevant");
  const [activeFilter, setActiveFilter] = useState("Any");
  const [location, setLocation] = useState("All Locations");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 10;
  // State to track which listing's reviews are open
  const [openReviews, setOpenReviews] = useState({});

  // State for available locations
  const [availableLocations, setAvailableLocations] = useState([]);
  // State for filtered businesses
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  // Track visible page buttons (for dynamic pagination)
  const [visiblePageButtons, setVisiblePageButtons] = useState([1]);

  const id = localStorage.getItem("selectedCategoryId");

  const [businesses, setBusinesses] = useState([]);
  const [displayedBusinesses, setDisplayedBusinesses] = useState([]);
  const [dataSource, setDataSource] = useState("category");
  const [isLoading, setIsLoading] = useState(true);

  // Dummy reviews data for each business
  const dummyReviews = [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      content: "Excellent service and coverage. Highly recommend!",
      date: "March 10, 2025",
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      content:
        "Good policies with reasonable prices. Customer service could be better.",
      date: "March 5, 2025",
    },
    {
      id: 3,
      author: "Robert J.",
      rating: 5,
      content: "Fast claim process and very helpful staff.",
      date: "February 28, 2025",
    },
    {
      id: 4,
      author: "Emily W.",
      rating: 3,
      content: "Average service. Had some issues with my claim initially.",
      date: "February 20, 2025",
    },
    {
      id: 5,
      author: "Michael T.",
      rating: 5,
      content: "Best insurance provider I've ever used. Great rates!",
      date: "February 15, 2025",
    },
    {
      id: 6,
      author: "Amanda P.",
      rating: 4,
      content: "Responsive team and good coverage options.",
      date: "February 10, 2025",
    },
    {
      id: 7,
      author: "David K.",
      rating: 5,
      content: "Very transparent policies with no hidden fees.",
      date: "February 5, 2025",
    },
    {
      id: 8,
      author: "Jessica R.",
      rating: 4,
      content: "Smooth application process and decent rates.",
      date: "January 28, 2025",
    },
    {
      id: 9,
      author: "Thomas B.",
      rating: 5,
      content: "Their mobile app makes managing my policy super easy.",
      date: "January 20, 2025",
    },
    {
      id: 10,
      author: "Lisa M.",
      rating: 4,
      content: "Great value for the coverage provided.",
      date: "January 15, 2025",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    GET(`business-profile/category-business?category=${id}`)
      .then((result) => {
        if (result && result.length > 0) {
          setBusinesses(result);
          setFilteredBusinesses(result);
          setDataSource("category");

          // Extract unique areas from businesses
          const areas = ["All Locations"];
          result.forEach((business) => {
            if (business.area && !areas.includes(business.area)) {
              areas.push(business.area);
            }
          });
          setAvailableLocations(areas);

          // Calculate total pages based on filtered businesses
          const pages = Math.ceil(result.length / ITEMS_PER_PAGE);
          setTotalPages(pages);

          // Initialize visible page buttons with just page 1
          setVisiblePageButtons([1]);
        }
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Apply rating filter to businesses
  const applyRatingFilter = (businesses) => {
    if (activeFilter === "Any") return businesses;

    const minRating = parseInt(activeFilter.replace("+", ""));
    return businesses.filter((business) => {
      // Assuming each business has a rating property
      // If not, you may need to adjust this logic based on your data structure
      const rating = business.rating || 5; // Default to 5 if no rating
      return rating >= minRating;
    });
  };

  // Apply sorting to businesses
  const applySorting = (businesses) => {
    switch (sortBy) {
      case "Highest rated":
        return [...businesses].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
      case "Most reviewed":
        return [...businesses].sort(
          (a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)
        );
      case "Most relevant":
      default:
        // Add your relevance sorting logic here
        return businesses;
    }
  };

  // Filter businesses when location or filter changes
  useEffect(() => {
    if (businesses.length > 0) {
      let filtered = [...businesses];

      // Apply location filter
      if (location !== "All Locations") {
        filtered = filtered.filter((business) => business.area === location);
      }

      // Apply rating filter
      filtered = applyRatingFilter(filtered);

      // Apply sorting
      filtered = applySorting(filtered);

      setFilteredBusinesses(filtered);
      // Reset to first page when filter changes
      setPage(1);

      // Reset visible page buttons to just page 1
      setVisiblePageButtons([1]);
    }
  }, [location, activeFilter, sortBy, businesses]);

  // Update displayed businesses when page changes or when filtered businesses change
  useEffect(() => {
    if (filteredBusinesses.length > 0) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setDisplayedBusinesses(filteredBusinesses.slice(startIndex, endIndex));

      // Update total pages based on filtered businesses
      const pages = Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE);
      setTotalPages(pages);
    } else {
      setDisplayedBusinesses([]);
      setTotalPages(0);
    }
  }, [page, filteredBusinesses]);

  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

  const handleBusinessClick = (business) => {
    localStorage.setItem("selectedBusinessId", business.businessId);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // If the new page isn't in our visible buttons, add it
      if (!visiblePageButtons.includes(newPage)) {
        // Keep existing buttons and add the new page
        const updatedButtons = [...visiblePageButtons, newPage].sort(
          (a, b) => a - b
        );
        setVisiblePageButtons(updatedButtons);
      }
    }
  };

  // Handle next button click to add the next page to visible buttons
  const handleNextClick = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Add the next page to visible buttons if it's not already there
      if (!visiblePageButtons.includes(nextPage)) {
        const updatedButtons = [...visiblePageButtons, nextPage].sort(
          (a, b) => a - b
        );
        setVisiblePageButtons(updatedButtons);
      }
    }
  };

  // Toggle reviews for a specific listing
  const toggleReviews = (listingId, event) => {
    // Stop the event from propagating to the parent Link element
    event.preventDefault();
    event.stopPropagation();

    setOpenReviews((prev) => ({
      ...prev,
      [listingId]: !prev[listingId],
    }));
  };

  // Generate pagination buttons with dynamic growth
  const generatePaginationButtons = () => {
    if (totalPages <= 1) return null; // No pagination if only one page

    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
        className="page-btn prev-btn"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
    );

    // Visible page number buttons
    visiblePageButtons.forEach((pageNum) => {
      buttons.push(
        <button
          key={pageNum}
          className={`page-btn number-btn ${
            page === pageNum ? "active-page" : ""
          }`}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </button>
      );
    });

    // Next button
    buttons.push(
      <button
        key="next"
        className="page-btn next-btn"
        onClick={handleNextClick}
        disabled={page === totalPages}
      >
      </button>
    );

    return buttons;
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="star">
            {i < rating ? <AiFillStar color="#FFD700" /> : <AiOutlineStar />}
          </span>
        ))}
      </div>
    );
  };

  // Loader component
  const LoaderComponent = () => (
    <div
      className="text-center"
      style={{ marginTop: "7rem", marginBottom: "7rem" }}
    >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <img
          src="/mosouq-logo.png"
          alt="Company Logo"
          className="mb-4"
          style={{ maxWidth: "200px", maxHeight: "100px" }}
        />
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="container" style={{ marginTop: "7rem" }}>
      <div className="main-content">
        {/* Left sidebar */}
        <div className="sidebar">
          {/* Sidebar content remains the same */}
          <div className="filter-section">
            <h3 className="section-title">Rating</h3>
            <div className="rating-buttons">
              {["Any", "3+", "4+", "5"].map((rating) => (
                <button
                  key={rating}
                  className={`filter-btn ${
                    activeFilter === rating ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="section-title">Location</h3>
            <div className="location-select">
              <select
                className="select-dropdown"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {availableLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main listings */}
        <div className="listings-container">
          <div className="listings-header">
            <div className="results-count">
              {filteredBusinesses.length === 0
                ? "No results found"
                : `${Math.min(
                    (page - 1) * ITEMS_PER_PAGE + 1,
                    filteredBusinesses.length
                  )}-${Math.min(
                    page * ITEMS_PER_PAGE,
                    filteredBusinesses.length
                  )} of ${filteredBusinesses.length} results`}
            </div>
            <div className="sort-container">
              <span className="sort-label">Sort by</span>
              <div className="sort-select">
                <select
                  className="select-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Most relevant</option>
                  <option>Highest rated</option>
                  <option>Most reviewed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="info-banner">
            <div className="info-text">
              <span className="info-question">
                What does sorting by relevance mean?
              </span>
              <a href="#" className="info-link">
                Read more
              </a>
            </div>
          </div>

          <div className="listings-list">
            {displayedBusinesses.length > 0 ? (
              displayedBusinesses.map((listing, index) => (
                <Link
                  to={`/business/${listing?.category?.name?.replace(
                    /\s+/g,
                    "-"
                  )}/${listing?.authDetails?.company?.replace(/\s+/g, "-")}`}
                  key={index}
                  onClick={() => handleBusinessClick(listing)}
                  style={{ textDecoration: "none" }}
                >
                  <div key={listing.id || index} className="listing-card">
                    {listing.mostRelevant && (
                      <div className="relevance-badge">MOST RELEVANT</div>
                    )}

                    <div className="listing-content">
                      <div className="listing-logo">
                        <img
                          src={listing.logo || "/default-logo.png"}
                          alt={listing?.authDetails?.company || "Company"}
                          onError={(e) => {
                            e.target.src = "/default-logo.png";
                            e.target.onerror = null;
                          }}
                        />
                      </div>

                      <div className="listing-details">
                        <div className="listing-title">
                          <h3 className="company-name">
                            {listing?.authDetails?.company ||
                              listing?.businessName ||
                              "Business Name"}
                          </h3>
                          <a
                            href={`https://${
                              listing.website ||
                              listing?.authDetails?.website ||
                              "#"
                            }`}
                            className="company-url"
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {listing.website ||
                              listing?.authDetails?.website ||
                              "N/A"}
                          </a>
                        </div>

                        <div className="listing-rating">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="star">
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="trust-score">MosouqScore</span>
                          <span className="divider">•</span>
                          <span className="review-count">reviews</span>
                        </div>

                        <div className="listing-location">
                          {listing.area
                            ? `${listing.area}, ${listing.city || "N/A"}`
                            : listing.address || "N/A"}
                        </div>

                        <div className="listing-categories">
                          {listing.tags && listing.tags.length > 0 ? (
                            listing.tags.map((tag, idx) => (
                              <span key={idx} className="category-tag">
                                {tag || "No Tags Available"}
                              </span>
                            ))
                          ) : (
                            <span className="category-tag">
                              No Tags Available
                            </span>
                          )}
                        </div>

                        <div className="listing-action">
                          <button
                            className="reviews-btn"
                            onClick={(e) =>
                              toggleReviews(listing.id || index, e)
                            }
                          >
                            Latest reviews
                            <span className="dropdown-icon">
                              {openReviews[listing.id || index] ? "▲" : "▼"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible reviews section */}
                    <Collapse in={openReviews[listing.id || index]}>
                      <div className="reviews-container">
                        <div className="reviews-header">
                          <h4>Latest Reviews</h4>
                        </div>
                        <div className="reviews-scroll-container">
                          <Row className="flex-wrap mx-0">
                            {dummyReviews.slice(0, 4).map(
                              (
                                review // Showing only 4 reviews
                              ) => (
                                <Col
                                  key={review.id}
                                  xs={12}
                                  md={6}
                                  style={{ padding: "5px" }}
                                >
                                  <Card className="review-card mb-3">
                                    <Card.Body className="p-3">
                                      {" "}
                                      {/* Smaller padding */}
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="mb-0 fs-6">
                                          {review.author}
                                        </h5>{" "}
                                        {/* Smaller font */}
                                        <small className="text-muted">
                                          {review.date}
                                        </small>
                                      </div>
                                      <div className="mb-2">
                                        {renderStars(review.rating)}
                                      </div>
                                      <Card.Text className="small">
                                        {review.content}
                                      </Card.Text>{" "}
                                      {/* Smaller text */}
                                    </Card.Body>
                                  </Card>
                                </Col>
                              )
                            )}
                          </Row>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-results">
                <h3>No businesses found in {location}</h3>
                <p>
                  Try selecting a different location or removing some filters.
                </p>
              </div>
            )}
          </div>

          {/* Now always show pagination if there are multiple pages */}
          {totalPages > 1 && (
            <div className="pagination">
              <div
                className="pagination-buttons"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {generatePaginationButtons()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelInsurancePage;
