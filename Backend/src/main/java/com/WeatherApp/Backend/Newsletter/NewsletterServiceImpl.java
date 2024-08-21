package com.WeatherApp.Backend.Newsletter;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
public class NewsletterServiceImpl  implements NewsletterService{

	private final NewsletterRepository newsletterRepository;

	public NewsletterServiceImpl(NewsletterRepository newsletterRepository) {
		super();
		this.newsletterRepository = newsletterRepository;
	}
	
	@Override
	@Transactional
	public String addNewsletter(Newsletter newsletter) {
		try {
			if (newsletter.getEmail() == null) {
				throw new IllegalArgumentException("Please enter a valid email");
			}
			
			String trimmedEmail = newsletter.getEmail().trim();
			Newsletter existingNewsletter = newsletterRepository.findByEmail(trimmedEmail);
			
			if (existingNewsletter != null) {
				throw new IllegalStateException("Email already subscribed");
			}
			
			newsletter.setEmail(trimmedEmail);
			newsletterRepository.save(newsletter);
			
			return "We Received Your Email";
			
		} catch (IllegalArgumentException | IllegalStateException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("An error occured");
		}	
	}

}
