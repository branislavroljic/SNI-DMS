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
            }, error: function () {
                notification.MaterialSnackbar.showSnackbar({
                    message: "Delete failed!"
                });
            }

        });
    }
}
