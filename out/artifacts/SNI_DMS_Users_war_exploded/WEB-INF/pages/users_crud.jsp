<%@ page import="bane.model.User" %>
<%@ page import="bane.model.Role" %><%--
  Created by IntelliJ IDEA.
  User: legion
  Date: 12. 1. 2022.
  Time: 23:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="client/users_crud_client_dialog.jsp" %>

<%@include file="doc_admin/users_crud_doc_admin_dialog.jsp" %>

<%@include file="admin/users_crud_admin_dialog.jsp" %>
<jsp:useBean id="users" type="java.util.List<bane.model.User>" scope="application"></jsp:useBean>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="styles/users_crud.css"></link>
    <script src="js/users_crud_common.js"></script>
    <script src="js/users_crud_client.js"></script>
    <script src="js/users_crud_doc_admin.js"></script>
    <script src="js/users_crud_admin.js"></script>
    <script src="js/dialog-polyfill.js"></script>
    <link rel="stylesheet" href="styles/dialog-polyfill.css"></link>
</head>
<body>
<%--TOAST--%>
<div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-snackbar mdl-js-snackbar">
    <div class="mdl-snackbar__text"></div>
    <button type="button" class="mdl-snackbar__action"></button>
</div>

<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs">
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">Title</span>
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation. We hide it in small screens. -->
            <nav class="mdl-navigation mdl-layout--large-screen-only">
                <a class="mdl-navigation__link" href="?action=logout">Logout</a>
            </nav>
        </div>
        <!-- Tabs -->
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#fixed-tab-1" class="mdl-layout__tab is-active">Client</a>
            <a href="#fixed-tab-2" class="mdl-layout__tab">Document admin</a>
            <a href="#fixed-tab-3" class="mdl-layout__tab">Admin</a>
        </div>
    </header>
    <main class="mdl-layout__content">
        <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
            <div class="page-content"> <%@include file="client/users_crud_client_tab.jsp" %> </div>
        </section>
        <section class="mdl-layout__tab-panel" id="fixed-tab-2">
            <div class="page-content"> <%@include file="doc_admin/users_crud_doc_admin_tab.jsp" %></div>
        </section>
        <section class="mdl-layout__tab-panel" id="fixed-tab-3">
            <div class="page-content"> <%@include file="admin/users_crud_admin_tab.jsp" %></div>
        </section>
    </main>
</div>


</div>
</div>
</body>
</html>
