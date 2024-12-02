import { useState } from "react";
import {
  Carousel as BootstrapCarousel,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { IoStar } from "react-icons/io5";
import "./carousel.css";

function CarouselComponent({ businessData, businessReviewsData }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Calculate average rating
  const averageRating =
    businessReviewsData.length > 0
      ? businessReviewsData.reduce((sum, review) => sum + review.rating, 0) /
        businessReviewsData.length
      : 0;

  return (
    <BootstrapCarousel activeIndex={index} onSelect={handleSelect}>
      {businessData && businessData.images && businessData.images.length > 0 ? (
        businessData.images.map((image, idx) => (
          <BootstrapCarousel.Item key={idx}>
            <Image src={image} alt={`Slide ${idx + 1}`} className="w-100" />
            <BootstrapCarousel.Caption>
              <Container fluid className="">
                <Row className="carousel_card mx-auto">
                  <Col lg={11} className="mx-auto">
                    <h1 className="m-0">
                      {businessData.businessName}
                    </h1>
                    <h6 className="">Where stay is Unique</h6>
                    <div className="pt-2 pb-sm-5 pb-4 rating">
                      <span>{businessReviewsData.length || 0} reviews</span>
                      {[...Array(5)].map((_, i) => (
                        <IoStar
                          key={i}
                          size={20}
                          color={
                            i < Math.round(averageRating)
                              ? "#FFB800"
                              : "#D3D3D3"
                          }
                        />
                      ))}
                    </div>
                    {/* <div className="d-sm-flex pt-sm-4 pt-0 justify-content-between">
                      <div>
                        <h5>American, Breakfast & brunch, Seafood</h5>
                        <h5>
                          <span className="" style={{ color: "#04C585" }}>
                            Open
                          </span>
                          <h4 className="mt-2">
                            <span style={{ color: "black" }}>
                              {businessData.fromTime} A.M to
                            </span>
                            <span style={{ color: "#F10000" }}>
                              {businessData.toTime} P.M
                            </span>
                          </h4>
                        </h5>
                      </div>
                    </div> */}
                  </Col>
                </Row>
              </Container>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))
      ) : (
        <BootstrapCarousel.Item>
          <Image src="/slide1.png" alt="Default Slide" className="w-100" />
          {/* Add the same caption content as above here */}
        </BootstrapCarousel.Item>
      )}
    </BootstrapCarousel>
  );
}

export default CarouselComponent;
