<%--
  Created by IntelliJ IDEA.
  User: legion
  Date: 12. 1. 2022.
  Time: 20:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="styles/login.css"></link>
    <%--needed for google auth--%>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="js/login_auth.js"></script>
    <meta name="google-signin-client_id" content="351922003621-rsallgk461e3i3oo8js07rgg0qa5gf2k.apps.googleusercontent.com">
</head>
<body>
<div class="mdl-layout mdl-js-layout main-div" >

    <section class="container">
            <div class="mdl-card mdl-shadow--2dp through mdl-shadow--16dp">
                <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
                    <h2 class="mdl-card__title-text">Simple Login</h2>
                </div>

                <div class="mdl-card__supporting-text">
                <form method="POST" action="?action=login">
                    <input type="hidden" name="serviceURL" value=<%= session.getAttribute("serviceURL") %>>  <%--moram ocuvati serviceURL zbog redirecta--%>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-empty">
                        <input class="mdl-textfield__input" id="username" name="username" autofocus/>
                        <label class="mdl-textfield__label" for="username">Username</label>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-empty">
                        <input class="mdl-textfield__input" type="password" id="password" name="password"/>
                        <label class="mdl-textfield__label" for="password">Password</label>
                        <span class="error-span"><%=session.getAttribute("notification")!=null?session.getAttribute("notification").toString():""%></span>
                    </div>

                    <button type="submit" class="mdl-cell mdl-cell--12-col mdl-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
                        Login
                    </button>
                </form>
                </div>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
</section>
</div>

</body>
</html>