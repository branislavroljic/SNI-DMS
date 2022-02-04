package bane.service;

import java.util.concurrent.ConcurrentHashMap;

public class OTPService {

    private static OTPService instance = null;
    private ConcurrentHashMap<String, String> otpUsernameMap = new ConcurrentHashMap<>();

    private OTPService(){}

    public static OTPService getInstance(){
        if(instance == null)
            instance = new OTPService();
        return instance;
    }

    public void putOtp(String otp, String serviceURL){
        otpUsernameMap.put(otp, serviceURL);
    }

    public String getUsernamelByOtp (String otp){
        return otpUsernameMap.get(otp);
    }

    public void removeOtp(String otp){
        otpUsernameMap.remove(otp);
    }
}
