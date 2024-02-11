package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.request.UpdateUserRequest;
import com.openclassrooms.mddapi.response.MessageResponse;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public ResponseEntity<MessageResponse> updateUser(UpdateUserRequest updateUserRequest, User user)
			throws Exception {

		user.setPassword(updateUserRequest.getPassword());
		user.setEmail(updateUserRequest.getEmail());
		userRepository.save(user);

		return new ResponseEntity<>(new MessageResponse("your passwords and email have been changed"), HttpStatus.ACCEPTED);

	}


}
