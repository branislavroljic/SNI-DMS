package bane.controller;

import bane.dao.UserDAO;
import bane.exception.MaliciousRequestException;
import bane.model.Role;
import bane.model.User;
import bane.service.CookieService;
import bane.service.OTPService;
import bane.util.ActionsUtil;
import bane.util.OAuthIdTokenVerifier;
import bane.util.PasswordUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import jakarta.xml.bind.DatatypeConverter;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@WebServlet(name = "AuthServletController", value = "/auth")
public class AuthServletController extends HttpServlet {

    private static final String COOKIE_NAME = "BaneCookie";

    private static final String LOGIN_ACTION = "login";
    private static final String LOGOUT_ACTION = "logout";
    private static final String GOOGLE_SIGN_OUT_ACTION = "google_sign_out";

    private static final String OTP_AUTH_ACTION = "otp_auth";
    private static final String LOGIN_WITH_OAUTH_ACTION = "oauth_login";
    public static final String TOKEN_LOGIN_ACTION = "token_login";
    private static final String USERS_APP_URL = "https://localhost:8443/SNI_DMS_Users_war_exploded/";
    private static final String DOCS_APP_URL = "https://localhost:8443/SNI_DMS_Documents_war_exploded/";
    private static final List<String> allowedURLs = Arrays.asList(USERS_APP_URL, DOCS_APP_URL);


    private OTPService otpService = OTPService.getInstance();
    private CookieService cookieService = CookieService.getInstance();


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {


        String address = "/WEB-INF/pages/error.jsp";
        String errorPage = "/WEB-INF/pages/error.jsp";

        String action = request.getParameter("action");
        String serviceURL = request.getParameter("serviceURL");
        HttpSession session = request.getSession();
        RequestDispatcher errorDispatcher = request.getRequestDispatcher(errorPage);

        try {
            if (action != null && LOGIN_ACTION.equals(action)) {
                try {
                    String username = request.getParameter("username");
                    String password = request.getParameter("password");

                    ActionsUtil.validateParameters(request, username, password, null);

                    byte[] salt = DatatypeConverter.parseHexBinary(UserDAO.getSaltByUsername(username));

                    if (salt != null) {

                        //different login pages for Docs and Users app
                        User user = null;
                        if (USERS_APP_URL.contains(serviceURL)) {
                            user = UserDAO.selectUserByUsernameAndPassword(username, PasswordUtil.hashPassword(password, salt), true);
                        } else { // DOCS_APP_URL
                            user = UserDAO.selectUserByUsernameAndPassword(username, PasswordUtil.hashPassword(password, salt), false);
                        }

                        forwardToTokenPage(user, serviceURL, request, response);

                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    request.getSession().setAttribute("errorMessage", "An error occurred while logging in!");
                    errorDispatcher.forward(request, response);
                    return;
                }
                //OAuth2 login is enabled on DocsApp only
            } else if (action != null && LOGIN_WITH_OAUTH_ACTION.equals(action) && DOCS_APP_URL.contains(serviceURL)) {

                /*the integrity of the token received by HTTPS POST, must be verified*/
                GoogleIdToken.Payload payload = null;
                try {
                    payload = OAuthIdTokenVerifier.getVerifiedPayload(request.getParameter("id_token"));

                    ActionsUtil.validateParameters(request, null, null, payload.getEmail());

                    User user = UserDAO.selectUserByMail(payload.getEmail());

                    forwardToTokenPage(user, serviceURL, request, response);
                    // generateOtp(response, user, serviceURL);

                } catch (Exception e) {
                    e.printStackTrace();
                    request.getSession().setAttribute("errorMessage", "An error occurred while logging in with OAUTH!");
                    errorDispatcher.forward(request, response);
                }

            } else if (action != null && LOGOUT_ACTION.equals(action)) {

                Cookie[] cookies = request.getCookies();

                Cookie validCookie = null;
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if (cookie.getName().equals(COOKIE_NAME)) {
                            validCookie = cookie;
                        }
                    }
                }
                if (validCookie != null) {

                    cookieService.remove(validCookie.getValue());
                    request.getSession().invalidate();

                    if (USERS_APP_URL.contains(serviceURL)) {
                        address = "/WEB-INF/pages/users_login.jsp";
                    } else { // DOCS_APP_URL
                        //logout from google oauth2
                        address = "/WEB-INF/pages/logout.jsp";

                    }
                    RequestDispatcher dispatcher = request.getRequestDispatcher(address);
                    dispatcher.forward(request, response);
                }
            } else if (GOOGLE_SIGN_OUT_ACTION.equals(action)) {

                address = "/WEB-INF/pages/documents_login.jsp";
                RequestDispatcher dispatcher = request.getRequestDispatcher(address);
                dispatcher.forward(request, response);

            } else if (action != null && TOKEN_LOGIN_ACTION.equals(action)) {

                String requestToken = request.getParameter("token");

                //get user from session, check if tokens match and the token did not expire
                User user = (User) session.getAttribute("user");

                String validToken = user.getToken();
                Date expriationTime = user.getTokenExpiration();
                if (new Date().compareTo(expriationTime) > 0 || !requestToken.equals(validToken)) {
                    session.setAttribute("notification", "Token is invalid or is expired!");
                    System.out.println("token is not valid");
                    System.out.println("poredjenje: " + (new Date().compareTo(expriationTime) < 0));
                    System.out.println(requestToken + "  valid: " + validToken);
                    address = "/WEB-INF/pages/token_login.jsp";
                } else {
                    System.out.println("token IS  valid");
                    /*token is valid i*/
                    user.setLoggedIn(true);

                    session.setAttribute("notification", "");

                    try {
                        generateOtp(response, user, (String) request.getSession().getAttribute("serviceURL"));
                    } catch (SQLException e) {
                        e.printStackTrace();
                        request.getSession().setAttribute("errorMessage", "An error occurred while generating  OTP!");
                        errorDispatcher.forward(request, response);
                    }
                }
            } else if (serviceURL != null) { /* User is redirected from doc/user App*/

                Cookie validCookie = null;
                Cookie[] cookies = request.getCookies();
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if (cookie.getName().equals(COOKIE_NAME)) {
                            validCookie = cookie;
                        }
                    }
                }

