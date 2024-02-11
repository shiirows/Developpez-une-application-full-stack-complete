package com.openclassrooms.mddapi.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.DTO.ArticleDto;
import com.openclassrooms.mddapi.DTO.SubjectDto;
import com.openclassrooms.mddapi.convert.ArticleConvert;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ArticleRespository;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.request.ArticleRequest;
import com.openclassrooms.mddapi.response.ArticleResponse;
import com.openclassrooms.mddapi.response.MessageResponse;

@Service
public class ArticleService {

	@Autowired
	ArticleRespository articleRespository;

	@Autowired
	ArticleConvert convert;

	@Autowired
	SubjectRepository subjectRepository;

	public ResponseEntity<MessageResponse> createArticle(User user, ArticleRequest articleRequest) throws Exception {

		Subject subject = subjectRepository.getById(articleRequest.getIdSubject());
		Article article = new Article();
		Date date = new Date();

		article.setTitre(articleRequest.getTitre());
		article.setContent(articleRequest.getContent());
		article.setCreatedate(date);
		article.setSubject(subject);
		article.setUser(user);

		articleRespository.save(article);

		return new ResponseEntity<>(new MessageResponse("Article created !"), HttpStatus.ACCEPTED);

	}

	public ArticleResponse getAllArticle() {

		List<Article> articles = articleRespository.findAll();
		List<ArticleDto> articleDto = convert.entityToDto(articles);

		return new ArticleResponse(articleDto);

	}

	public ArticleDto getArticleId(Long id) {
		Article article = articleRespository.getById(id);
		return convert.entityToDto(article);
	}
	
	
	// tout les articles d'un théme
	public ArticleResponse getAllArticleBySubjectId(Long id) {
		
		List<Article> articles = articleRespository.findBySubject_id(id);
		List<ArticleDto> articleDto = convert.entityToDto(articles);

		return new ArticleResponse(articleDto);
	}
	

}
