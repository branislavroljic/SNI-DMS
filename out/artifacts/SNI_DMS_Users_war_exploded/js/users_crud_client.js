

function editClient(ctl){
    console.log("Inside editClient(ctl)")
    let Id = $(ctl).parents("tr").children()[0].innerHTML;
    let username = $(ctl).parents("tr").children()[2].innerHTML;
    let mail = $(ctl).parents("tr").children()[3].innerHTML;
    let rootDir = $(ctl).parents("tr").children()[4].innerHTML;
    let ipAddress = $(ctl).parents("tr").children()[5].innerHTML;
    let permissions = $(ctl).parents("tr").children()[6].innerHTML;

    console.log(permissions);

    resetForm();
    let elements = document.getElementById("new_client_form").elements;

    $('#client_username').val(username);
    $('#client_username').parent().addClass('is-dirty')
    $('#client_mail').val(mail);
    $('#client_mail').parent().addClass('is-dirty')
    $('#client_ip_address').val(ipAddress);
    $('#client_ip_address').parent().addClass('is-dirty')
    $('#client_password').val('');
    $('#client_root_dir').val(rootDir);
    $('#client_root_dir').parent().addClass('is-dirty')


   document.getElementById("client_root_dir").setAttribute("readonly", 'true');

    uncheckCheckboxes();
    //permissions
    // $("#C").prop("checked", permissions.includes("C"));
    // $("#R").prop("checked", permissions.includes("R"));
    // $("#U").prop("checked", permissions.includes("U"));
    // $("#D").prop("checked", permissions.includes("D"));

    let dialog = document.getElementById("dialog_client");

    $("#edit_client_confirm").off('click').on('click', function () {
        updateClient(ctl, Id);
    });
    $("#edit_client_confirm").show();
    $("#add_client_confirm").hide('fast');

    dialog.showModal();
}

$(function () {
    let clientDialog = document.getElementById("dialog_client");
    if (!clientDialog.showModal) {
        dialogPolyfill.registerDialog(clientDialog);
    }
});


$(function () {
    $("#add-client").click(function () {
        console.log("add click");

        let dialog = document.getElementById("dialog_client");
        resetForm();
        document.getElementById("client_root_dir").removeAttribute("readonly");
        uncheckCheckboxes();
        $("#add_client_confirm").show();
        $("#edit_client_confirm").hide('fast');
        $("#client_root_dir").css("display", "block");
        dialog.showModal();
    });
});

$(function (){
    $("#add_client_confirm").click(function () {addClient();});
    resetForm();
})

$(function () {
    let dialog = document.getElementById("dialog_client");
    dialog.querySelector('.close').addEventListener('click', function() {
        document.getElementById("new_client_form").reset();
        dialog.close();
    });
});

function addClient(){
    let new_client_form = $("#new_client_form");
    new_client_form.validate();
    if(!new_client_form.valid())
        return;
    $.ajax({
        type: "POST",
        url: "?action=add_client",
        data: new_client_form.serialize(),
        cache: false,
        success: function (jsonText) {
            console.log("bio ovdje");
            let newClient = jsonText;

            let editButton = document.createElement("button");
            let i = document.createElement("i");

            console.log(newClient);
            document.getElementById("client_tbody").innerHTML += "<tr>\n" +
                "                <td id=\"Id\" style=\"display: none;\">" + newClient.id + "</td>\n" +
                "            <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                "                <button class=\"mdl-button mdl-js-button mdl-button--icon\" onclick=\"editClient(this)\">\n" +
                "                    <i class=\"material-icons\">edit</i>\n" +
                "                </button>\n" +
                "            </td>\n" +
                "            <td id=\"username\" class=\"mdl-data-table__cell--non-numeric\">" + newClient.username + "</td>\n" +
                "            <td class=\"mdl-data-table__cell--non-numeric\">" + newClient.mail + "</td>\n" +
                "            <td class=\"mdl-data-table__cell--non-numeric\">" + newClient.rootDir + "</td>\n" +
                "            <td class=\"mdl-data-table__cell--non-numeric\">" + newClient.ipAddress + "</td>\n" +
                "            <td class=\"mdl-data-table__cell--non-numeric\">" + newClient.permissions + "</td>\n" +
                "            <td>\n" +
                "                <button type=\"button\" onclick=\"deleteUser(this,'" + newClient.username + "', " + newClient.id + " )\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                "                    <i class=\"material-icons\">delete</i>\n" +
                "                </button>\n" +
                "            </td>\n" +
                "            </tr>";

            var notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Uspjesno dodato!"
                }
            );
            let dialog = document.getElementById("dialog_client");
            dialog.close();
        },
        error: function (errorResponse) {
            if (errorResponse.status == 401) {
                location.href = "https://localhost:8443/SSO_Auth_Server_war_exploded/?serviceURL=https://localhost:8443/SNI_DMS_Users_war_exploded";
            }
            let notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Nije uspjesno dodato!"
                }
            );
        }

    });
}

