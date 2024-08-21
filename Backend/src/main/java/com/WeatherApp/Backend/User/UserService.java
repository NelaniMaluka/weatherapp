package com.WeatherApp.Backend.User;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface UserService {
	ResponseEntity<?> login(UserAccount userAccount);
	ResponseEntity<?> createAccount(UserAccount userAccount);
	ResponseEntity<?> updateUserFields(Integer userId, Map<String, String> updates);
	ResponseEntity<String> forgotPassword(String email);
	ResponseEntity<String> resetPassword(String email);

}
