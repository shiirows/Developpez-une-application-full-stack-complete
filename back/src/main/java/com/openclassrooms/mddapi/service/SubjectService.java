package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.DTO.SubjectDto;
import com.openclassrooms.mddapi.convert.SubjectConvert;
import com.openclassrooms.mddapi.convert.SubscriptionSubjectConvert;
import com.openclassrooms.mddapi.model.Subject;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.request.SubjectRequest;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.response.SubjectResponse;
import com.openclassrooms.mddapi.response.SubscriptionResponse;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service
public class SubjectService {

	@Autowired
	SubjectRepository subjectRepository;

	@Autowired
	SubjectConvert convert;

	@Autowired
	UserRepository userRepository;

	@Autowired
	SubscriptionSubjectConvert subscriptionSubjectConvert;

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
		Subject subject = subjectRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: Article is not found."));
		return convert.entityToDto(subject);
	}

	public ResponseEntity<MessageResponse> createSubscription(Long id, User user) throws Exception {

		Subject subject = subjectRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: Article is not found."));

		Set<Subject> subjectSubscription = user.getSubscription();

		subjectSubscription.add(subject);
		user.setSubscription(subjectSubscription);
		userRepository.save(user);
		subjectRepository.save(subject);
		return new ResponseEntity<>(new MessageResponse("Subscription created !"), HttpStatus.ACCEPTED);

	}

	public SubscriptionResponse getSubscription(User user) {

		Set<SubjectDto> subjectDto = subscriptionSubjectConvert.entityToDto(user);

		return new SubscriptionResponse(subjectDto);
	}

	public ResponseEntity<MessageResponse> deleteSubscription(Long id, User user) {

		Set<Subject> subjectList = user.getSubscription();
		Iterator<Subject> iterator = subjectList.iterator();
		while (iterator.hasNext()) {
			Subject subject = iterator.next();
			if (subject.getId() == id) {
				iterator.remove();
			}
		}

		user.setSubscription(subjectList);
		userRepository.save(user);

		return new ResponseEntity<>(new MessageResponse("Subscription is deleted !"), HttpStatus.ACCEPTED);

	}

}