                if (validCookie != null) {

                    //get user from cookie value
                    User user = cookieService.getUserByCookie(validCookie.getValue());

                    //if user is null, cookie is invalidated
                    if (user == null) {
                        if (USERS_APP_URL.contains(serviceURL)) {
                            address = "/WEB-INF/pages/users_login.jsp";
                        } else { // DOCS_APP_URL
                            address = "/WEB-INF/pages/documents_login.jsp";
                        }

                        request.getSession().setAttribute("serviceURL", serviceURL);
                        RequestDispatcher dispatcher = request.getRequestDispatcher(address);
                        System.out.println("user je null, forwardam na: " + address);
                        dispatcher.forward(request, response);
                    }
                    //it may happen that the cookie belongs to a user who is not an admin and he logs in to the Users application while he is logged in Documents
                    //server will ignore his Cookie
                    else if ((USERS_APP_URL).contains(serviceURL) && !user.getRole().equals(Role.A)) {
                        address = "/WEB-INF/pages/users_login.jsp";
                        RequestDispatcher dispatcher = request.getRequestDispatcher(address);
                        dispatcher.forward(request, response);
                    } else {
                        redirectToServiceWithOtp(response, serviceURL, user.getUsername());
                    }
                    //response.sendRedirect("https://localhost:8443/");
                } else { /*user is not logged in, send redirect to *_login.jsp */

                    if (USERS_APP_URL.contains(serviceURL)) {
                        address = "/WEB-INF/pages/users_login.jsp";
                    } else { // DOCS_APP_URL
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

        } catch (Exception e) {
            //catch all remaining exceptions
            e.printStackTrace();
            request.getSession().setAttribute("errorMessage", "An error occurred while performing action!");
            try {
                errorDispatcher.forward(request, response);
            } catch (ServletException ex) {
                response.setStatus(500);
            } catch (IOException ex) {
                response.setStatus(500);
            }
        }
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        doGet(request, response);
    }


    private void generateOtp(HttpServletResponse response, User user, String serviceURL) throws SQLException, IOException {


        //user is logged id, generating cookie
        Cookie cookie = new Cookie(COOKIE_NAME, DatatypeConverter.printHexBinary(PasswordUtil.generateSecureRandom(16)));
        cookie.setMaxAge(30 * 60);
        cookie.setPath("/");

        //set Cookie and Username to hash map
        cookieService.put(cookie.getValue(), user);

        response.addCookie(cookie);

        redirectToServiceWithOtp(response, serviceURL, user.getUsername());
        // response.sendRedirect(serviceURL + "?action=" + OTP_AUTH_ACTION);

    }

    private void redirectToServiceWithOtp(HttpServletResponse response, String serviceURL, String username) throws IOException {
        // generate otp and send it as url parameter to service
        String otp = DatatypeConverter.printHexBinary(PasswordUtil.generateSecureRandom(16)) + new Date().getTime();

        //put otp to map
        otpService.putOtp(otp, username);

        response.sendRedirect(serviceURL + "?action=" + OTP_AUTH_ACTION + "&otp=" + otp);
    }

    private void forwardToTokenPage(User user, String serviceURL, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, SQLException {
        String address;
        if (user != null) {
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

        } else {
            request.getSession().setAttribute("notification", "Invalid username or password, or access is denied!");
            if (USERS_APP_URL.contains(serviceURL)) {
                address = "/WEB-INF/pages/users_login.jsp";
            } else { // DOCS_APP_URL
                address = "/WEB-INF/pages/documents_login.jsp";
            }
        }
        RequestDispatcher dispatcher = request.getRequestDispatcher(address);
        dispatcher.forward(request, response);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        doGet(req, resp);
    }
}
