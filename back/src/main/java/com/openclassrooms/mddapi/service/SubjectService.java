package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.DTO.SubjectDto;
import com.openclassrooms.mddapi.convert.SubjectConvert;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.request.SubjectRequest;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.response.SubjectResponse;

import java.util.List;

@Service
public class SubjectService {

	@Autowired
	SubjectRepository subjectRepository;

	@Autowired
	SubjectConvert convert;

	public ResponseEntity<MessageResponse> createSubject(SubjectRequest subjectRequest) throws Exception {

		Subject subject = new Subject();

		subject.setName(subjectRequest.getName());
		subject.setDescription(subjectRequest.getDescription());

		subjectRepository.save(subject);
		return new ResponseEntity<>(new MessageResponse("subject created !"), HttpStatus.ACCEPTED);

	}

	public SubjectResponse getAllSubject() {

		List<Subject> subjects = subjectRepository.findAll();
		List<SubjectDto> subjectDto = convert.entityToDto(subjects);

		return new SubjectResponse(subjectDto);

	}

	public SubjectDto getSubjectId(Long id) {
		Subject subject = subjectRepository.getById(id);
		return convert.entityToDto(subject);
	}

}
