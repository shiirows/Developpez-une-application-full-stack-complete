package com.openclassrooms.mddapi.response;

import java.util.List;

import com.openclassrooms.mddapi.DTO.ArticleDto;

public class ArticleResponse {

	private List<ArticleDto> article;
	
	public ArticleResponse(List<ArticleDto> article) {
		this.article = article;
	}
	
	public List<ArticleDto> getArticle(){
		return article;
	}
	
	public void setArticle(List<ArticleDto> article) {
		this.article = article;
	}
}
