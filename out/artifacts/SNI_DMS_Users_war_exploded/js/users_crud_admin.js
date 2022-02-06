function editAdmin(ctl) {

    let Id = $(ctl).parents("div").children()[0].innerHTML;
    let username = $($(ctl).parents("div").children()[1]).children()[1].innerHTML

    let elements = document.getElementById("new_admin_form").elements;

    $('#admin_username').val(username);
    $('#admin_username').parent().addClass('is-dirty')
    $('#admin_password').val('');
    $('#admin_mail').val('');

    let dialog = document.getElementById("dialog_admin");
    $("#edit_admin_confirm").off('click').on('click', function () {
        updateAdmin(ctl, Id);
    });
    $("#edit_admin_confirm").show();
    $("#add_admin_confirm").hide('fast');
    $("#admin_root_dir").css("display", "none");
    dialog.showModal();
}


$(function () {
    let adminDialog = document.getElementById("dialog_admin");
    if (!adminDialog.showModal) {
        dialogPolyfill.registerDialog(adminDialog);
    }
});

$(function () {
    $("#add-admin").click(function () {
        let dialog = document.getElementById("dialog_admin");
        resetForm();
        $("#add_admin_confirm").show();
        $("#edit_admin_confirm").hide('fast');
        $("#admin_root_dir").css("display", "block");
        dialog.showModal();
    });
});

$(function () {
    $("#add_admin_confirm").click(function () {
        addAdmin();
    });
})

$(function () {
    let dialog = document.getElementById("dialog_admin");
    dialog.querySelector('.close').addEventListener('click', function () {
        document.getElementById("new_admin_form").reset();
        dialog.close();
    });
});


function addAdmin() {
    let new_admin_form = $("#new_admin_form");
    new_admin_form.validate();
    if (!new_admin_form.valid())
        return;
    console.log("admin form is valid");
    $.ajax({
        type: "POST",
        url: "?action=add_admin",
        data: new_admin_form.serialize(),
        cache: false,
        success: function (jsonText) {
            console.log("bio ovdje");
            let newAdmin = jsonText;

            console.log(newAdmin);
            document.getElementById("admin-list").innerHTML += "<div class=\"mdl-list__item\">\n" +
                "            <span style=\"display : none\">" + newAdmin.id + "</span>\n" +
                "            <span class=\"mdl-list__item-primary-content\">\n" +
                "  <i class=\"material-icons mdl-list__item-icon\">person</i>\n" +
                "          <span>" + newAdmin.username + "</span>\n" +
                "        </span>\n" +
                "            <button type=\"button\" onclick=\"editAdmin(this)\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                "                <i class=\"material-icons\">edit</i>\n" +
                "            </button>\n" +
                "            <button type=\"button\" onclick=\"deleteUser(this,'" + newAdmin.username + "', " + newAdmin.id + " )\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                "                <i class=\"material-icons\">delete</i>\n" +
                "            </button>\n" +
                "        </div>";

            var notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Admin successfully added!"
                }
            );
            let dialog = document.getElementById("dialog_admin");
            dialog.close();
        },
        error: function (errorResponse) {
            if (errorResponse.status == 401) {
                location.href = "https://localhost:8443/SSO_Auth_Server_war_exploded/?serviceURL=https://localhost:8443/SNI_DMS_Users_war_exploded";
            } else if (errorResponse.status == 400) {
                alert(errorResponse.responseText);
            } else {
                alert("Add admin failed!")
            }
        }

    });
}


function updateAdmin(ctl, Id) {
    console.log("Inside editAdmin(ctl, id)")
    let new_admin_form = $("#new_admin_form");
    new_admin_form.validate();
    if (!new_admin_form.valid())
        return;
    $.ajax({
        type: "POST",
        url: "?action=edit_admin&Id=" + Id,
        data: new_admin_form.serialize(),
        cache: false,
        success: function (jsonText) {
            console.log("bio ovdje");
            let updatedAdmin = jsonText;

            $(ctl).parents("div").children()[0].innerText = Id;
            $($(ctl).parents("div").children()[1]).children()[1].innerText = updatedAdmin.username;
            var notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Admin sucessfully updated!"
                }
            );
            let dialog = document.getElementById("dialog_admin");
            dialog.close();
        },
        error: function (errorResponse) {
            if (errorResponse.status == 401) {
                location.href = "https://localhost:8443/SSO_Auth_Server_war_exploded/?serviceURL=https://localhost:8443/SNI_DMS_Users_war_exploded";
            }
            else if (errorResponse.status == 400) {
                alert(errorResponse.responseText);
            } else {
                alert("Edit admin failed!")
            }
        }

    });
}

function resetForm() {
    $('#admin_username').val('');
    $('#admin_username').parent().removeClass('is-dirty');
    $('#admin_password').val('');
    $('#admin_mail').val('');
}