<%--
  Created by IntelliJ IDEA.
  User: legion
  Date: 2/1/2022
  Time: 6:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Token</title>
    <title>Login</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
</head>
<body>
<div class="mdl-layout mdl-js-layout main-div" >

    <section class="container">
        <div class="mdl-card mdl-shadow--2dp through mdl-shadow--16dp">
            <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
                <h2 class="mdl-card__title-text">Login</h2>
            </div>

            <div class="mdl-card__supporting-text">
                <form method="POST" action="?action=token_login">

                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty is-empty">
                        <input class="mdl-textfield__input" id="token" name="token" autofocus/>
                        <label class="mdl-textfield__label" for="token">Token</label>
                    </div>
                    <span class="error-span"><%=session.getAttribute("notification")!=null?session.getAttribute("notification").toString():""%></span>
                    <button type="submit" class="mdl-cell mdl-cell--12-col mdl-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
                        Submit token
                    </button>
                </form>
            </div>
        </div>
    </section>
</div>


</body>
</html>
