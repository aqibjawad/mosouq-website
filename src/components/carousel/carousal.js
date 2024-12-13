import { useState } from "react";
import { Carousel as BootstrapCarousel, Image } from "react-bootstrap";
import "./carousel.css";

function CarouselComponent({ businessData }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <BootstrapCarousel activeIndex={index} onSelect={handleSelect}>
      {businessData && businessData.images && businessData.images.length > 0 ? (
        businessData.images.map((image, idx) => (
          <BootstrapCarousel.Item key={idx}>
            <Image src={image} alt={`Slide ${idx + 1}`} className="w-100" />
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
