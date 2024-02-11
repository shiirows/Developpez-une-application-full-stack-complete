package com.openclassrooms.mddapi.convert;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.openclassrooms.mddapi.DTO.CommentDto;
import com.openclassrooms.mddapi.model.Comments;

@Component
public class CommentConvert {

	public CommentDto entityToDto(Comments comments) {

		CommentDto dto = new CommentDto();

		dto.setComment(comments.getComment());
		dto.setCreatedate(comments.getCreatedate());
		dto.setId(comments.getId());
		dto.setUsername(comments.getUser().getUsername());

		return dto;

	}

	public List<CommentDto> entityToDto(List<Comments> comments) {

		return comments.stream().map(x -> entityToDto(x)).collect(Collectors.toList());

	}

}
