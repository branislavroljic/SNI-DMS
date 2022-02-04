<%@ page import="bane.model.User" %>
<%@ page import="bane.model.Role" %><%--document-admin tab--%>
<div class="mdl-tabs__panel" id="document-admins-tab">
    <button  id="add-doc-admin"
             class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
        <i class="material-icons">add</i>
    </button>
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--4dp">
        <thead>
        <tr>
            <th class="mdl-data-table__cell--non-numeric">Edit</th>
            <th class="mdl-data-table__cell--non-numeric">Username</th>
            <th class="mdl-data-table__cell--non-numeric">Root dir</th>
            <th >Delete</th>
        </tr>
        </thead>
        <tbody id="doc_admin_tbody">
        <% for (User u : users){
            if(u.getRole().equals(Role.DA)){
        %>
        <tr>
            <td style="display: none;"><%= u.getId()%></td>
            <td class="mdl-data-table__cell--non-numeric">
                <button type="button" onclick="editDocAdmin(this)" class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">edit</i>
                </button>
            </td>
            <td class="mdl-data-table__cell--non-numeric"><%= u.getUsername() %></td>
            <td class="mdl-data-table__cell--non-numeric"><%= u.getRootDir() %></td>
            <td>
                <button type="button"  onclick="deleteUser(this, '<%= u.getUsername()%>', <%= u.getId() %>)" class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        </tr>
        <% }
        }%>

        </tbody>
    </table>
</div>