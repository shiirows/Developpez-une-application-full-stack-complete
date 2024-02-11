package com.openclassrooms.mddapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.request.CommentRequest;
import com.openclassrooms.mddapi.security.WebSecurityConfig;
import com.openclassrooms.mddapi.service.CommentService;

@RestController
@CrossOrigin
@RequestMapping("/api/comment")
public class CommentController {

	@Autowired
	CommentService commentService;

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	WebSecurityConfig config;

	@PostMapping("/{id}")
	public ResponseEntity<?> createComment(@PathVariable(required = true) Long id,
			@Valid @RequestBody CommentRequest commentRequest) {

		try {

			return new ResponseEntity<>(commentService.createComment(config.authentification(), commentRequest, id),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getAllCommentByArticleId(@PathVariable Long id) {

		try {

			return new ResponseEntity<>(commentService.getAllCommentByArticleId(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteComments(@PathVariable Long id) {

		try {
			return new ResponseEntity<>(commentService.delete(config.authentification(), id), HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);

		}
	}

}
