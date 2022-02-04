<%@ page import="java.io.File" %>
<%@ page import="java.nio.file.Path" %>
<%@ page import="java.nio.file.attribute.BasicFileAttributes" %>
<%@ page import="java.nio.file.Files" %><%--
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
</head>
<body>

<%--TOAST--%>
<div aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-snackbar mdl-js-snackbar">
    <div class="mdl-snackbar__text"></div>
    <button type="button" class="mdl-snackbar__action"></button>
</div>

<div class="demo-layout-waterfall mdl-layout mdl-js-layout">
    <header class="mdl-layout__header mdl-layout__header--waterfall">
        <!-- Top row, always visible -->
        <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">Title</span>
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                        mdl-textfield--floating-label mdl-textfield--align-right">

                <div class="mdl-textfield__expandable-holder">
                    <input class="mdl-textfield__input" type="text" name="sample"
                           id="waterfall-exp">
                </div>
            </div>
        </div>
        <!-- Bottom row, not visible on scroll -->
        <div class="mdl-layout__header-row">
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation -->
            <nav class="mdl-navigation">
                <a class="mdl-navigation__link" href="?action=logout">Logout</a>
            </nav>
        </div>
    </header>
    <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Title</span>
        <nav class="mdl-navigation">
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
        </nav>
    </div>
    <main class="mdl-layout__content">
        <div class="page-content">
            <%--back float button--%>
            <button id="back-button" type="button" onclick="backButtonClick('<%=user.getPermissions()%>', '<%=user.getRole() %>' )"
                    class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                <i class="material-icons">arrow_back</i>
            </button>

                <button id="move-here-button" type="button"
                        class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                    <i class="material-icons">get_app</i>
                </button>
                <button id="cancel-move-button" type="button"
                        class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                    <i class="material-icons">file_download_off</i>
                </button>

            <%--current direcotry --%>
            <h3 class="currentDir" id="curr-dir-text"></h3>

            <%--upload float button--%>
            <form enctype="multipart/form-data" id="file-upload-form">
                <input type="file" name="file" id="fileInput" style="display: none">
                <button id="upload-file-button" type="button"
                        class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                    <i class="material-icons">file_upload</i>
                </button>
            </form>

                <form enctype="multipart/form-data" id="file-update-form">
                    <input type="file" name="file" id="fileUpdateInput" style="display: none">
                </form>
            <%--create dir float button --%>
            <button id="create-dir-button" type="button"
                    class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                <i class="material-icons">create_new_folder</i>
            </button>

            <%--include dialog to create dir--%>
            <%@include file="dialogs/create_dir_dialog.jsp" %>

            <%--include dialog to move file--%>
            <%@include file="dialogs/move_file_dialog.jsp" %>

            <div class="content">
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--4dp">
                    <thead>
                    <tr>
                        <th class="mdl-data-table__cell--non-numeric"></th>
                        <th class="mdl-data-table__cell--non-numeric">Name</th>
                        <th class="mdl-data-table__cell--non-numeric">Last modified time</th>
                        <th class="mdl-data-table__cell--non-numeric">Size</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody id="files-tbody">

                    <%
                        for (File file : user.getRootDir().listFiles()) {
                            Path fileAsPath = file.toPath();
                            BasicFileAttributes attrs = Files.readAttributes(fileAsPath, BasicFileAttributes.class);
                    %>

                    <tr>
                        <%--<td name="fileName" class="mdl-data-table__cell--non-numeric" >
                            <i class="material-icons"><%= file.isDirectory()?"folder":"description"%></i>
                        </td>--%>
                        <% if (file.isDirectory()) {%>
                        <td>
                            <%-- <form action="javascript:listFiles(<%=file.getName() %>)" id=<%= file.getName()%> method="post">
                                 <button type="submit" class="mdl-button mdl-js-button mdl-button--icon">
                                     <i class="material-icons">folder</i>
                                 </button>
                             </form>--%>
                            <button type="button" onclick="listFiles('<%= user.getRootDir().toPath().relativize(file.toPath()).toString() %>', '<%=user.getPermissions()%>', '<%=user.getRole() %>' )"
                                    class="mdl-button mdl-js-button mdl-button--icon">
                                <i class="material-icons">folder</i>
                            </button>
                        </td>
                        <% } else {%> <%--it's a file--%>
                        <td>
                            <form action=<%="?action=download_file&file=" + file.getName() %> id=<%= file.getName()%>
                                  method="post">
                                <button type="submit" class="mdl-button mdl-js-button mdl-button--icon">
                                    <i class="material-icons">description</i>
                                </button>
                            </form>
                        </td>
                        <%} %>
                        <td name="filename" class="mdl-data-table__cell--non-numeric"><%= file.getName() %>
                        </td>
                        <td class="mdl-data-table__cell--non-numeric"><%= attrs.lastModifiedTime() %>
                        </td>
                        <td class="mdl-data-table__cell--non-numeric"><%= Math.round(attrs.size() / 1000.0) / 100.0 + "KB" %>
                        </td>
                        <% if (!file.isDirectory()) {%>
                        <td>
                            <button onclick="updateFileClick(this)" type="button"
                                    class="mdl-button mdl-js-button mdl-button--icon">
                                <i class="material-icons">upload_file</i>
                            </button>
                        </td>
                        <td>
                            <button onclick="moveFileClick('<%= user.getRootDir().toPath().relativize(file.toPath()).toString() %>' )" type="button"
                                    class="mdl-button mdl-js-button mdl-button--icon">
                                <i class="material-icons">drive_file_move</i>
                            </button>
                        </td>
                        <%} else {%>
                        <td></td>
                        <td></td>
                        <% } %>
                        <td>
                            <button onclick="deleteFileClick(this, '<%= file.getName() %>' )" type="button"
                                    class="mdl-button mdl-js-button mdl-button--icon">
                                <i class="material-icons">delete</i>
                            </button>
                        </td>
                    </tr>
                    <%
                        }%>

                    </tbody>
                </table>
            </div>
        </div>
    </main>
</div>
</body>
</html>
