package com.openclassrooms.mddapi.response;

import java.util.List;

import com.openclassrooms.mddapi.DTO.SubjectDto;

public class SubjectResponse {
	
	private List<SubjectDto> subject;
	
	public SubjectResponse(List<SubjectDto> subject) {
		this.subject = subject;
	}
	
	public List<SubjectDto> getSubject(){
		return subject;
	}
	
	public void setSubject(List<SubjectDto> subject) {
		this.subject = subject;
	}

}
