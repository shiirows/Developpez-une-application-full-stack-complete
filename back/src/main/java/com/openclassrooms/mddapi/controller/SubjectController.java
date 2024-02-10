package com.openclassrooms.mddapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@PostMapping("")
	public ResponseEntity<?> createSubject( @RequestBody SubjectRequest subjectRequest) {

		try {
			config.authentification();
			return new ResponseEntity<>(subjectService.createSubject(subjectRequest), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
	}		
}

	@GetMapping("")
	public ResponseEntity<?> getAllSubject() {

		try {

			return new ResponseEntity<>(subjectService.getAllSubject(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getSubjectId(@PathVariable Long id) {

		try {

			return new ResponseEntity<>(subjectService.getSubjectId(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	}

}
