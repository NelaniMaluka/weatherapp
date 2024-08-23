package com.WeatherApp.Backend.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer>{
	
	UserAccount findByEmail(String email);
}
