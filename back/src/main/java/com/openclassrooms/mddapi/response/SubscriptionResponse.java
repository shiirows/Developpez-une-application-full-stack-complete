package com.openclassrooms.mddapi.response;

import java.util.Set;

import com.openclassrooms.mddapi.DTO.SubjectDto;

public class SubscriptionResponse {

	private Set<SubjectDto> subscription;

	public SubscriptionResponse(Set<SubjectDto> subscription) {
		this.subscription = subscription;
	}

	public Set<SubjectDto> getSubscription() {
		return subscription;
	}

	public void setSubscription(Set<SubjectDto> subscription) {
		this.subscription = subscription;
	}

}
