<%@ page import="java.nio.file.Path" %>
<%@ page import="java.nio.file.attribute.BasicFileAttributes" %>
<%@ page import="java.nio.file.Files" %>
<%@ page import="java.io.File" %>
<%@ page import="bane.model.Role" %>

<%--<main class="mdl-layout__content">--%>
<div class="page-content">
    <%--back float button--%>
    <button id="back-button" type="button"
            onclick="backButtonClick('<%= user.getPermissions()%>', '<%=user.getRole() %>' )"
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

    <% if (user.getPermissions().contains("C")) {%>
    <%--upload float button--%>
    <form enctype="multipart/form-data" id="file-upload-form">
        <input type="file" name="file" id="fileInput" style="display: none">
        <button id="upload-file-button" type="button"
                class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
            <i class="material-icons">file_upload</i>
        </button>
    </form>
        <%}%>
    <form enctype="multipart/form-data" id="file-update-form">
        <input type="file" name="file" id="fileUpdateInput" style="display: none">
    </form>


    <% if (user.getRole().equals(Role.DA)) {%>
    <%--create dir float button --%>
    <button id="create-dir-button" type="button"
            class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
        <i class="material-icons">create_new_folder</i>
    </button>
    <%}%>

    <%--include dialog to create dir--%>
    <%@include file="dialogs/create_dir_dialog.jsp" %>

    <%--        &lt;%&ndash;include dialog to move file&ndash;%&gt;--%>
    <%--        <%@include file="dialogs/move_file_dialog.jsp" %>--%>

    <div class="content">
        <table class="mdl-data-table mdl-js-data-table mdl-shadow--4dp">
            <thead>
            <tr>
                <th class="mdl-data-table__cell--non-numeric"></th>
                <th class="mdl-data-table__cell--non-numeric">Name</th>
                <th class="mdl-data-table__cell--non-numeric">Last modified time</th>
                <th class="mdl-data-table__cell--non-numeric">Size(KB)</th>
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
                    <button type="button"
                            onclick="listFiles('<%= user.getRootDir().toPath().relativize(file.toPath()).toString() %>', '<%=user.getPermissions()%>', '<%=user.getRole() %>' )"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">folder</i>
                    </button>
                </td>
                <%--it's a file--%>
                <% } else {%>
                <td>
                    <form
                            <% if (user.getPermissions().contains("R")) {%>
                            action=<%="?action=download_file&file=" + file.getName() %>
                                <%}%>
                                    id=<%= file.getName()%>
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
                <td class="mdl-data-table__cell--non-numeric"><%= Math.round(file.length() / 1000.0) / 100.0 + "KB" %>
                </td>
                <% if (!file.isDirectory()) {%>
                <% if (user.getPermissions().contains("U")) {%>
                <td>
                    <button onclick="updateFileClick(this)" type="button"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">upload_file</i>
                    </button>
                </td>
                <%} else {%>
                <td></td>
                <% } %>
                <% if (user.getRole().equals(Role.DA)) {%>
                <td>
                    <button onclick="moveFileClick('<%= user.getRootDir().toPath().relativize(file.toPath()).toString() %>' )"
                            type="button"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">drive_file_move</i>
                    </button>
                </td>
                <%} else {%>
                <td></td>
                <% } %>
                <%} else {%>
                <td></td>
                <td></td>
                <% } %>
                <% if (user.getPermissions().contains("D") && !file.isDirectory() || user.getRole().equals(Role.DA)) {%>
                <td>
                    <button onclick="deleteFileClick(this, '<%= file.getName() %>' )" type="button"
                            class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">delete</i>
                    </button>
                </td>
                <%} else {%>
                <td></td>
                <% } %>
            </tr>
            <%
                }%>

            </tbody>
        </table>
    </div>
</div>
<%--
</main>--%>