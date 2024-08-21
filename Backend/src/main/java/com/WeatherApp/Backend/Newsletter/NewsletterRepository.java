package com.WeatherApp.Backend.Newsletter;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsletterRepository extends JpaRepository<Newsletter, Integer>{

	public Newsletter findByEmail(String email);
	
}
