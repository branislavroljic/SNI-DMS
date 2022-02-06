<%--&lt;%&ndash;--%>
<%--  Created by IntelliJ IDEA.--%>
<%--  User: legion--%>
<%--  Date: 2/6/2022--%>
<%--  Time: 8:36 AM--%>
<%--  To change this template use File | Settings | File Templates.--%>
<%--&ndash;%&gt;--%>
<%--<%@ page contentType="text/html;charset=UTF-8" language="java" %>--%>

<html>
<head>
    <meta name="google-signin-client_id"
          content="351922003621-rsallgk461e3i3oo8js07rgg0qa5gf2k.apps.googleusercontent.com">
</head>
<body>
<script>
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            return true;
        });
    }

    function onLoad() {
        gapi.load('auth2', function() {
            gapi.auth2.init();
        });
    }
</script>
<a href="?action=google_sign_out" onclick="signOut();">Sign out</a>

<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
</body>
</html>