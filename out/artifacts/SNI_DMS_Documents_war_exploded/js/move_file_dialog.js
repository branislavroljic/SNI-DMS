var ctl = null;
var moveFileName = null;

$(function () {
    let dialog = document.getElementById("dialog_move_file");
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
});

$(function (){
    $("#move_file_confirm").click(function () {moveFile();});
})

$(function (){

})

$(function () {
    let dialog = document.getElementById("dialog_move_file");
    dialog.querySelector('.close').addEventListener('click', function() {
        document.getElementById("new_doc_admin_form").reset();
        dialog.close();
    });
});


function moveFileClick(ctl, moveFileName){
    this.ctl = ctl;
    this.moveFileName = moveFileName;
    let dialog = document.getElementById("dialog_move_file");
    dialog.showModal();
}

function moveFile(){

    let file = {
        fileName : this.moveFileName
    }
    $.ajax({
        type: "POST",
        url : "?action=move_file",
        cache : false,
        data : JSON.stringify(file),
        success : function (responseText){
            $(ctl).parents("tr").remove();
            let notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar(
                {
                    message: responseText
                }
            );
        },
        error : function (errorResponse){
            console.log(errorResponse.responseText);
            alert(errorResponse.responseText);
        }
    });
}