/*
package bane.util;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class OAuthIdTokenVerifier {

    private static final String GOOGLE_CLIENT_ID = "351922003621-rsallgk461e3i3oo8js07rgg0qa5gf2k.apps.googleusercontent.com";


    public static GoogleIdToken.Payload getVerifiedPayload(String tokenString) throws IOException, GeneralSecurityException {

        GsonFactory gsonFactory = new GsonFactory();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), gsonFactory).setAudience(Collections.singletonList(GOOGLE_CLIENT_ID)).build();

        GoogleIdToken googleIdToken = verifier.verify(tokenString);
        if(googleIdToken != null){
            return googleIdToken.getPayload();
        }else{
            throw new IllegalArgumentException("Invalid Google ID token - bane");
        }
    }
}
*/
