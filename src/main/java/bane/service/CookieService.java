package bane.service;

import bane.model.User;
import lombok.Getter;

import java.util.concurrent.ConcurrentHashMap;

@Getter
public class CookieService {

    private static CookieService instance = null;
    private ConcurrentHashMap<String, User> cookieUserMap = new ConcurrentHashMap<>();

    private CookieService(){}

    public static CookieService getInstance(){
        if(instance == null)
            instance = new CookieService();
        return instance;
    }

    public void put(String cookieValue, User user){
        cookieUserMap.put(cookieValue, user);
    }

    public User getUserByCookie (String cookieValue){
        return cookieUserMap.get(cookieValue);
    }

    public void remove(String cookieValue){
        cookieUserMap.remove(cookieValue);
    }
}