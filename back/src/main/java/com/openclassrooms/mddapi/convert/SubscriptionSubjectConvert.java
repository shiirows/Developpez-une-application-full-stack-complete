package com.openclassrooms.mddapi.convert;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.DTO.SubjectDto;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;


@Component
public class SubscriptionSubjectConvert {

	@Autowired
	UserRepository userInfoRepository;

	public Set<SubjectDto> entityToDto(User user) {

		Set<SubjectDto> listeSubjectDto = new HashSet<>();

		for (Subject subject : user.getSubscription()) {
			SubjectDto subjectDto = new SubjectDto();

			subjectDto.setId(subject.getId());
			subjectDto.setDescription(subject.getDescription());
			subjectDto.setName(subject.getName());

			listeSubjectDto.add(subjectDto);
		}

		return listeSubjectDto;

	}

}
