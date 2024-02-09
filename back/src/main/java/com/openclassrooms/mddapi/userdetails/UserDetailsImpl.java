package com.openclassrooms.mddapi.userdetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openclassrooms.mddapi.model.User;


@SuppressWarnings("serial")
public class UserDetailsImpl implements UserDetails {

	private Long id;

	private String username;

	@JsonIgnore
	private String password;

	private String email;

	private Set<? extends GrantedAuthority> grantedAuthority;

	public static UserDetailsImpl build(User user) {

		UserDetailsImpl userDetailsImpl = new UserDetailsImpl();
		userDetailsImpl.setId(user.getId());
		userDetailsImpl.setPassword(user.getPassword());
		userDetailsImpl.setEmail(user.getEmail());

		Set<SimpleGrantedAuthority> authoritys = new HashSet<SimpleGrantedAuthority>();

		userDetailsImpl.setGrantedAuthority(authoritys);

		return userDetailsImpl;

	}

	private void setGrantedAuthority(Set<? extends GrantedAuthority> authoritys) {
		this.grantedAuthority = authoritys;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return this.grantedAuthority;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}