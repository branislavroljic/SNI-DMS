
<%-- Client input dialog --%>
<dialog id="dialog_client" class="mdl-dialog">
    <div class="mdl-dialog__title">New Client</div>
    <div class="mdl-dialog__content">
        <form id="new_client_form">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="username" id="client_username" required autofocus>
                <label class="mdl-textfield__label" for="client_username">Username</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="password" name="password" id="client_password" required =required/>
                <label class="mdl-textfield__label" for="client_password">Password</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="ip_address" id="ip_address" pattern="(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)_*(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)_*){3}" required>
                <label class="mdl-textfield__label" for="ip_address">IP Address</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="root_dir" id="client_root_dir"  required>
                <label class="mdl-textfield__label" for="client_root_dir">Root directory (relative path)</label>
            </div>
            <div>
                <label >Permissions</label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="C">
                    <input type="checkbox" name="C" id="C" class="mdl-checkbox__input" checked>
                    <span class="mdl-checkbox__label">Create</span>
                </label>

                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="R">
                    <input type="checkbox" name="R" id="R" class="mdl-checkbox__input" checked>
                    <span class="mdl-checkbox__label">Retrieve</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="U">
                    <input type="checkbox" name="U" id="U" class="mdl-checkbox__input" checked>
                    <span class="mdl-checkbox__label">Update</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="D">
                    <input type="checkbox" name="D" id="D" class="mdl-checkbox__input" checked>
                    <span class="mdl-checkbox__label">Delete</span>
                </label>
            </div>
        </form>
    </div>
    <div class="mdl-dialog__actions">
        <button type="button"  class="mdl-button close">Close</button>
        <button type="submit" id="add_client_confirm" class="mdl-button">Save</button>
        <button type="submit" id="edit_client_confirm" class="mdl-button">Save</button>
    </div>
</dialog>
