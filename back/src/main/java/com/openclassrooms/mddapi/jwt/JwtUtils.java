package com.openclassrooms.mddapi.jwt;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;


import com.openclassrooms.mddapi.userdetails.UserDetailsImpl;


@Component
public class JwtUtils {

//	@Autowired
//	BlackListTokenRepository blackListTokenRepository;

	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${wcslyon.app.jwtSecret}")
	private String jwtSecret;

	@Value("${wcslyon.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	public String generateJWTToken(Authentication authentication) {

		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();

		// connexion par email
		return Jwts.builder().setSubject(userDetailsImpl.getEmail()).setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();

	}

	public String getUserNameFromJwtToken(String token) {
		// getSubject renvoi le username stocké dans le token
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	public Date getExpirationDateFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getExpiration();
	}

	public boolean validateJwtToken(String authToken) {

		try {

			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;

		} catch (SignatureException e) {
			logger.error("Signature JWT invalide: {}" + e.getMessage());

		} catch (MalformedJwtException e) {
			logger.error("le token JWT invalide: {}" + e.getMessage());

		} catch (ExpiredJwtException e) {
			logger.error("le token JWT expiré: {}" + e.getMessage());

		} catch (UnsupportedJwtException e) {
			logger.error("le token JWT n'est pas supporté: {}" + e.getMessage());

		} catch (IllegalArgumentException e) {
			logger.error("le token JWT invalide: {}" + e.getMessage());
		}

		return false;

	}

	public String parseJwt(HttpServletRequest request) {

		String headerAuth = request.getHeader("Authorization");

		if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());

		}
		return null;
	}

}
