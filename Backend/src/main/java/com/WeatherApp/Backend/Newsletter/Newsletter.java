package com.WeatherApp.Backend.Newsletter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;


@Entity
public class Newsletter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @Email(message = "Please provide a valid email")
    public String email;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
}
