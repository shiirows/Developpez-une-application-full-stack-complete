package com.openclassrooms.mddapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.request.UpdateUserRequest;
import com.openclassrooms.mddapi.security.WebSecurityConfig;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	WebSecurityConfig config;
	
	@Autowired
	UserService userService;
	
	@PutMapping("")
	public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserRequest updateUserRequest) {

		try {
			return userService.updateUser(updateUserRequest, config.authentification());
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	}
}
