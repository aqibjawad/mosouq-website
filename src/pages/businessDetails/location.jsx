import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationSection = ({ businesses }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "8px",
  };

  const defaultCenter = {
    lat: parseFloat(businesses.lat),
    lng: parseFloat(businesses.lang),
  };

  const [mapError, setMapError] = React.useState(false);

  return (
    <div>
      <p className="text-gray-800 mb-2">{businesses.address}</p>

      <div className="relative w-full h-[400px] bg-gray-100 rounded-lg">
        {!mapError ? (
          <LoadScript
            googleMapsApiKey="AIzaSyBBHNqsXFQqg_-f6BkI5UH7X7nXK2KQzk8"
            onError={() => setMapError(true)}
          >
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={15}
              center={defaultCenter}
              onLoad={() => setMapError(false)}
            >
              <Marker position={defaultCenter} title={businesses.businessName} />
            </GoogleMap>
          </LoadScript>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl text-gray-800 font-medium mb-2">
              Sorry! Something went wrong.
            </h3>
            <p className="text-gray-600 text-center">
              This page didn't load Google Maps correctly. See the JavaScript
              console for technical details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSection;
