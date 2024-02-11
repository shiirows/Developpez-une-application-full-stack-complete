package com.openclassrooms.mddapi.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.DTO.CommentDto;
import com.openclassrooms.mddapi.convert.CommentConvert;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Comments;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ArticleRespository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.request.ArticleRequest;
import com.openclassrooms.mddapi.request.CommentRequest;
import com.openclassrooms.mddapi.response.MessageResponse;

@Service
public class CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	CommentConvert commentConvert;

	@Autowired
	ArticleRespository articleRespository;

	@Autowired
	CommentConvert convert;

	public ResponseEntity<MessageResponse> createComment(User user, CommentRequest commentRequest, Long id)
			throws Exception {

		Comments comment = new Comments();
		Article article = articleRespository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: post is not found."));
		Date date = new Date();

		comment.setComment(commentRequest.getComment());
		comment.setCreatedate(date);
		comment.setUser(user);
		comment.setArticle(article);

		commentRepository.save(comment);

		return new ResponseEntity<>(new MessageResponse("Comment created !"), HttpStatus.ACCEPTED);

	}

	public List<CommentDto> getAllCommentByArticleId(Long id) throws Exception {

		List<Comments> comments = commentRepository.findByArticle_id(id);

		return convert.entityToDto(comments);

	}

	public ResponseEntity<MessageResponse> delete(User user, Long id) throws Exception {

		Comments comment = commentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: post is not found."));

		if (user.getId() != comment.getUser().getId()) {

			return new ResponseEntity<>(new MessageResponse("Comment is not deleted !"), HttpStatus.ACCEPTED);
		}

		commentRepository.delete(comment);
		return new ResponseEntity<>(new MessageResponse("Comment deleted !"), HttpStatus.ACCEPTED);
	}

}
