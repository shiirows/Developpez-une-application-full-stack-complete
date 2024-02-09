package com.openclassrooms.mddapi.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.openclassrooms.mddapi.userdetails.UserDetailsImpl;
import com.openclassrooms.mddapi.userdetails.UserDetailsServiceImpl;


public class AuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	UserDetailsServiceImpl detailsServiceImpl;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			String tokenJWT = jwtUtils.parseJwt(request);

			if (tokenJWT != null && jwtUtils.validateJwtToken(tokenJWT)) {

				String username = jwtUtils.getUserNameFromJwtToken(tokenJWT);
				// String email = jwtUtils.getEmailFromJwtToken(tokenJWT);

				UserDetailsImpl userDetails = (UserDetailsImpl) detailsServiceImpl.loadUserByUsername(username);

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());

				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);

			}

		} catch (Exception e) {

		}

		filterChain.doFilter(request, response);
	}
}
