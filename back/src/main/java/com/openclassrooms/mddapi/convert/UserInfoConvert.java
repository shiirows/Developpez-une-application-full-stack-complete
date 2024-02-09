package com.openclassrooms.mddapi.convert;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.DTO.UserInfoDto;
import com.openclassrooms.mddapi.model.User;

@Component
public class UserInfoConvert {

	public UserInfoDto entityToDto(User user) {

		UserInfoDto dto = new UserInfoDto();

		dto.setId(user.getId());
		dto.setUsername(user.getUsername());
		dto.setEmail(user.getEmail());
		return dto;
	}

	public List<UserInfoDto> entityToDto(List<User> userInfo) {

		return userInfo.stream().map(x -> entityToDto(x)).collect(Collectors.toList());

	}

}
