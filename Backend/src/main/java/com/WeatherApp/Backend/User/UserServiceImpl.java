package com.WeatherApp.Backend.User;

import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.WeatherApp.Backend.Email.EmailService;
import com.WeatherApp.Backend.Newsletter.NewsletterRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService{
	
	private final UserAccountRepository userAccountRepository;
	private final NewsletterRepository newsletterRepository;
	private EmailService emailService;
	
	@Autowired
	public UserServiceImpl(UserAccountRepository userAccountRepository, NewsletterRepository newsletterRepository, EmailService emailService) {
		super();
		this.userAccountRepository = userAccountRepository;
		this.newsletterRepository = newsletterRepository;
		this.emailService = emailService;
	}
	
	@Override
	public ResponseEntity<?> login(UserAccount userAccount) {
	    try {
	        // Find the user by email
	        UserAccount user = userAccountRepository.findByEmail(userAccount.getEmail());

	        // Check if a user was found and the password matches
	        if (user != null && user.getPassword().equals(userAccount.getPassword())) {
	            // Create a UserResponseDTO to return
	            UserResponseDTO userResponseDTO = createUserResponseDTO(user);
	            return ResponseEntity.ok(userResponseDTO);
	        } else {
	            // Return a 401 Unauthorized if the email or password is incorrect
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
	        }

	    } catch (Exception e) {
	        // Handle any unexpected errors
	        e.printStackTrace();  // For debugging purposes
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login" + e);
	    }
	}

	
	@Override
	public ResponseEntity<?> createAccount(UserAccount userAccount) {
	    try {
	        if (userAccountRepository.findByEmail(userAccount.getEmail()) != null) {
	            return ResponseEntity.badRequest().body("User with this email already exists");
	        }
	        userAccountRepository.save(userAccount);
	        UserResponseDTO userResponseDTO = createUserResponseDTO(userAccount);
	        return ResponseEntity.ok(userResponseDTO);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Failed to create account");
	    }
	}

	
	@Override
	public ResponseEntity<?> updateUserFields(Integer userId, Map<String, String> updates){
		try {
			
		UserAccount user = userAccountRepository.findById(userId).orElse(null);
		
		if (user != null) {
			for (Map.Entry<String, String> entry : updates.entrySet()) {
				String field = entry.getKey();
				String value = entry.getValue();
				
				switch (field.toLowerCase()) {
					case "username":
						user.setFullName(value);
						break;
					case "email":
						user.setEmail(value);
						break;
					case "primarylocation":
						user.setPrimaryLocation(value);
						break;
					case "secondarylocation":
						user.setSecondaryLocation(value);
						break;
					default:
						ResponseEntity.badRequest().body("Invalid field specified");
				}
			}
		}
		
		userAccountRepository.save(user);
		UserResponseDTO userResponseDTO = createUserResponseDTO(user);
		return ResponseEntity.ok(userResponseDTO);
		
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Failed to update user fields");
		}
		
	}
	
	@Override
	public ResponseEntity<String> forgotPassword(String Email) {
	    try {
	        UserAccount user = userAccountRepository.findByEmail(Email);

	        if (user != null) {
	            emailService.sendSimpleEmail(Email, "Reset Password", user.getPassword());
	            return ResponseEntity.ok("Email successfully sent");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + Email);
	        }

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred" + e);
	    }
	}

	private UserResponseDTO createUserResponseDTO(UserAccount user) {
		return new UserResponseDTO(
				user.getUserId(),
				user.getFullName(),
				user.getEmail(),
				user.getPrimaryLocation() != null ? user.getPrimaryLocation() : "",
				user.getSecondaryLocation() != null ? user.getSecondaryLocation() : ""
		);
	}
}
