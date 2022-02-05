
function listFiles(directoryName, permissions, role) {
    let dirInfo = {
        dirName: directoryName
    }
    console.log(permissions);
    console.log(role);
    $.ajax({
        type: 'POST',
        url: '?action=list_files',
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(dirInfo),
        success: function (jsonFiles) {
            document.getElementById("curr-dir-text").innerHTML = directoryName;
            // let filesBody = document.getElementById("files-tbody");
            // filesBody.innerHTML = "";
            // filesBody.innerHTML += "<form enctype=\"multipart/form-data\" id=\"file-update-form\">\n" +
            //     "                                    <input type=\"file\" name=\"file\" id=\"fileUpdateInput\" style=\"display: none\">\n" +
            //     "                                </form>";
            console.log(jsonFiles);
            displayRows(permissions, role, jsonFiles);


        },
        error: function () {
            alert("error");
        }
    });
}

/* sends post request with params in body*/
function post(path, params) {

    const form = document.createElement('form');
    form.action = path;
    form.method = 'post';

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

/*delete file*/
function deleteFileClick(ctl, deleteFileName) {

    console.log(deleteFileName);

    let res = confirm("Do you want to delete file: " + deleteFileName);
    let file = {
        fileName: deleteFileName
    }

    if (res) {
        $.ajax({
            type: "DELETE",
            url: "?action=delete_file",
            cache: false,
            data: JSON.stringify(file),
            success: function (responseText) {
                $(ctl).parents("tr").remove();
                let notification = document.querySelector('.mdl-js-snackbar');
                notification.MaterialSnackbar.showSnackbar(
                    {
                        message: responseText
                    }
                );
            },
            error: function (errorResponse) {
                console.log(errorResponse.responseText);
                alert(errorResponse.responseText);
            }
        });
    }
}

function backButtonClick(permissions, role) {
    $.ajax({
        type: 'GET',
        url: '?action=list_parent_dir',
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
        success: function (jsonFiles) {
            let filesBody = document.getElementById("files-tbody");
            document.getElementById("curr-dir-text").innerHTML = "rijesi ovo";
            filesBody.innerHTML = "";
            // filesBody.innerHTML += "<form enctype=\"multipart/form-data\" id=\"file-update-form\">\n" +
            //     "        <input type=\"file\" name=\"file\" id=\"fileUpdateInput\" style=\"display: none\">\n" +
            //     "    </form>";
            console.log(jsonFiles);
            displayRows(permissions, role, jsonFiles);

        },
        error : function () {
            alert("error");
        }
    });
}

function displayRows(permissions, role, jsonFiles) {
    let filesBody = document.getElementById("files-tbody");
    filesBody.innerHTML = "";
    for (let i in jsonFiles) {
        //console.log(jsonFiles[i]);
        const fileName = jsonFiles[i].fileName;
        const filePath = jsonFiles[i].filePath;
        const isDir = jsonFiles[i].isDir;
        const lastModifiedTime = jsonFiles[i].lastModifiedTime;
        const size = jsonFiles[i].size;

        console.log(filePath);

        let tr = document.createElement("tr");
        tr.innerHTML = "<td name=\"filePath\" style=\"display: none;\">" + filePath + "</td>"
        if (isDir) {
            console.log("dir je : " + fileName);

            tr.innerHTML +=
                "    <td>\n" +
                "        <button type=\"button\" onclick=\"listFiles('" + filePath + "', ' " + permissions + "', '" + role + "' )\"\n" +
                "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                "            <i class=\"material-icons\">folder</i>\n" +
                "        </button>\n" +
                "    </td>\n" +
                "    <td name=\"filename\" class=\"mdl-data-table__cell--non-numeric\">\n" +
                "        " + fileName + "\n" +
                "    </td>\n" +
                "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                "       " + lastModifiedTime + "\n" +
                "    </td>\n" +
                "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                "        " + size + "\n" +
                "    </td>\n" +
                "    <td></td>\n" +
                "    <td></td>";
            if (role == 'DA') {   //only document admin can delete directory
                tr.innerHTML += "<td>\n" +
                    "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                    "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                    "            <i class=\"material-icons\">delete</i>\n" +
                    "        </button>\n" +
                    "    </td>"
            }

        } else {
            console.log("fajl je: " + fileName);
            if (permissions.includes('R')) {
                console.log("permission includes R");
                tr.innerHTML += " <td>\n" +
                    "        <form action=\"?action=download_file&file=" + fileName + "\" id=" + fileName + " method=\"post\">\n" +
                    "                <button type=\"submit\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                    "                    <i class=\"material-icons\">description</i>\n" +
                    "                </button>\n" +
                    "        </form>\n" +
                    "    </td>\n";
            }else tr.innerHTML += " <td></td>";

            tr.innerHTML +=
                " <td name=\"filename\" class=\"mdl-data-table__cell--non-numeric\">\n" +
                "        " + fileName + "\n" +
                "    </td>\n" +
                "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                "        " + lastModifiedTime + "\n" +
                "    </td>\n" +
                "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                "        " + size + "\n" +
                "    </td>\n";
            if (permissions.includes('U')) {
                console.log("permission includes U");
                tr.innerHTML +=
                    "    <td>\n" +
                    "        <button onclick=\"updateFileClick(this)\" type=\"button\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                    "            <i class=\"material-icons\">upload_file</i>\n" +
                    "        </button>\n" +
                    "    </td>\n";
            }else tr.innerHTML += " <td></td>";

            if (role == 'DA') {  //ony DA can move files
                console.log("role je: " + role);
                console.log("da li je jednako : " + (role == 'DA'));
                tr.innerHTML +=
                    "    <td>\n" +
                    "        <button onclick=\"moveFileClick('" + filePath + "' )\" type=\"button\"\n" +
                    "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                    "            <i class=\"material-icons\">drive_file_move</i>\n" +
                    "        </button>\n" +
                    "    </td>\n";
            }else tr.innerHTML += " <td></td>";

            if (permissions.includes('D')) {
                tr.innerHTML +=
                    "    <td>\n" +
                    "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                    "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                    "            <i class=\"material-icons\">delete</i>\n" +
                    "        </button>\n" +
                    "    </td>\n";
            }else tr.innerHTML += " <td></td>";

        }
        filesBody.append(tr);
    }
}


/*triggers hidden input field */
$(function () {
    $("#upload-file-button").click(function () {
        $("#fileInput").click();
    });
});

// var permissions = null;
// var role = null;
//
// function backButtonClick(userPermissions, userRole){
//         permissions = userPermissions;
//         role = userRole;
//          $("#fileInput").click();
// }
var ctl = null;

function updateFileClick(ctl) {
    this.ctl = ctl;
    $("#fileUpdateInput").click();
}


/*upload new file*/
$(function () {
    $("#fileInput").change(function () {
        let file = this.files[0];
        if (file.size > 1024 * 1024) {
            alert('File cannot be bigger then 1MB!');
        } else {
            //  let fd = new FormData($("#file-upload-form")[0]);
            $.ajax({

                url: '?action=upload_file',
                type: 'POST',

                // Form data
                data: new FormData($('#file-upload-form')[0]),

                // Tell jQuery not to process data or worry about content-type

                cache: false,
                contentType: false,
                processData: false,

                dataType: 'json',
                success: function (jsonFile) {
                    // let fileName = file.name;
                    // let downloadFormActionAttr = "?action=download_file&file=" + fileName;
                    // let uploadFormActionAttr = "action=upload_file&file=" + fileName;
                    // let size = Math.round(file.size / 1024) / 100;
                    // let lastModifiedTime = file.lastModified;
                    const fileName = jsonFile.fileName;
                    const filePath = jsonFile.filePath;
                    const lastModifiedTime = jsonFile.lastModifiedTime;
                    const size = jsonFile.size;
                    const permissions = jsonFile.permissions;
                    const role = jsonFile.role;

                    let tr = document.createElement("tr");
                    tr.innerHTML = "<td name=\"filePath\" style=\"display: none;\">" + filePath + "</td>";

                    if (permissions.includes('R')) {
                        console.log("permission includes R");
                        tr.innerHTML += " <td>\n" +
                            "        <form action=\"?action=download_file&file=" + fileName + "\" id=" + fileName + " method=\"post\">\n" +
                            "                <button type=\"submit\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "                    <i class=\"material-icons\">description</i>\n" +
                            "                </button>\n" +
                            "        </form>\n" +
                            "    </td>\n";
                    }else tr.innerHTML += " <td></td>";
                    tr.innerHTML +=
                        " <td  class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + fileName + "\n" +
                        "    </td>\n" +
                        "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + lastModifiedTime + "\n" +
                        "    </td>\n" +
                        "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + size + "\n" +
                        "    </td>\n";

                    //always can update
                    tr.innerHTML +=
                        "    <td>\n" +
                        "        <button onclick=\"updateFileClick(this)\" type=\"button\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "            <i class=\"material-icons\">upload_file</i>\n" +
                        "        </button>\n" +
                        "    </td>\n";

                    if (role == 'DA') {  //ony DA can move files
                        tr.innerHTML +=
                            "    <td>\n" +
                            "        <button onclick=\"moveFileClick('" + filePath + "' )\" type=\"button\"\n" +
                            "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "            <i class=\"material-icons\">drive_file_move</i>\n" +
                            "        </button>\n" +
                            "    </td>\n";
                    }else tr.innerHTML += " <td></td>";
                    if (permissions.includes('D')) {
                        tr.innerHTML +=
                            "    <td>\n" +
                            "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                            "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "            <i class=\"material-icons\">delete</i>\n" +
                            "        </button>\n" +
                            "    </td>\n";
                    }else tr.innerHTML += " <td></td>";

                    let filesBody = document.getElementById("files-tbody");
                    filesBody.append(tr);


                    const notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                        {
                            message: "File uploaded sucessfully!"
                        }
                    );
                },
                error: function () {
                    alert("File upload failed!");
                }
            });
        }
    });
});

