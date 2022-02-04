<%@ page import="bane.model.User" %>
<%@ page import="bane.model.Role" %>

<div class="mdl-tabs__panel" id="admins-tab">
    <button id="add-admin"
    class="fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
        <i class="material-icons">add</i>
    </button>


    <div class="card-container mdl-card mdl-shadow--2dp">
        <div class="mdl-card__supporting-text">
    <div class="demo-list-action mdl-list admin-list" id="admin-list">
        <% for (User u : users){
            if(u.getRole().equals(Role.A)){
        %>
        <div class="mdl-list__item">
            <span style="display : none"><%= u.getId()%></span>
            <span class="mdl-list__item-primary-content">
  <i class="material-icons mdl-list__item-icon">person</i>
          <span><%= u.getUsername()%></span>
        </span>
            <button type="button" onclick="editAdmin(this)" class="mdl-button mdl-js-button mdl-button--icon">
                <i class="material-icons">edit</i>
            </button>
            <button type="button" onclick="deleteUser(this,  <%= u.getId() %>)" class="mdl-button mdl-js-button mdl-button--icon">
                <i class="material-icons">delete</i>
            </button>
        </div>
        <%}
        } %>

    </div>
        </div>
    </div>
</div>