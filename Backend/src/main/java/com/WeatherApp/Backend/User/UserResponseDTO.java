package com.WeatherApp.Backend.User;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

public class UserResponseDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer userId;
	
	public String fullName;
	
	@Valid
	@Email(message = "Please provide a valid email")
	public String Email;

	public String primaryLocation;
	
	public String secondaryLocation;

	public UserResponseDTO(Integer userId, String fullName,
			@Valid @Email(message = "Please provide a valid email") String email,
			String primaryLocation, String secondaryLocation) {
		super();
		this.userId = userId;
		this.fullName = fullName;
		Email = email;
		this.primaryLocation = primaryLocation;
		this.secondaryLocation = secondaryLocation;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getPrimaryLocation() {
		return primaryLocation;
	}

	public void setPrimaryLocation(String primaryLocation) {
		this.primaryLocation = primaryLocation;
	}

	public String getSecondaryLocation() {
		return secondaryLocation;
	}

	public void setSecondaryLocation(String secondaryLocation) {
		this.secondaryLocation = secondaryLocation;
	}
	
	
}
