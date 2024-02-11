package com.openclassrooms.mddapi.convert;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.openclassrooms.mddapi.DTO.SubjectDto;
import com.openclassrooms.mddapi.model.Subject;

@Component
public class SubjectConvert {

	public SubjectDto entityToDto(Subject subject) {

		SubjectDto dto = new SubjectDto();

		dto.setId(subject.getId());
		dto.setName(subject.getName());
		dto.setDescription(subject.getDescription());
		return dto;
	}

	public List<SubjectDto> entityToDto(List<Subject> subjectInfo) {

		return subjectInfo.stream().map(x -> entityToDto(x)).collect(Collectors.toList());

	}

}