function updateClient(ctl, Id){
    console.log("Inside editClient(ctl, id)")
    let new_client_form = $("#new_client_form");
    new_client_form.validate();
    if(!new_client_form.valid())
        return;
    $.ajax({
        type: "POST",
        url: "?action=edit_client&Id=" + Id,
        data: new_client_form.serialize(),
        cache: false,
        success: function (jsonText) {

            let updatedClient = jsonText;

            $(ctl).parents("tr").children()[0].innerText = Id;
            $(ctl).parents("tr").children()[2].innerText = updatedClient.username;
            $(ctl).parents("tr").children()[3].innerText = updatedClient.mail;
            $(ctl).parents("tr").children()[5].innerText = updatedClient.ipAddress;
            $(ctl).parents("tr").children()[6].innerText = updatedClient.permissions;
            var notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Client successfully updated!"
                }
            );
            let dialog = document.getElementById("dialog_client");
            dialog.close();
        },
        error: function (errorResponse) {
            if (errorResponse.status == 401) {
                location.href = "https://localhost:8443/SSO_Auth_Server_war_exploded/?serviceURL=https://localhost:8443/SNI_DMS_Users_war_exploded";
            }
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
    $('#client_username').val('');
    $('#client_username').parent().removeClass('is-dirty')
    $('#client_mail').val('');
    $('#client_mail').parent().removeClass('is-dirty')
    $('#client_ip_address').val('');
    $('#client_ip_address').parent().removeClass('is-dirty')
    $('#client_password').val('');
    $('#client_root_dir').val('');
    $('#client_root_dir').parent().removeClass('is-dirty')
}
function uncheckCheckboxes(){
   document.getElementById("C").parentElement.MaterialCheckbox.uncheck();
   document.getElementById("R").parentElement.MaterialCheckbox.uncheck();
   document.getElementById("U").parentElement.MaterialCheckbox.uncheck();
   document.getElementById("D").parentElement.MaterialCheckbox.uncheck();
}

/*$(function () {
//    $("#add_client_confirm").click(function () {
//         let request = new XMLHttpRequest();
//         request.onreadystatechange = function () {
//             if (request.readyState == 4 && request.status == 200) {
//                 var notification = document.querySelector('.mdl-js-snackbar');
//                 notification.MaterialSnackbar.showSnackbar(
//                     {
//                         message: "Uspjesno dodato!"
//                     }
//                 );
//             } else if (request.readyState == 4 && request.status == 500) {
//                 let notification = document.querySelector('.mdl-js-snackbar');
//                 notification.MaterialSnackbar.showSnackbar(
//                     {
//                         message: "Nije uspjesno dodato!"
//                     }
//                 );
//             }
//         }
//             request.open("POST", "?action=add_client", true);
//             request.send($("#new_client_form").serialize());
//
//     })
// });
    $("#add_client_confirm").click(function () {
        let new_client_form = $("#new_client_form");
        new_client_form.validate();
        if(!new_client_form.valid())
            return;
        $.ajax({
            type: "POST",
            url: "?action=add_client",
            data: new_client_form.serialize(),
            cache: false,
            success: function (jsonText) {
                console.log("bio ovdje");
                let newClient = jsonText;

                let tr = document.createElement("tr");

                let tdId = document.createElement("td");
                tdId.style.display = "none";
                tdId.innerHTML = newClient.Id;


                let editButton = document.createElement("button");
                let i = document.createElement("i");

                console.log(newClient);
                document.getElementById("client_tbody").innerHTML += "<tr>\n" +
                    "                <td id=\"Id\" style=\"display: none;\">" + newClient.Id + "</td>\n" +
                    "            <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                    "                <button class=\"mdl-button mdl-js-button mdl-button--icon\" onclick=\"deleteUser(this)\">\n" +
                    "                    <i class=\"material-icons\">edit</i>\n" +
                    "                </button>\n" +
                    "            </td>\n" +
                    "            <td id=\"username\" class=\"mdl-data-table__cell--non-numeric\">" + newClient.username + "</td>\n" +
                    "            <td class=\"mdl-data-table__cell--non-numeric\">" + newClient.rootDir + "</td>\n" +
                    "            <td class=\"mdl-data-table__cell--non-numeric\">" + newClient.ipAddress + "</td>\n" +
                    "            <td class=\"mdl-data-table__cell--non-numeric\">" + newClient.permissions + "</td>\n" +
                    "            <td>\n" +
                    "                <button type=\"button\" onclick=\"deleteUser(this)\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                    "                    <i class=\"material-icons\">delete</i>\n" +
                    "                </button>\n" +
                    "            </td>\n" +
                    "            </tr>";

                var notification = document.querySelector('.mdl-js-snackbar');
                notification.MaterialSnackbar.showSnackbar(
                    {
                        message: "Uspjesno dodato!"
                    }
                );
            },
            error: function () {
                let notification = document.querySelector('.mdl-js-snackbar');
                notification.MaterialSnackbar.showSnackbar(
                    {
                        message: "Nije uspjesno dodato!"
                    }
                );
            }

        });
    });
});*/
