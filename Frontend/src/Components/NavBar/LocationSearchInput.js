import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./Navbar.css";

function LocationSearchInput({ onLocationSelect, initialLocation }) {
  const [location, setLocation] = useState(initialLocation);
  const [isValidLocation, setIsValidLocation] = useState(true);

  const handleSelect = async (value) => {
    try {
      const result = await geocodeByAddress(value);

      if (result.length > 0) {
        const addressComponents = result[0].address_components;
        const isCityOrCountry = addressComponents.some(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("country")
        );

        if (isCityOrCountry) {
          const formattedLocation = result[0].formatted_address;
          setLocation(formattedLocation);
          setIsValidLocation(true);

          const { lat, lng } = await getLatLng(result[0]);
          console.log("Latitude and Longitude:", lat, lng);

          onLocationSelect(formattedLocation);
        } else {
          setIsValidLocation(false);
        }
      } else {
        setIsValidLocation(false);
      }
    } catch (error) {
      console.error("Error validating location:", error);
      setIsValidLocation(false);
    }
  };

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
                placeholder: "e.g City, Country",
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
                  ? {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
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
      {!isValidLocation && (
        <div style={{ color: "red" }}>
          Invalid Location. Please enter a valid Location.
        </div>
      )}
    </div>
  );
}

export default LocationSearchInput;
