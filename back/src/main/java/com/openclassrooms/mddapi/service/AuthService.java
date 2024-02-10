package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.DTO.UserInfoDto;
import com.openclassrooms.mddapi.convert.UserInfoConvert;
import com.openclassrooms.mddapi.jwt.JwtUtils;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.request.SignupRequest;
import com.openclassrooms.mddapi.request.UserSigninRequest;
import com.openclassrooms.mddapi.response.JwtResponse;

@Service
public class AuthService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	UserInfoConvert convert;

	public ResponseEntity<?> register(SignupRequest signupRequest) throws Exception {

		User user = new User();
		user.setEmail(signupRequest.getEmail());
		user.setUsername(signupRequest.getUsername());
		
		user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
		
		userRepository.save(user);
		UserSigninRequest signinRequest = new UserSigninRequest();

		signinRequest.setEmail(signupRequest.getEmail());
		signinRequest.setPassword(signupRequest.getPassword());

		return this.signinUser(signinRequest);

	}

	public ResponseEntity<?> signinUser(UserSigninRequest signinRequest) throws Exception {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJWTToken(authentication);

		return ResponseEntity.ok(new JwtResponse(jwt));

	}

	public UserInfoDto getUser(User user) {

		return convert.entityToDto(user);

	}

}
