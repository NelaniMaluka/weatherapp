import React, { useState, useCallback } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Alerts/ErrorAlert";

function LocationSearchInput({ onLocationSelect, initialLocation }) {
  const [location, setLocation] = useState(initialLocation);
  const [isValidLocation, setIsValidLocation] = useState(true);
  const navigate = useNavigate();

  const extractCityAndCountry = (addressComponents) => {
    let city = "";
    let country = "";

    addressComponents.forEach((component) => {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("country")) {
        country = component.long_name;
      }
    });

    return `${city}, ${country}`;
  };

  const handleSelect = async (value) => {
    try {
      console.log("Selected value:", value);

      const results = await geocodeByAddress(value);
      console.log("Geocode results:", results);

      if (results.length > 0) {
        const addressComponents = results[0].address_components;
        const isCityOrCountry = addressComponents.some(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("country")
        );

        if (isCityOrCountry) {
          const formattedLocation = results[0].formatted_address;
          setLocation(formattedLocation);
          setIsValidLocation(true);

          const { lat, lng } = await getLatLng(results[0]);
          console.log("Latitude and Longitude:", lat, lng);

          onLocationSelect(formattedLocation);
          navigate("/");
        } else {
          setIsValidLocation(false);
          console.error("Location is neither city nor country.");
        }
      } else {
        setIsValidLocation(false);
        ErrorAlert("Invalid location");
      }
    } catch (error) {
      console.error("Error in handleSelect:", error);
      setIsValidLocation(false);
      ErrorAlert("Internal Server Error");
    }
  };

  const handleUseCurrentLocation = useCallback(() => {
    console.log("Using current location...");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const results = await geocodeByAddress(`${lat},${lng}`);
          const addressComponents = results[0].address_components;
          const formattedLocation = extractCityAndCountry(addressComponents);

          setLocation(formattedLocation);
          setIsValidLocation(true);
          onLocationSelect(formattedLocation);
          navigate("/");
        } catch (error) {
          ErrorAlert("Clouldnt resolve current location");
          setIsValidLocation(false);
        }
      },
      (error) => {
        ErrorAlert("Clouldnt resolve current location");
        setIsValidLocation(false);
      }
    );
  }, [onLocationSelect, navigate]);

  const searchOptions = {
    types: ["(cities)"], // restrict to cities
  };

  return (
    <div>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search City, Country",
                className: "messageField",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div style={{ color: "white" }}>Loading...</div>}

              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                      padding: "3px",
                    };
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* "Use current location" as part of the suggestions */}
      <div
        onClick={handleUseCurrentLocation}
        className="suggestion-item"
        style={{ cursor: "pointer", padding: "10px" }}
      >
        <span>Use Current Location</span>
      </div>
      {!isValidLocation && (
        <div style={{ color: "red" }}>
          Invalid Location. Please enter a valid Location.
        </div>
      )}
    </div>
  );
}

export default LocationSearchInput;
