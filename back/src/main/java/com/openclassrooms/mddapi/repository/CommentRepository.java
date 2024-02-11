package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.Comments;

public interface CommentRepository extends JpaRepository<Comments,Long>{

	List<Comments> findByArticle_id(Long id);

}
