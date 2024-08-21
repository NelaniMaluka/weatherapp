package com.WeatherApp.Backend.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

@Entity
@Table(name="user")
public class UserAccount {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer userId;
	
	public String fullName;
	
	@Valid
	@Email(message = "Please provide a valid email")
	public String email;
	
	@Valid
	@Size(min = 8, max = 50, message = "Password must be at least 8 characters long")
	public String password;

	public String primaryLocation;
	
	public String secondaryLocation;

	public UserAccount(Integer userId, String fullName,
			@Valid @Email(message = "Please provide a valid email") String email,
			@Valid @Size(min = 8, max = 50, message = "Password must be at least 8 characters long") String password,
			String primaryLocation, String secondaryLocation) {
		super();
		this.userId = userId;
		this.fullName = fullName;
		email = email;
		this.password = password;
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
		return email;
	}

	public void setEmail(String email) {
		email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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
