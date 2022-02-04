/*register dialog*/
$(function () {
    let dialog = document.getElementById("dialog_create_dir");
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
});

/*dialog to get new dir name*/
$(function (){
    $("#create-dir-button").click(function (){
        let dialog = document.getElementById("dialog_create_dir");
        dialog.showModal();
    });
});


$(function () {
    let dialog = document.getElementById("dialog_create_dir");
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
});


/*handles confirmation of directory creation*/
$(function (){
    $("#crate_dir_confirm").click(function (){

        $.ajax({
            type: "POST",
            url: "?action=create_dir",
            data: $("#new_dir_form").serialize(),
            cache: false,
            success: function (jsonText) {
                let jsonFile = JSON.parse(jsonText);
                let dirName = jsonFile.fileName;
                let dirSize = jsonFile.size;
                let dirLastModifTime = jsonFile.lastModifiedTime;
                let tr = document.createElement("tr");
                    tr.innerHTML =
                        "    <td>\n" +
                        "        <button type=\"button\" onclick=\"listFiles('" + dirName + "', 'CRUD', 'A' )\"\n" +
                        "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "            <i class=\"material-icons\">folder</i>\n" +
                        "        </button>\n" +
                        "    </td>\n" +
                        "    <td name=\"filename\" class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + dirName + "\n" +
                        "    </td>\n" +
                        "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "       " + dirLastModifTime + "\n" +
                        "    </td>\n" +
                        "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + dirSize + "\n" +
                        "    </td>\n" +
                        "    <td></td>\n" +
                        "    <td></td>";
                        tr.innerHTML += "<td>\n" +
                            "        <button onclick=\"deleteFileClick(this, '" + dirName + "' )\" type=\"button\"\n" +
                            "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "            <i class=\"material-icons\">delete</i>\n" +
                            "        </button>\n" +
                            "    </td>"
                document.getElementById("files-tbody").append(tr);
                const notification = document.querySelector('.mdl-js-snackbar');
                notification.MaterialSnackbar.showSnackbar(
                    {
                        message: jsonFile.message
                    }
                );
            },
            error : function (errorResponse){
                alert(errorResponse.responseText);
            }
        });
    });
});
