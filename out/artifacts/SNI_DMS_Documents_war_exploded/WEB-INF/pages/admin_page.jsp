<%--
  Created by IntelliJ IDEA.
  User: legion
  Date: 2/4/2022
  Time: 11:52 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="history" type="java.util.List<bane.model.History>" scope="application"></jsp:useBean>
<jsp:useBean id="user" type="bane.model.User" scope="session"></jsp:useBean>
<html>
<head>
    <title>Documents</title>
    <head>
        <title>Title</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"></script>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
        <link rel="stylesheet" href="styles/dialog-polyfill.css"></link>
        <link rel="stylesheet" href="styles/files.css"></link>
        <script src="js/logout.js"></script>
        <script src="js/files.js"></script>
        <script src="js/history.js"></script>
    </head>
</head>
<body>

<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs">
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">Documents app</span>
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation. We hide it in small screens. -->
            <nav class="mdl-navigation">
                <a class="mdl-navigation__link" href="?action=logout">Logout</a>
            </nav>
        </div>
        <!-- Tabs -->
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#fixed-tab-1" class="mdl-layout__tab is-active">Documents</a>
            <a href="#fixed-tab-2" class="mdl-layout__tab">History</a>
        </div>
    </header>
    <main class="mdl-layout__content">
        <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
            <div class="page-content"> <%@include file="documents_tab.jsp" %> </div>
        </section>
        <section class="mdl-layout__tab-panel" id="fixed-tab-2">
            <div class="page-content"> <%@include file="history_tab.jsp" %></div>
        </section>
    </main>
</div>

</body>
</html>
