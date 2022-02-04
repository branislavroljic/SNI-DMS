

function editClient(ctl){
    console.log("Inside editClient(ctl)")
    let Id = $(ctl).parents("tr").children()[0].innerHTML;
    let username = $(ctl).parents("tr").children()[2].innerHTML;
    let rootDir = $(ctl).parents("tr").children()[3].innerHTML;
    let ipAddress = $(ctl).parents("tr").children()[4].innerHTML;
    let permissions = $(ctl).parents("tr").children()[5].innerHTML;

    console.log(permissions);

    let elements = document.getElementById("new_client_form").elements;
    elements.username.value = username;
    elements.ip_address.value = ipAddress;
    elements.root_dir.value = rootDir;
    //permissions
    $("#C").prop("checked", permissions.includes("C"));
    $("#R").prop("checked", permissions.includes("R"));
    $("#U").prop("checked", permissions.includes("U"));
    $("#D").prop("checked", permissions.includes("D"));

    let dialog = document.getElementById("dialog_client");
    $("#edit_client_confirm").off('click').on('click', function () {
        updateClient(ctl, Id);
    });
    $("#edit_client_confirm").show();
    $("#add_client_confirm").hide('fast');
    $("#client_root_dir").css("display", "none");
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
        let dialog = document.getElementById("dialog_client");
        resetForm();
        $("#add_client_confirm").show();
        $("#edit_client_confirm").hide('fast');
        $("#client_root_dir").css("display", "block");
        dialog.showModal();
    });
});

$(function (){
    $("#add_client_confirm").click(function () {addClient();});
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
            let dialog = document.getElementById("dialog_client");
            dialog.close();
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
            console.log("bio ovdje");
            let updatedClient = jsonText;

            $(ctl).parents("tr").children()[0].innerHTML = Id;
            $(ctl).parents("tr").children()[2].innerHTML = updatedClient.username;
            $(ctl).parents("tr").children()[3].innerHTML = updatedClient.rootDir;
            $(ctl).parents("tr").children()[4].innerHTML = updatedClient.ipAddress;
            $(ctl).parents("tr").children()[5].innerHTML = updatedClient.permissions;
            var notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: "Client sucessfully updated!"
                }
            );
            let dialog = document.getElementById("dialog_client");
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
    document.getElementById("new_client_form").reset();
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
