package com.WeatherApp.Backend.User;

import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.WeatherApp.Backend.Newsletter.NewsletterRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService{
	
	private final UserAccountRepository userAccountRepository;
	private final NewsletterRepository newsletterRepository;
	
	@Autowired
	public UserServiceImpl(UserAccountRepository userAccountRepository, NewsletterRepository newsletterRepository) {
		super();
		this.userAccountRepository = userAccountRepository;
		this.newsletterRepository = newsletterRepository;
	}
	
	@Override
	public ResponseEntity<?> login(UserAccount userAccount){
		try {
			UserAccount user = userAccountRepository.findByEmailAndPassword(userAccount.getEmail(), userAccount.getPassword());
			
			if (user != null) {
				UserResponseDTO userResponseDTO = createUserResponseDTO(user);
				return ResponseEntity.ok(userResponseDTO);
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
			}
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login");
		}
	}
	
	@Override
	public ResponseEntity<?> createAccount(UserAccount userAccount) {
		try {
			if (userAccountRepository.findByEmail(userAccount.getEmail()) != null) {
				return ResponseEntity.badRequest().body("User with this email already exists");
			}
			
			if (userAccountRepository.findByEmail(userAccount.getEmail()) == null) {
				userAccountRepository.save(userAccount);
				UserResponseDTO userResponseDTO = createUserResponseDTO(userAccount);
				return ResponseEntity.ok(userResponseDTO);
			} else {
				return ResponseEntity.badRequest().body("User with this email already exists");
			}
			
		}catch (Exception e ) {
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
            //passwordResetService.createPasswordResetRequest(userAccount.getEmail());
            return ResponseEntity.ok("Password reset email sent successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @Override
    public ResponseEntity<String> resetPassword(String Email) {
        try {
            //String email = requestBody.get("email");
            //String newPassword = requestBody.get("newPassword");
            //passwordResetService.resetPassword(email, newPassword);
            return ResponseEntity.ok("Password reset successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
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
