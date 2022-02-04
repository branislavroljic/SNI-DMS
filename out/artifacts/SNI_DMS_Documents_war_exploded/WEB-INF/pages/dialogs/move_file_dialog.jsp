<%@ page import="java.io.File" %>
<dialog id="dialog_move_file" class="mdl-dialog">
    <h3 class="mdl-dialog__title">Select destination folder</h3>
    <div class="mdl-dialog__content" id="dialog-content">
        <div class="demo-list-action mdl-list" id="dir-list">
            <% for (File file : currentDir.listFiles()) {
                if (file.isDirectory()) {
            %>
            <div class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <button type="button" onclick="post('?action=list_files',{ 'fileName' : '<%= file.getName() %>'})"
                            class="mdl-button mdl-js-button mdl-button--icon">
                      <i class="material-icons mdl-list__item-icon">folder</i>
                    </button>
                 <span><%= file.getName() %></span>
                  </span>
            </div>
            <%
                    }
                }
            %>

        </div>
    </div>
    <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close">Close</button>
        <button type="submit" id="move_file_confirm" class="mdl-button">Save</button>
    </div>
</dialog>
