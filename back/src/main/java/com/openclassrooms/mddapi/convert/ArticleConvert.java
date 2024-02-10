package com.openclassrooms.mddapi.convert;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.DTO.ArticleDto;
import com.openclassrooms.mddapi.model.Article;

@Component
public class ArticleConvert {

	public ArticleDto entityToDto(Article article) {

		ArticleDto dto = new ArticleDto();

		dto.setContent(article.getContent());
		dto.setCreatedate(article.getCreatedate());
		dto.setSubjectname(article.getSubject().getName());
		dto.setTitre(article.getTitre());
		dto.setUsername(article.getUser().getUsername());

		return dto;
	}
	
	
	public List<ArticleDto> entityToDto(List<Article> article) {

		return article.stream().map(x -> entityToDtoList(x)).collect(Collectors.toList());

	}
	
	public ArticleDto entityToDtoList(Article article) {

		ArticleDto dto = new ArticleDto();

		dto.setContent(article.getContent());
		dto.setCreatedate(article.getCreatedate());
		dto.setTitre(article.getTitre());
		dto.setUsername(article.getUser().getUsername());

		return dto;
	}
	
	

}
