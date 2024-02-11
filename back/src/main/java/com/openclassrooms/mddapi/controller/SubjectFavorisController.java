package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.openclassrooms.mddapi.security.WebSecurityConfig;
import com.openclassrooms.mddapi.service.SubjectService;

@RestController
@CrossOrigin
@RequestMapping("/api/subject/favoris")
public class SubjectFavorisController {

	@Autowired
	SubjectService subjectService;

	@Autowired
	WebSecurityConfig config;

	@PostMapping("/{id}")
	public ResponseEntity<?> createSubscription(@PathVariable Long id) {

		try {
			subjectService.createSubscription(id, config.authentification());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);

		}
	}

	@GetMapping("")
	public ResponseEntity<?> getSubscription() {

		try {
			return new ResponseEntity<>(subjectService.getSubscription(config.authentification()), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);

		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFavoris(@PathVariable Long id) {

		try {
			subjectService.deleteSubscription(id, config.authentification());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);

		}
	}

}
