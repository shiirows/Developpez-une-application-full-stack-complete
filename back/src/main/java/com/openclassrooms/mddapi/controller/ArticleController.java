package com.openclassrooms.mddapi.controller;

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

import com.openclassrooms.mddapi.repository.ArticleRespository;
import com.openclassrooms.mddapi.request.ArticleRequest;
import com.openclassrooms.mddapi.security.WebSecurityConfig;
import com.openclassrooms.mddapi.service.ArticleService;

@RestController
@CrossOrigin
@RequestMapping("/api/article")
public class ArticleController {

	@Autowired
	ArticleService articleService;

	@Autowired
	ArticleRespository articleRespository;

	@Autowired
	WebSecurityConfig config;

	@PostMapping("")
	public ResponseEntity<?> createArticle(@RequestBody ArticleRequest articleRequest) {

		try {

			return new ResponseEntity<>(articleService.createArticle(config.authentification(), articleRequest),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@GetMapping("")
	public ResponseEntity<?> getAllArticle() {

		try {

			return new ResponseEntity<>(articleService.getAllArticle(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getArticleId(@PathVariable Long id) {

		try {

			return new ResponseEntity<>(articleService.getArticleId(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	}

	@GetMapping("/subject/{id}")
	public ResponseEntity<?> getAllArticleBySubjectId(@PathVariable Long id) {

		try {

			return new ResponseEntity<>(articleService.getAllArticleBySubjectId(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

	}

}
