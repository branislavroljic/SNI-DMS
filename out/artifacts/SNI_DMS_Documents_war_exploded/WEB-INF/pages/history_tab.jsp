<%@ page import="bane.model.History" %><%--
  Created by IntelliJ IDEA.
  User: legion
  Date: 2/4/2022
  Time: 11:57 PM
  To change this template use File | Settings | File Templates.
--%>

<%--    Client tab      --%>
<button id="refresh-button" type="button"
        class="dialog-button fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
    <i class="material-icons">get_app</i>
</button>

<div class="mdl-tabs__panel is-active" id="history-tab">
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--4dp">
        <thead>
        <tr>
            <th class="mdl-data-table__cell--non-numeric">File</th>
            <th class="mdl-data-table__cell--non-numeric">User</th>
            <th class="mdl-data-table__cell--non-numeric">Type</th>
            <th class="mdl-data-table__cell--non-numeric">Time</th>
        </tr>
        </thead>
        <tbody id="history_tbody">
        <% for (History h : history){
        %>
        <tr>
            <td class="mdl-data-table__cell--non-numeric"><%= h.getFileName() %></td>
            <td class="mdl-data-table__cell--non-numeric"><%= h.getUsername()%></td>
            <td class="mdl-data-table__cell--non-numeric"><%= h.getType() %></td>
            <td class="mdl-data-table__cell--non-numeric"><%= h.getTime() %></td>
        </tr>
        <%
        }%>

        </tbody>
    </table>
</div>