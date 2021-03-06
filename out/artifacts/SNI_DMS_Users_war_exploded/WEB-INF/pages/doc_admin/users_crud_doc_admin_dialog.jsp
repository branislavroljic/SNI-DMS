<%-- Doc Admin input dialog --%>
<dialog id="dialog_doc_admin" class="mdl-dialog">
  <h3 class="mdl-dialog__title">MDL Dialog</h3>
  <div class="mdl-dialog__content">
    <form id="new_doc_admin_form">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" name="username" id="doc_admin_username" pattern="^[a-zA-Z0-9 .-]+${3}" required>
        <label class="mdl-textfield__label" for="doc_admin_username">Username</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="password" name="password" id="doc_admin_password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$" required/>
        <label class="mdl-textfield__label" for="doc_admin_password">Password</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="email" name="mail" id="doc_admin_mail" required>
        <label class="mdl-textfield__label" for="doc_admin_mail">E-mail</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" name="root_dir" id="doc_admin_root_dir" >
        <label class="mdl-textfield__label" for="doc_admin_root_dir">Root directory (relative path)</label>
      </div>
    </form>
  </div>
  <div class="mdl-dialog__actions">
    <button type="button"  class="mdl-button close">Close</button>
    <button type="submit" id="add_doc_admin_confirm" class="mdl-button">Save</button>
    <button type="submit" id="edit_doc_admin_confirm" class="mdl-button">Save</button>
  </div>
</dialog>
