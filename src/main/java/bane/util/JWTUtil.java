package bane.util;

import io.jsonwebtoken.Jwts;

import java.io.File;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

public class JWTUtil {

    public static String getJWT(String username, File privKeyfile) throws Exception {
        PrivateKey privateKey = readPrivateKey(privKeyfile);

        Instant now = Instant.now();
        String jwtToken = Jwts.builder()
               // .claim("username", username)
                /*.claim("email", "jane@example.com")*/
                .setSubject(username)
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(1l, ChronoUnit.MINUTES)))
                .signWith(privateKey)
                .compact();

        return jwtToken;
    }

    public static RSAPrivateKey readPrivateKey(File file) throws Exception {
        String key = new String(Files.readAllBytes(file.toPath()), Charset.defaultCharset());

        System.out.println();
       // System.out.println(key);
        String privateKeyPEM = key
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replaceAll(System.lineSeparator(), "")
                .replace("-----END PRIVATE KEY-----", "");
       // System.out.println("after: "  + privateKeyPEM);

       // privateKeyPEM = "MIIEpQIBAAKCAQEA8ESOlgJdVt9pt5zKT7SI+5svKvUCAkBPTZkwp4apM+2TjUrJc55dWgC3kuGMRgdzgDMugMoPfnid1HKUQzY5g+Ey0fZGNYZw0GXa5B9xsGhjb7tO5+/BAM9mVDOJ+R3rmEegJqhIar7kwBVILKcaablqFHl/8W8xk/eIe8c45aVBF/A09UH4MHvNvCQWdijqB8EHJ+LCW9F6l+kKr06O665H/+1zZenttVcYZGD9v5Gk3qNdxmzn3XTxyZzKj3UzIaEx36D27iBqT6NyvyRCXnbq1s29DEr7fp/pvbRTJdE0JmhIMEAqIavIeiNJO4pM8AiOGvK1zkNtSFcHPq0lBQIDAQABAoIBAQCZw+ZUzpKZxEVOAwPe2rVIANrA7Sgp9KpMCRwAOsgSuZrSs+gVHGa18PuK/tnc/2vFwfui5K3hzKOFkQadtRg99GOnx6rLGo0ccfMSR6Vktoncuc0X1nJ4aEMe5BUK30ElpcEyvEQMPLr8yyHzocXfn4/qJo/hHb5m6eXpAWjCXjDDXxQlNqZENSfYGmsLnoOkxacoUUy7wP2q6UOWYlpSgx9GWe+7PeyPPwkgcz22QG1NsdyLY62K3pKCEyO1HGtoeuSaNrG58bSgFV6sq1Hz8hvuDrNX8VWJ1I3PI/w1bvnsRfsJ2Bgd8WbC1kY/glns0KCSPJQs/bKZxrfcdnoBAoGBAPpO1cyQLVECpJG8Fk2G7ONgW7lpMyLT/8jW8oG8k2S1bTq0nmGlVfPkgj0iYTJlMWd6+7zPZDFHD+/t4V3GTSzDGFVW21EqLgrbAnF1b96nRdBGveX7xZsbDCSzZk9du7k/zEANcbJpvwg3Ox0vb5LtGykQR1Ep2EqB05VHFmHBAoGBAPW7RfEtHg5NJ/YOhJeE3MnzgCLGdZVFG5OgbL9rYGYoKHSYiYq+gUBB0zTKHvVsL4LGZ69va+FCz2whpUtcTYKrywGjR0ounjAICFLCaSoEGP66oAAKZqdhNVxBHe8ePGznUW/c3SD/UPTsHmDSJwwZQExm6c6E40ItCOkBf8xFAoGBAMCYDBVcEiI1AF9J83cvi/Hf4HOnKDtyF2t3SBze9iIVHrh+5SaIyrvgZP2ZCGR4TC0tCalbgeIQpYic5jz7KcJ5Uq3HKPUomUis/xJBpBQTbLo21EKzGHahtxQ+HUiP/LMrDYNzVLpMdzphFND+AMFyQuWzqswegFfD0QMZMXWBAoGAfVLViPsJqSGQj903ok8Qi660Wwf8T/S+67uVusp4j6FLgKuK+kfOg4cOwI2U3HYghQHLP54D1w7L2soOEzEwFsSm9F7hrOO5qaVvGUYtfFA6ry9fCqZDVHovTK2pJpq1FpWi4voxjPKpxz/k/lwvrevy7wRNmhYMEWQGd09cbkECgYEAlNLxHpSarRAixgkMHulRTRnQLsRmVyQd4ZXj0kiKA37TAPcWL7zNirp3AYigL2rkca+4Ek5XyOL+k2a8JEk5n7Xr30wc+SaHgbXAX6k/HCj2FU+C5A+VBMsYmTKVLcEBcdfpe2645omF92nuAjvTX7UL/lyoZQIMx6SO1We6It4=";
        byte[] encoded = Base64.getDecoder().decode(privateKeyPEM);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
        return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
    }
}
