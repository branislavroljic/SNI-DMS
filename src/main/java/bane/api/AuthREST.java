package bane.api;

import bane.model.User;
import bane.request.JwtTokenRequest;
import bane.request.LoginCheckRequest;
import bane.service.CookieService;
import bane.service.OTPService;
import bane.util.JWTUtil;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;

@Path("/tokens")
public class AuthREST {

    private OTPService otpService = OTPService.getInstance();
    private CookieService cookieService = CookieService.getInstance();

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJWT(JwtTokenRequest jwtTokenRequest) {
        //System.out.println("URL : " + jwtTokenRequest.getServiceURL());
        System.out.println(jwtTokenRequest.getOtp());
        //File privKeyFile = new File(getClass().getClassLoader().getResource("../keys/auth_priv.key").getPath()); ne nadje fajl
        File privKeyFile = new File("C:\\Users\\legion\\Desktop\\IV godina BANE\\Sigurnost na Internetu\\auth_priv.pem");
        String username = otpService.getUsernamelByOtp(jwtTokenRequest.getOtp());
        if (username != null) {

            try {
                String jwt = JWTUtil.getJWT(username, privKeyFile);
                return Response.status(Response.Status.OK).entity(jwt).build();
            } catch (Exception e) {
                e.printStackTrace();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }

        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Username not found!").build();
        }
    }

    @POST
    @Path(("/login_check"))
    @Consumes(MediaType.APPLICATION_JSON)
    public Response isLoggedIn(LoginCheckRequest loginCheckRequest) {

        System.out.println("EVO ME U REST, username je: " + loginCheckRequest);
        if (cookieService.getCookieUserMap().values().stream()
                .anyMatch(u -> u.getUsername().equals(loginCheckRequest.getUsername()))) {
            return Response.ok().build();
        }
        return Response.status(Response.Status.NOT_FOUND).entity("User  was not found!").build();
    }
}
