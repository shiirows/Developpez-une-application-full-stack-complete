package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.Article;

public interface ArticleRespository extends JpaRepository<Article, Long> {

	List<Article> findBySubject_id(Long id);

}
