package bane.util;

import bane.model.User;
import jakarta.xml.bind.DatatypeConverter;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Date;


public class PasswordUtil {

    static final long ONE_MINUTE_IN_MILLIS=60000;//milliseconds
    static final long EXIPRATION_IN_MINUTES=5;

    public static String hashPassword(String password, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        //iterationCount je bio 65536
        KeySpec keySpec = new PBEKeySpec(password.toCharArray(), salt, 100, 128);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] hash = factory.generateSecret(keySpec).getEncoded();
        return DatatypeConverter.printHexBinary(hash);
    }

    public static byte[] generateSecureRandom(int bufferSize){
        byte[] salt = new byte[bufferSize];
        new SecureRandom().nextBytes(salt);
        return salt;
    }

    public static void setToken(User user){
        String token = DatatypeConverter.printHexBinary(generateSecureRandom(4));
        Date expirationTime = new Date(new Date().getTime() + EXIPRATION_IN_MINUTES*ONE_MINUTE_IN_MILLIS);
        user.setToken(token);
        user.setTokenExpiration(expirationTime);
        return;
    }
}