function deleteUser(ctl, username, Id) {

    //  console.log($(ctl).parents("tr").children()[1].innerHTML);
    // let username = $(ctl).parents("tr").children()[2].innerHTML;
    //let Id = $(ctl).parents("tr").children()[0].innerHTML;
    let res = confirm("Do you want to delete user: " + username + "?");

    let notification = document.querySelector('.mdl-js-snackbar');
    if (res) {
        $.ajax({
            type: "DELETE", url: "?Id=" + Id, cache: false, success: function () {
                $(ctl).parents("tr").remove();
                notification.MaterialSnackbar.showSnackbar({
                    message: "User deleted successfully!"
                });
            },
            error: function (response) {
                if (response.status == 401) {
                    location.href = "https://localhost:8443/SSO_Auth_Server_war_exploded/?serviceURL=https://localhost:8443/SNI_DMS_Users_war_exploded";
                } else if (response.status == 409) {
                    notification.MaterialSnackbar.showSnackbar({
                        message: "You cannot delete youself!"
                    });
                } else if (response.status == 404) {
                    alert("Delete failed. User not found!");
                } else {
                    alert("Delete failed!")
                }

            }

        });
    }
}
