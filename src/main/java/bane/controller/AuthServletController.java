package bane.controller;

import bane.dao.UserDAO;
import bane.model.User;
import bane.service.CookieService;
import bane.service.OTPService;
import bane.util.OAuthIdTokenVerifier;
import bane.util.PasswordUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import jakarta.xml.bind.DatatypeConverter;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@WebServlet(name = "AuthServletController", value = "/auth")
public class AuthServletController extends HttpServlet {

    private static final String COOKIE_NAME = "BaneCookie";

    private static final String LOGIN_ACTION = "login";
    private static final String LOGOUT_ACTION = "logout";
    private static final String AFTER_AUTH_ACTION = "after_auth";
    private static final String OTP_AUTH_ACTION = "otp_auth";
    private static final String LOGIN_WITH_OAUTH_ACTION = "oauth_login";
    private static final String USERS_APP_URL = "https://localhost:8443/SNI_DMS_Users_war_exploded/";
    private static final String DOCS_APP_URL = "https://localhost:8443/SNI_DMS_Documents_war_exploded/";
    private static final List<String> allowedURLs = Arrays.asList(USERS_APP_URL, DOCS_APP_URL);


    public static final String TOKEN_LOGIN_ACTION = "token_login";



    private OTPService otpService = OTPService.getInstance();
    private CookieService cookieService = CookieService.getInstance();

    private static List<String> trustedServiceURLs = Arrays.asList("");

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        String address = "/WEB-INF/pages/error.jsp";
        String action = request.getParameter("action");
        String serviceURL = request.getParameter("serviceURL");
        HttpSession session = request.getSession();

        System.out.println("Service URL is: " + serviceURL);

        System.out.println("Akcija je u Auth: " + action);

