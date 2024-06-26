package it.unicam.cs.pawm.exchangeappbackend.services.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class JwtTokenService {
    private final JwtEncoder encoder;

    public JwtTokenService(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    public String generateJwtToken(Authentication auth){
        Instant now = Instant.now();
        String scope = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("self")
            .issuedAt(now)
            .expiresAt(now.plus(1, ChronoUnit.HOURS))
            .subject(auth.getName())
            .claim("scope", scope)
            .build();
        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
