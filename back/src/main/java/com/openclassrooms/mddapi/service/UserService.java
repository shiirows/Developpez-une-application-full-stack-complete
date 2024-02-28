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
        boolean usernameChanged = false;
        boolean emailChanged = false;

      
        // Vérifiez si le nom d'utilisateur a été modifié
        if (!user.getUsername().equals(updateUserRequest.getUsername())) {
            user.setUsername(updateUserRequest.getUsername());
            usernameChanged = true;
            System.out.println("change name");
        }

        // Vérifiez si l'email a été modifié
        if (!user.getEmail().equals(updateUserRequest.getEmail())) {
            user.setEmail(updateUserRequest.getEmail());
            emailChanged = true;
            System.out.println("change mail");
        }

        // Enregistrez les modifications dans la base de données
        userRepository.save(user);

        String message = "Your ";
        if (usernameChanged && emailChanged) {
            message += "username and email have been changed";
        } else if (usernameChanged) {
            message += "username has been changed";
        } else if (emailChanged) {
            message += "email has been changed";
        } else {
            message += "profile has been updated"; // Aucun changement détecté
        }

        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.ACCEPTED);

	}


}
