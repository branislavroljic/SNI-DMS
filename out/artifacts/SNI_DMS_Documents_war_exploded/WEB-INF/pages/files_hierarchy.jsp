<%@ page import="java.io.File" %>
<%@ page import="java.nio.file.Path" %>
<%@ page import="java.nio.file.attribute.BasicFileAttributes" %>
<%@ page import="java.nio.file.Files" %>
<%@ page import="bane.model.Role" %><%--
  Created by IntelliJ IDEA.
  User: legion
  Date: 1/30/2022
  Time: 1:21 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="currentDir" type="java.io.File"
             scope="session"></jsp:useBean>   <%--TREBA LI OVDJE MZD SCOPE = REQUEST--%>
<jsp:useBean id="user" type="bane.model.User" scope="session"></jsp:useBean>
<html>
<head>
    <title>Files</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script src="js/files.js"></script>
    <script src="js/create_dir_dialog.js"></script>
    <script src="js/move_file_dialog.js"></script>
    <link rel="stylesheet" href="styles/dialog-polyfill.css"></link>
    <link rel="stylesheet" href="styles/files.css"></link>
    <link rel="stylesheet" href="styles/create_dir_dialog.css"></link>
    <%--dialog polyfill--%>
    <script src="js/dialog-polyfill.js"></script>
    <link rel="stylesheet" href="styles/dialog-polyfill.css"></link>

    <%--    <%@ taglib tagdir="/WEB-INF/tags" prefix="fileTags" %>--%>
</head>
<body>

<%--TOAST--%>
<div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-snackbar mdl-js-snackbar">
    <div class="mdl-snackbar__text"></div>
    <button type="button" class="mdl-snackbar__action"></button>
</div>

<%--User cannot upload files if he does not have C(craete) permission--%>
<% if(user.getPermissions().contains("C")){%>
<%--upload float button--%>
<form enctype="multipart/form-data" id="file-upload-form">
    <input type="file" name="file" id="fileInput" style="display: none">
    <button id="upload-file-button" type="button"
            class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
        <i class="material-icons">file_upload</i>
    </button>
</form>
<%}%>

<%--Client cannot create directory or move files--%>
<% if(!user.getRole().equals(Role.C)){%>

<%--create dir float button --%>
<button id="create-dir-button" type="button" style="visibility:"
        class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
    <i class="material-icons">create_new_folder</i>
</button>
<%--include dialog to create dir--%>
<%@include file="dialogs/create_dir_dialog.jsp" %>

<%--include dialog to move file--%>
<%@include file="dialogs/move_file_dialog.jsp" %>

<%}%>


<div class="mdl-list" id="file-list">
    <%
        for (File file : currentDir.listFiles()) {
    %>

    <div class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
             <span style="display : none"><%= currentDir.toPath().resolve(file.toPath()) %></span>
            <% if (file.isDirectory()) {%>
            <button type="button" onclick="listFiles(this, '<%= user.getPermissions() %>', '<%= user.getRole().name() %>')"
                    class="mdl-button mdl-js-button mdl-button--icon">
                <i class="material-icons">folder</i>
            </button>
            <%--Client cannot download file wihtout R permission--%>
            <% } else if(user.getPermissions().contains("R")){%>
            <form action=<%="?action=download_file&file=" + file.getName() %> id=<%= file.getName()%> method="post">
                <button type="submit" class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">description</i>
                </button>
            </form>
            <%} %>
            <span><%= file.getName() %> </span>
            <span class="mdl-list__item-sub-title"> <%= Math.round(file.length() / 1000.0) / 100.0 + "KB" %> </span>
        </span>
        <span class="mdl-list__item-secondary-content">
            <% if (!file.isDirectory()) {
                if(user.getPermissions().contains("U")) {%>
            <button onclick="updateFileClick(this)" type="button"
                    class="mdl-button mdl-list__item-secondary-action mdl-js-button mdl-button--icon">
                <i class="material-icons">upload_file</i>
            </button>
            <%}%>
            <% if(!user.getRole().equals(Role.C)) {%>
                    <button onclick="moveFileClick(this, '<%= file.getName() %>' )" type="button"
                        class="mdl-button  mdl-list__item-secondary-action mdl-js-button mdl-button--icon">
                    <i class="material-icons">drive_file_move</i>
                </button>
            <%}%>
        <%}%>
            <% if(user.getPermissions().contains("D")){%>
            <button onclick="deleteFileClick(this, '<%= file.getName() %>' )" type="button"
                    class="mdl-button mdl-list__item-secondary-action mdl-js-button mdl-button--icon">
                <i class="material-icons">delete</i>
            </button>
            <%}%>
    </span>

    </div>
    <%
        }
    %>

</div>--%>
</body>
</html>