/*update file*/
$(function () {
    $("#fileUpdateInput").change(function () {
        let file = this.files[0];

        if (file.size > 1024 * 1024) {
            alert('File cannot be bigger then 1MB');
        } else {
            $.ajax({
                // Your server script to process the upload
                url: '?action=update_file',
                type: 'POST',

                // Form data
                data: new FormData($('#file-update-form')[0]),
                // Tell jQuery not to process data or worry about content-type
                // You *must* include these options!
                cache: false,
                contentType: false,
                processData: false,

                dataType :'json',
                success: function (jsonFile) {
                    const lastModifiedTime = jsonFile.lastModifiedTime;
                    const size = jsonFile.size;

                    $(ctl).parents("tr").children()[2].innerHTML = lastModifiedTime;
                    $(ctl).parents("tr").children()[3].innerHTML = size;
                    const notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                        {
                            message: "File updated successfully!"
                        }
                    );
                },
                error: function (responseText) {
                    alert(responseText);
                }

            });
        }
    });
});


var fileToMove = null;

$(function () {
    $("#move-here-button").hide();
    $("#cancel-move-button").hide();
});

function moveFileClick(filePath) {
    fileToMove = filePath;
    $("#move-here-button").show(1500);
    $("#cancel-move-button").show(1500);
}

$(function () {
    $("#cancel-move-button").click(function () {
        hideMoveButtons();
    });
});
$(function () {
    $("#move-here-button").click(function () {

        if (!fileToMove) {
            return;
        }
        let file = {
            filePath: fileToMove
        }

        $.ajax({
            type: "POST",
            url: "?action=move_file",
            cache: false,
            data: JSON.stringify(file),
            contentType: 'application/json',
            success: function () {
                listFiles('', 'CRUD', 'DA');
                let notification = document.querySelector('.mdl-js-snackbar');
                notification.MaterialSnackbar.showSnackbar(
                    {
                        message: "File moved sucessfully!"
                    }
                );
                hideMoveButtons();
            },
            error: function (errorResponse) {
                alert(errorResponse.responseText);
            }
        });


    });
});

function hideMoveButtons() {
    $("#move-here-button").hide(1000);
    $("#cancel-move-button").hide(1000);
    fileToMove = null;
}