        if (action != null && LOGIN_ACTION.equals(action)) { //izbrisao allowedUrsl.contains
            try {
                String username = request.getParameter("username");
                String password = request.getParameter("password");


                byte[] salt = DatatypeConverter.parseHexBinary(UserDAO.getSaltByUsername(username));

                if (salt != null) {

                    //different login pages for Docs and Users app
                    User user = null;
                    if(serviceURL.equals(USERS_APP_URL)){
                        user = UserDAO.selectUserByUsernameAndPassword(username, PasswordUtil.hashPassword(password, salt), true);
                    }else { // DOCS_APP_URL
                        user = UserDAO.selectUserByUsernameAndPassword(username, PasswordUtil.hashPassword(password, salt), false);
                    }

//                    if (user != null) {
//                        /*user exists in base, server generates token for 2fa and redirects to token page*/
//
//                        //generate token
//                        PasswordUtil.setToken(user);
//                        //insert token in DB
//                        UserDAO.setToken(user);
//
//                        System.out.println("user is logged id, generating cookie...");
//
//                         ;
//                       //user is logged id, generating cookie
//                        Cookie cookie = new Cookie(COOKIE_NAME, DatatypeConverter.printHexBinary(PasswordUtil.generateSecureRandom(16)));
//                        cookie.setMaxAge(30*60);
//                        cookie.setPath("/");
//
//                        //set Cookie and Username to hash map
//                        cookieService.put(cookie.getValue(), user);
//
//                        System.out.println("Setovani cookie i user: " + cookie.getValue() + " : " + user.getUsername());
//
//                        response.addCookie(cookie);
//
//                        // add user in session
//                       // request.getSession().setAttribute("user", user); ne radi, moram u ove dvije app to raditi
//
//                        redirectToServiceWithOtp(response, serviceURL, username);
//                       // response.sendRedirect(serviceURL + "?action=" + OTP_AUTH_ACTION);
//                    }

                    forwardToTokenPage(user, serviceURL, request, response);

                    //generateOtp(response, user, serviceURL);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException | IOException e) {
                e.printStackTrace();
            } catch (InvalidKeySpecException e) {
                e.printStackTrace();
            }
                                                                              //OAuth2 login is enabled on DocsApp only (deleted )
        } else if(action!= null  && LOGIN_WITH_OAUTH_ACTION.equals(action)) {

            /*the integrity of the token received by HTTPS POST, must be verified*/
            GoogleIdToken.Payload payload = null;
            try {
                payload = OAuthIdTokenVerifier.getVerifiedPayload(request.getParameter("id_token"));

                System.out.println(" EVO mail-a : " + payload.getEmail());;
                // return;

               User user = UserDAO.selectUserByMail(payload.getEmail());

               forwardToTokenPage(user, serviceURL, request, response);
             // generateOtp(response, user, serviceURL);

            } catch (GeneralSecurityException e) {
                e.printStackTrace();
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }
        else if(action != null && LOGOUT_ACTION.equals(action)){
            Cookie[] cookies = request.getCookies();
            System.out.println("Dosao u Auth logout");
            Cookie validCookie = null;
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals(COOKIE_NAME)) {
                        validCookie = cookie;
                    }
                }
            }
            if(validCookie != null){
                System.out.println("Nasao cookie iinvalidiram ga");
                cookieService.remove(validCookie.getValue());
                request.getSession().invalidate();
                if(serviceURL.equals(USERS_APP_URL)){
                    address = "/WEB-INF/pages/users_login.jsp";
                }else { // DOCS_APP_URL
                    address = "/WEB-INF/pages/documents_login.jsp";
                }
                RequestDispatcher dispatcher = request.getRequestDispatcher(address);
                dispatcher.forward(request, response);
            }
        }
        else if(action!= null && TOKEN_LOGIN_ACTION.equals(action)){

                String requestToken = request.getParameter("token");
//            System.out.println("serviceURL je u roken login: " + serviceURL);
//            System.out.println("serviceURL je u roken login IZ SESIJE: " + request.getSession().getAttribute("serviceURL"));

                //get user from session, check if tokens match and the token did not expire
                User user = (User) session.getAttribute("user");

                String validToken = user.getToken();
                Date expriationTime = user.getTokenExpiration();
                if(new Date().compareTo(expriationTime) > 0 || !requestToken.equals(validToken)){
                    session.setAttribute("notification", "Token is invalid or is expired!");
                    System.out.println("token is not valid");
                    System.out.println("poredjenje: "  + (new Date().compareTo(expriationTime) < 0 ));
                    System.out.println(requestToken + "  valid: " + validToken );
                    address = "/WEB-INF/pages/token_login.jsp";
                }else{
                    System.out.println("token IS  valid");
                    /*token is valid i*/
                    user.setLoggedIn(true);

                    session.setAttribute("notification", "");

//                    getServletContext().setAttribute("users", UserDAO.selectAll());
//                    address = "/WEB-INF/pages/users_crud.jsp";

                    try {
                        generateOtp(response, user, (String) request.getSession().getAttribute("serviceURL"));
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }
            }
        else if (serviceURL != null) { /* User is redirected from doc/user App*/
            boolean isCookieValid = false;

            Cookie validCookie = null;
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals(COOKIE_NAME)) {
                        System.out.println("nasao cookieeee :" + cookie.getValue());
                        System.out.println("Cookie je: " + cookie.getValue());
                        System.out.println("exp time: " + cookie.getMaxAge());
                        validCookie = cookie;
                    }
                }
            }
           // User user = (User)request.getSession().getAttribute("user");

            if (validCookie !=  null) {
                System.out.println("Prosao je cookie!");
                /*// generate otp and send it as url parameter to service
                String otp = DatatypeConverter.printHexBinary(PasswordUtil.generateSecureRandom(16)) + new Date().getTime();

                //put otp to map
                otpService.putOtp(otp, serviceURL);

                response.sendRedirect(serviceURL + "?action=otp_auth&otp=" + otp);*/

                //get user from cookie value
                User user = cookieService.getUserByCookie(validCookie.getValue());

                if(user == null){
                    if(serviceURL.equals(USERS_APP_URL)){
                        address = "/WEB-INF/pages/users_login.jsp";
                    }else { // DOCS_APP_URL
                        address = "/WEB-INF/pages/documents_login.jsp";
                    }



                    request.getSession().setAttribute("serviceURL", serviceURL);
                    RequestDispatcher dispatcher = request.getRequestDispatcher(address);
                    System.out.println("user je null, forwardam na: " + address);
                    dispatcher.forward(request, response);
                }else {

                    redirectToServiceWithOtp(response, serviceURL, user.getUsername());
                }
                //response.sendRedirect("https://localhost:8443/");
            } else { /*user is not logged in, send redirect to *_login.jsp */
                System.out.println("Nije prosao, ili cookie nije validan ili nema usera u sesiji!");

                if(serviceURL.equals(USERS_APP_URL)){
                    address = "/WEB-INF/pages/users_login.jsp";
                }else { // DOCS_APP_URL
                    address = "/WEB-INF/pages/documents_login.jsp";
                }



                request.getSession().setAttribute("serviceURL", serviceURL);
                RequestDispatcher dispatcher = request.getRequestDispatcher(address);
                dispatcher.forward(request, response);
            }
        } else {
            address = "/WEB-INF/pages/error.jsp";
            RequestDispatcher dispatcher = request.getRequestDispatcher(address);
            dispatcher.forward(request, response);
        }


    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      doGet(request, response);
    }



    private void generateOtp(HttpServletResponse response, User user, String serviceURL) throws SQLException, IOException {
//            /*user exists in base, server generates token for 2fa and redirects to token page*/
//
//            //generate token
//            PasswordUtil.setToken(user);
//            //insert token in DB
//            UserDAO.setToken(user);

            System.out.println("user is logged id, generating cookie...");

            ;
            //user is logged id, generating cookie
            Cookie cookie = new Cookie(COOKIE_NAME, DatatypeConverter.printHexBinary(PasswordUtil.generateSecureRandom(16)));
            cookie.setMaxAge(30*60);
            cookie.setPath("/");

            //set Cookie and Username to hash map
            cookieService.put(cookie.getValue(), user);

            System.out.println("Setovani cookie i user: " + cookie.getValue() + " : " + user.getUsername());

            response.addCookie(cookie);

            // add user in session
            // request.getSession().setAttribute("user", user); ne radi, moram u ove dvije app to raditi

            redirectToServiceWithOtp(response, serviceURL, user.getUsername());
            // response.sendRedirect(serviceURL + "?action=" + OTP_AUTH_ACTION);

    }

    private void redirectToServiceWithOtp(HttpServletResponse response, String serviceURL, String username) throws IOException {
        // generate otp and send it as url parameter to service
        String otp = DatatypeConverter.printHexBinary(PasswordUtil.generateSecureRandom(16)) + new Date().getTime();

        //put otp to map
        otpService.putOtp(otp, username);

        response.sendRedirect(serviceURL + "?action=" +  OTP_AUTH_ACTION +"&otp=" + otp);
    }

    private void forwardToTokenPage(User user, String serviceURL, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, SQLException {
        String address;
        if(user != null){
            /*user exists in base, server generates token for 2fa and redirects to token page*/
            //generate token
            PasswordUtil.setToken(user);
            //insert token in DB
            UserDAO.setToken(user);

            //send user on page for token confirmation
            request.getSession().setAttribute("user", user);
            request.getSession().setAttribute("serviceURL", serviceURL);
            request.getSession().setAttribute("notification", "");

            address = "/WEB-INF/pages/token_login.jsp";

        }else{
            request.getSession().setAttribute("notification", "Invalid username or password, or access is denied!");
            if(serviceURL.equals(USERS_APP_URL)){
                address = "/WEB-INF/pages/users_login.jsp";
            }else { // DOCS_APP_URL
                address = "/WEB-INF/pages/documents_login.jsp";
            }
        }
        RequestDispatcher dispatcher = request.getRequestDispatcher(address);
        dispatcher.forward(request, response);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
