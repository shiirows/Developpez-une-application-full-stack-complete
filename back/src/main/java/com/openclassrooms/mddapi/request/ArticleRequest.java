package com.openclassrooms.mddapi.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ArticleRequest {

	private Long idSubject;
	
	@NotBlank
	@Size(max = 5000)
	private String content;
	
	@NotBlank
	@Size(min = 3, max = 100)
	private String titre;
	
	
	public Long getIdSubject() {
		return idSubject;
	}
	public void setIdSubject(Long idSubject) {
		this.idSubject = idSubject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
}
