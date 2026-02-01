package com.olivier.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner createDefaultAdmin(@Autowired AdminUserRepository adminRepo) {
		return args -> {
			String username = "oligoudreault@gmail.com";
			String password = "Juliesamoli123*";
			if (adminRepo.findByUsername(username).isEmpty()) {
				String hash = new BCryptPasswordEncoder().encode(password);
				adminRepo.save(new AdminUser(username, hash));
				System.out.println("Default admin user created: " + username);
			}
		};
	}

}
