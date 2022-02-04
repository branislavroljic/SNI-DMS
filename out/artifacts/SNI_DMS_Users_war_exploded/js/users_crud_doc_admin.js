

function editDocAdmin(ctl){
    console.log("bio u edit doc");
    let Id = $(ctl).parents("tr").children()[0].innerHTML;
    let username = $(ctl).parents("tr").children()[2].innerHTML;
    let rootDir = $(ctl).parents("tr").children()[3].innerHTML;

    let elements = document.getElementById("new_doc_admin_form").elements;
    elements.username.value = username;
    elements.root_dir.value = rootDir;

    let dialog = document.getElementById("dialog_doc_admin");
    $("#edit_doc_admin_confirm").off('click').on('click', function () {
        updateDocAdmin(ctl, Id);
    });
    $("#edit_doc_admin_confirm").show();
    $("#add_doc_admin_confirm").hide('fast');
    $("#doc_admin_root_dir").css("display", "none");
    dialog.showModal();
}


$(function () {
    let docAdminDialog = document.getElementById("dialog_doc_admin");
    if (!docAdminDialog.showModal) {
        dialogPolyfill.registerDialog(docAdminDialog);
    }
});

$(function () {
    $("#add-doc-admin").click(function () {
        let dialog = document.getElementById("dialog_doc_admin");
        resetForm();
        $("#add_doc_admin_confirm").show();
        $("#edit_doc_admin_confirm").hide('fast');
        $("#doc_admin_root_dir").css("display", "block");
        dialog.showModal();
    });
});

$(function (){
    $("#add_doc_admin_confirm").click(function () {addDocAdmin();});
})

$(function () {
    let dialog = document.getElementById("dialog_doc_admin");
    dialog.querySelector('.close').addEventListener('click', function() {
        document.getElementById("new_doc_admin_form").reset();
        dialog.close();
    });
});


function addDocAdmin() {
    let new_doc_admin_form = $("#new_doc_admin_form");
    new_doc_admin_form.validate();
    if (!new_doc_admin_form.valid())
        return;
    console.log("doc admin form is valid");
            $.ajax({
                type: "POST",
                url: "?action=add_doc_admin",
                data: new_doc_admin_form.serialize(),
                cache: false,
                success: function (jsonText) {
                    console.log("bio ovdje");
                    let newDocAdmin = jsonText;

                    console.log(newDocAdmin);
                    document.getElementById("doc_admin_tbody").innerHTML += "<tr>\n" +
                        "                <td style=\"display: none;\">" + newDocAdmin.id + "</td>\n" +
                        "                <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "                    <button type=\"button\" onclick=\"editDocAdmin(this)\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "                        <i class=\"material-icons\">edit</i>\n" +
                        "                    </button>\n" +
                        "                </td>\n" +
                        "            <td class=\"mdl-data-table__cell--non-numeric\">" + newDocAdmin.username + "</td>\n" +
                        "            <td class=\"mdl-data-table__cell--non-numeric\">" + newDocAdmin.rootDir + "</td>\n" +
                        "                <td>\n" +
                        "                    <button type=\"button\" onclick=\"deleteUser(this)\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "                        <i class=\"material-icons\">delete</i>\n" +
                        "                    </button>\n" +
                        "                </td>\n" +
                        "            </tr>";

                    var notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                        {
                            message: "Document admin successfully added!"
                        }
                    );
                    let dialog = document.getElementById("dialog_doc_admin");
                    dialog.close();
                },
                error: function () {
                    let notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                        {
                            message: "Adding document admin failed!"
                        }
                    );
                }

            });


}


function updateDocAdmin(ctl, Id){
    console.log("Inside editClient(ctl, id)")
    let new_doc_admin_form= $("#new_doc_admin_form");
    new_doc_admin_form.validate();
    if(!new_doc_admin_form.valid())
        return;
    $.ajax({
        type: "POST",
        url: "?action=edit_doc_admin&Id=" + Id,
        data: new_doc_admin_form.serialize(),
        cache: false,
        success: function (jsonText) {
            console.log("bio ovdje");
            let updatedClient = jsonText;

            $(ctl).parents("tr").children()[0].innerHTML = Id;
            $(ctl).parents("tr").children()[2].innerHTML = updatedClient.username;
            $(ctl).parents("tr").children()[3].innerHTML = updatedClient.rootDir;
            var notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Document admin sucessfully updated!"
                }
            );
            let dialog = document.getElementById("dialog_doc_admin");
            dialog.close();
        },
        error: function () {
            let notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Update failed!"
                }
            );
        }

    });
}

function resetForm(){
    document.getElementById("new_doc_admin_form").reset();
}