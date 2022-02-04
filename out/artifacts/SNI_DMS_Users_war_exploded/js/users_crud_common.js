function deleteUser(ctl, Id) {

    //  console.log($(ctl).parents("tr").children()[1].innerHTML);
  //  let username = $(ctl).parents("tr").children()[2].innerHTML;
    //let Id = $(ctl).parents("tr").children()[0].innerHTML;
    let res = confirm("Do you want to delete user: " + Id);

    if (res) {
        $.ajax({
            type: "DELETE",
            url: "?Id=" + Id,
            cache: false,
            success : function (){
                $(ctl).parents("tr").remove();
            },
            error : function (){
                let notification = document.querySelector('.mdl-js-snackbar');
                notification.MaterialSnackbar.showSnackbar(
                    {
                        message: "Delete failed!"
                    }
                );
            }

        });
        /*   let request = new XMLHttpRequest();
           request.onreadystatechange = function () {
               if (request.readyState == 4 && request.status == 200) {
                   $(ctl).parents("tr").remove();
               }
           }
           // request.open("DELETE", "${pageContext.request.contextPath}/users?Id=" + Id, true);
           request.open("DELETE", "?Id=" + Id, true);
           request.send();*/

    }
    // $(ctl).parent("tr").remove();
}
