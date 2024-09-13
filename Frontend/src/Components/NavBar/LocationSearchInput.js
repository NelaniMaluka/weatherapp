import React, { useState, useCallback } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Alerts/ErrorAlert";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";

function LocationSearchInput({ onLocationSelect, initialLocation }) {
  const [location, setLocation] = useState(initialLocation);
  const [isValidLocation, setIsValidLocation] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
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
      const results = await geocodeByAddress(value);
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
          onLocationSelect(formattedLocation);
          navigate("/");
        } else {
          setIsValidLocation(false);
        }
      } else {
        setIsValidLocation(false);
        ErrorAlert("Invalid location");
      }
    } catch (error) {
      setIsValidLocation(false);
      ErrorAlert("Internal Server Error");
    }
  };

  const handleUseCurrentLocation = useCallback(() => {
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
          ErrorAlert("Couldn't resolve current location");
          setIsValidLocation(false);
        }
      },
      (error) => {
        ErrorAlert("Couldn't resolve current location");
        setIsValidLocation(false);
      }
    );
  }, [onLocationSelect, navigate]);

  const handleSearchClick = () => {
    // Trigger search based on the current input value
    handleSelect(location);
  };

  const searchOptions = {
    types: ["(cities)"],
  };

  return (
    <div>
      <PlacesAutocomplete
        value={location}
        onChange={(value) => {
          setLocation(value);
          setIsTyping(value.length > 0); // Show suggestions when typing
        }}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="input-container">
            <div className="input-with-icon">
              <SearchIcon className="search-icon" onClick={handleSearchClick} />
              <input
                {...getInputProps({
                  placeholder: "Search City, Country",
                  className: "messageField",
                })}
              />
            </div>
            {isTyping && ( // Only show the dropdown when typing
              <div className="autocomplete-dropdown-container">
                {suggestions.length > 0 && (
                  <div
                    onClick={handleUseCurrentLocation}
                    className="suggestion-item current-location"
                  >
                    <MyLocationIcon />
                    <span>Use Current Location</span>
                  </div>
                )}
                {loading && <div className="loading">Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className: suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item",
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default LocationSearchInput;
