<dialog id="dialog_create_dir" class="mdl-dialog">
    <h3 class="mdl-dialog__title">MDL Dialog</h3>
    <div class="mdl-dialog__content">
        <form id="new_dir_form">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="dirName" id="dir_name" required>
                <label class="mdl-textfield__label" for="dir_name">Directory name</label>
            </div>
        </form>
    </div>
    <div class="mdl-dialog__actions">
        <button type="button"  class="mdl-button close">Close</button>
        <button type="submit" id="crate_dir_confirm" class="mdl-button">Save</button>
    </div>
</dialog>
