<%@ page import="bane.model.User" %>
<%@ page import="bane.model.Role" %>
<%@ page import="org.owasp.encoder.Encode" %>

<%--    Client tab      --%>

<div class="mdl-tabs__panel is-active" id="clients-tab">
  <button id="add-client"
          class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
    <i class="material-icons">add</i>
  </button>
  <table class="mdl-data-table mdl-js-data-table mdl-shadow--4dp">
    <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Edit</th>
      <th class="mdl-data-table__cell--non-numeric">Username</th>
      <th class="mdl-data-table__cell--non-numeric">E-mail</th>
      <th class="mdl-data-table__cell--non-numeric">Root directory</th>
      <th class="mdl-data-table__cell--non-numeric">IP Address</th>
      <th class="mdl-data-table__cell--non-numeric">Permissions</th>
      <th>Delete</th>
    </tr>
    </thead>
    <tbody id="client_tbody">
    <% for (User u : users){
      if(u.getRole().equals(Role.C)){
    %>
    <tr>
      <td name="Id" style="display: none;"><%= Encode.forHtmlContent(u.getId() + "")%></td>
      <td class="mdl-data-table__cell--non-numeric">
        <button type="button" onclick="editClient(this)" class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">edit</i>
        </button>
      </td>
      <td name="username" class="mdl-data-table__cell--non-numeric"><%= Encode.forHtmlContent(u.getUsername())%></td>
      <td name="username" class="mdl-data-table__cell--non-numeric"><%= Encode.forHtmlContent(u.getMail())%></td>
      <td class="mdl-data-table__cell--non-numeric"><%= Encode.forHtmlContent(u.getRootDir().toString())%></td>
      <td class="mdl-data-table__cell--non-numeric"><%= Encode.forHtmlContent(u.getIpAddress())%></td>
      <td class="mdl-data-table__cell--non-numeric"><%= Encode.forHtmlContent(u.getPermissions())%></td>
      <td>
        <button type="button" onclick="deleteUser(this, '<%= Encode.forHtmlContent(u.getUsername())%>', <%= Encode.forHtmlContent(u.getId() + "") %>)" class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">delete</i>
        </button>
      </td>
    </tr>
    <% }
    }%>

    </tbody>
  </table>
</div>