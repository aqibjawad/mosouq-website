import React from "react";
import "./index.css"; // Assuming your CSS file for styling

const BusinessImages = () => {
    // Sample image URLs (replace with your actual image URLs)
    const imageUrls = [
        "https://media.istockphoto.com/id/1394218734/photo/digital-painting-of-panoramic-views-of-llyn-y-dywarchen-and-snowdon-in-the-snowdonia-national.jpg?s=2048x2048&w=is&k=20&c=wE-RSli7EeaBMUyqsWT_JM_LLN5Wm9M3twnZ3wY4PaI=",
        "https://plus.unsplash.com/premium_photo-1667870034632-134c46ef9a47?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1635410649715-5403e6e89d48?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // Add more image URLs as needed
    ];

    return (
        <div className="business-images">
            <div className="image-container">
                {imageUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="zoom-hover"
                    />
                ))}
            </div>
        </div>
    );
};

export default BusinessImages;
