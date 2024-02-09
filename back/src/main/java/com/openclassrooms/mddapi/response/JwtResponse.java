package com.openclassrooms.mddapi.response;

public class JwtResponse {

	private String token;
	private String type = "Bearer ";

	public JwtResponse(String token) {
		this.token = token;

	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

}
