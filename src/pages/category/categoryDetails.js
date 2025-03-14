import React, { useState, useEffect } from "react";
import { Row, Col, Spinner, Badge, Collapse, Card } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GET } from "../../apicontrollers/apiController";
import { useParams, Link } from "react-router-dom";

import "./styles.css"; // Create this file for the CSS

const TravelInsurancePage = () => {
  const [sortBy, setSortBy] = useState("Most relevant");
  const [activeFilter, setActiveFilter] = useState("Any");
  const [location, setLocation] = useState("United States");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 10;
  // State to track which listing's reviews are open
  const [openReviews, setOpenReviews] = useState({});

  const relatedCategories = [
    { name: "Accident Insurance Company", count: 91 },
    { name: "Auto Insurance Agency", count: 1674 },
    { name: "Business Insurance Company", count: 810 },
    { name: "Casualty and Multirisque Insurance Company", count: 16 },
    { name: "Commercial Insurance Company", count: 153 },
    { name: "Cycle Insurance Company", count: 14 },
    { name: "Dental Insurance Agency", count: 44 },
    { name: "Disability Insurance Company", count: 41 },
    { name: "Funeral Insurance Company", count: 30 },
    { name: "Gadget Insurance Company", count: 25 },
  ];
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
          setDataSource("category");

          // Calculate total pages
          const pages = Math.ceil(result.length / ITEMS_PER_PAGE);
          setTotalPages(pages);
        }
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Update displayed businesses when page changes or when businesses data changes
  useEffect(() => {
    if (businesses.length > 0) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setDisplayedBusinesses(businesses.slice(startIndex, endIndex));
    }
  }, [page, businesses]);

  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

  const handleBusinessClick = (business) => {
    localStorage.setItem("selectedBusinessId", business.businessId);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Toggle reviews for a specific listing
  const toggleReviews = (listingId) => {
    setOpenReviews((prev) => ({
      ...prev,
      [listingId]: !prev[listingId],
    }));
  };

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    if (totalPages <= 1) return null; // No pagination if only one page

    const buttons = [];
    const maxVisibleButtons = 4;

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

    // Page number buttons
    if (totalPages <= maxVisibleButtons) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`page-btn number-btn ${page === i ? "active-page" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show limited pages with ellipsis
      let startPage = Math.max(1, page - 1);
      let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

      // Adjust start if we're at the end
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={`page-btn number-btn ${page === i ? "active-page" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Next button
    buttons.push(
      <button
        key="next"
        className="page-btn next-btn"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
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
                <option value="United States">United States</option>
              </select>
            </div>
            <div className="location-input">
              <input
                type="text"
                placeholder="City or ZIP code"
                className="input-field"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center justify-between w-full mb-4">
              <Row>
                <Col xs={8}>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Related categories
                  </h3>
                </Col>
                <Col xs={4}>
                  <Link className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">
                    Show all
                  </Link>
                </Col>
              </Row>
            </div>

            <ul className="space-y-2">
              <Row>
                {relatedCategories.map((category, index) => (
                  <Col xs={12} key={index}>
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <a href="#" className="text-dark text-decoration-none">
                        {category.name}
                      </a>
                      <Badge bg="light" text="dark" pill className="px-2 py-1">
                        {category.count}
                      </Badge>
                    </div>
                  </Col>
                ))}
              </Row>
            </ul>
          </div>
        </div>

        {/* Main listings */}
        <div className="listings-container">
          <div className="listings-header">
            <div className="results-count">
              {businesses.length === 0
                ? "No results found"
                : `${Math.min(
                    (page - 1) * ITEMS_PER_PAGE + 1,
                    businesses.length
                  )}-${Math.min(page * ITEMS_PER_PAGE, businesses.length)} of ${
                    businesses.length
                  } results`}
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
            {displayedBusinesses.map((listing) => (
              <div key={listing.id} className="listing-card">
                {listing.mostRelevant && (
                  <div className="relevance-badge">MOST RELEVANT</div>
                )}

                <div className="listing-content">
                  <div className="listing-logo">
                    <img
                      src={listing.logo}
                      alt={listing?.authDetails?.company}
                    />
                  </div>

                  <div className="listing-details">
                    <div className="listing-title">
                      <h3 className="company-name">
                        {listing?.authDetails?.company}
                      </h3>
                      <a
                        href={`https://${
                          listing.website || listing?.authDetails?.website
                        }`}
                        className="company-url"
                      >
                        {listing.website || listing?.authDetails?.website}
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

                    <div className="listing-location">{listing.address}</div>

                    <div className="listing-categories">
                      {listing.tags.map((tags, idx) => (
                        <span key={idx} className="category-tag">
                          {tags || "No Tags Available"}
                        </span>
                      ))}
                    </div>

                    <div className="listing-action">
                      <button
                        className="reviews-btn"
                        onClick={() => toggleReviews(listing.id)}
                      >
                        Latest reviews
                        <span className="dropdown-icon">
                          {openReviews[listing.id] ? "▲" : "▼"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible reviews section */}
                <Collapse in={openReviews[listing.id]}>
                  <div className="reviews-container">
                    <div className="reviews-header">
                      <h4>Latest Reviews</h4>
                    </div>
                    <div className="reviews-scroll-container">
                      <Row
                        className="flex-nowrap"
                        style={{ overflowX: "auto", padding: "10px 0" }}
                      >
                        {dummyReviews.map((review) => (
                          <Col
                            key={review.id}
                            xs={12}
                            md={6}
                            lg={4}
                            xl={3}
                            style={{ minWidth: "280px", padding: "0 10px" }}
                          >
                            <Card className="review-card mb-3">
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h5 className="mb-0">{review.author}</h5>
                                  <small className="text-muted">
                                    {review.date}
                                  </small>
                                </div>
                                <div className="mb-2">
                                  {renderStars(review.rating)}
                                </div>
                                <Card.Text>{review.content}</Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </Collapse>
              </div>
            ))}
          </div>

          {/* Conditional Pagination - only show if businesses > 10 */}
          {businesses.length > ITEMS_PER_PAGE && (
            <div className="pagination">
              <div className="pagination-buttons">
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
