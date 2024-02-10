package com.openclassrooms.mddapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.request.SubjectRequest;
import com.openclassrooms.mddapi.security.WebSecurityConfig;
import com.openclassrooms.mddapi.service.SubjectService;

@RestController
@CrossOrigin
@RequestMapping("/api/subject")
public class SubjectController {
	
	@Autowired
	SubjectService subjectService;
	
	@Autowired
	SubjectRepository SubjectRepository;
	
	@Autowired
	WebSecurityConfig config;
	
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SubjectRequest subjectRequest) {

		try {
			return new ResponseEntity<>(subjectService.createSubject(config.authentification(), subjectRequest), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		
		
		

	}
	
	
	

}
