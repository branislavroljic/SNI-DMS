function openFolder(ctl) {
    alert($(ctl).children()[1].innerHTML);
    let fileName = $(ctl).children()[1].innerHTML;
    let form = document.getElementById(fileName);
    alert(form.action);
    form.submit();
    /*$.ajax({
        type: "POST",
        url: "?action=list_files&file=" + fileName,
        cache: false,
        success: function (jsonText) {
        },
        error : function (){
        }
    }*/
}

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
            let filesBody = document.getElementById("files-tbody");
            document.getElementById("curr-dir-text").innerHTML = directoryName;
            filesBody.innerHTML = "";
            // filesBody.innerHTML += "<form enctype=\"multipart/form-data\" id=\"file-update-form\">\n" +
            //     "                                    <input type=\"file\" name=\"file\" id=\"fileUpdateInput\" style=\"display: none\">\n" +
            //     "                                </form>";
            console.log(jsonFiles);
            for (let i in jsonFiles) {
                //console.log(jsonFiles[i]);
                const fileName = jsonFiles[i].fileName;
                const filePath = jsonFiles[i].filePath;
                const isDir = jsonFiles[i].isDir;
                const lastModifiedTime = jsonFiles[i].lastModifiedTime;
                const size = jsonFiles[i].size;
                let tr = document.createElement("tr");
                if (isDir) {
                    console.log("dir je : " + fileName);

                    tr.innerHTML =
                        "    <td>\n" +
                        "        <button type=\"button\" onclick=\"listFiles('" + fileName + "', ' " + permissions + "', '" + role + "' )\"\n" +
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
                    if (role != 'C') {
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
                    }
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
                    }
                    if (role != 'C') {
                        console.log("Role is not C");
                        tr.innerHTML +=
                            "    <td>\n" +
                            "        <button onclick=\"moveFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                            "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "            <i class=\"material-icons\">drive_file_move</i>\n" +
                            "        </button>\n" +
                            "    </td>\n";
                    }
                    if (permissions.includes('D')) {
                        tr.innerHTML +=
                            "    <td>\n" +
                            "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                            "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "            <i class=\"material-icons\">delete</i>\n" +
                            "        </button>\n" +
                            "    </td>\n";
                    }
                }
                filesBody.append(tr);
                // const notification = document.querySelector('.mdl-js-snackbar');
                // notification.MaterialSnackbar.showSnackbar(
                //     {
                //         message: respText
                //     }
            }
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

//
// function listsssFiles(ctl){
//     let dir = {
//         dirPath : $(ctl).parents("span").children()[0].innerHTML
//     }
//     console.log("Dir path: " + dir.dirPath);
//     $.ajax({
//         type : "GET",
//         url : "?action=list_files",
//         cache : false,
//         data : JSON.stringify(dir),
//         success : function (){
//             document.getElementById("file-list").innerHTML += "<div class=\"mdl-list__item mdl-list__item--two-line\">\n" +
//                 "    <span class=\"mdl-list__item-primary-content\">\n" +
//                 "         <span style=\"display : none\"><%= currentDir.toPath().resolve(file.toPath()) %></span>\n" +
//                 "        <button type=\"button\" onclick=\"listFiles(this)\"\n" +
//                 "                class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
//                 "            <i class=\"material-icons\">folder</i>\n" +
//                 "        </button>\n" +
//                 "        <span><%= file.getName() %> </span>\n" +
//                 "        <span class=\"mdl-list__item-sub-title\"> <%= Math.round(file.length() / 1000.0) / 100.0 + \"KB\" %> </span>\n" +
//                 "    </span>`\n" +
//                 "    <span class=\"mdl-list__item-secondary-content\">\n" +
//                 "        <button onclick=\"deleteFileClick(this, '<%= file.getName() %>' )\" type=\"button\"\n" +
//                 "                class=\"mdl-button mdl-list__item-secondary-action mdl-js-button mdl-button--icon\">\n" +
//                 "            <i class=\"material-icons\">delete</i>\n" +
//                 "        </button>\n" +
//                 "    </span>\n" +
//                 "\n" +
//                 "</div>";
//         },
//         error : function (){
//
//         }
//     });
// }

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
            for (let i in jsonFiles) {
                //console.log(jsonFiles[i]);
                const fileName = jsonFiles[i].fileName;
                const filePath = jsonFiles[i].filePath;
                const isDir = jsonFiles[i].isDir;
                const lastModifiedTime = jsonFiles[i].lastModifiedTime;
                const size = jsonFiles[i].size;
                let tr = document.createElement("tr");
                if (isDir) {
                    console.log("dir je : " + fileName);

                    tr.innerHTML =
                        "    <td>\n" +
                        "        <button type=\"button\" onclick=\"listFiles('" + fileName + "', ' " + permissions + "', '" + role + "' )\"\n" +
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
                    if (role != 'C') {
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
                    }
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
                    }
                    if (role != 'C') {
                        console.log("Role is not C");
                        tr.innerHTML +=
                            "    <td>\n" +
                            "        <button onclick=\"moveFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                            "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "            <i class=\"material-icons\">drive_file_move</i>\n" +
                            "        </button>\n" +
                            "    </td>\n";
                    }
                    if (permissions.includes('D')) {
                        tr.innerHTML +=
                            "    <td>\n" +
                            "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                            "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                            "            <i class=\"material-icons\">delete</i>\n" +
                            "        </button>\n" +
                            "    </td>\n";
                    }
                }
                filesBody.append(tr);
                // const notification = document.querySelector('.mdl-js-snackbar');
                // notification.MaterialSnackbar.showSnackbar(
                //     {
                //         message: respText
                //     }
            }
        },
        error: function () {
            alert("error");
        }
    });
}


/*triggers hidden input field */
$(function () {
    $("#upload-file-button").click(function () {
        $("#fileInput").click();
    });
});

var ctl = null;

function updateFileClick(ctl) {
    this.ctl = ctl;
    $("#fileUpdateInput").click();
}

/*$(function (){
    $("#update-file-button").click(function (){
        $("#fileUpdateInput").click();
    });
});*/

/*upload new file*/
$(function () {
    $("#fileInput").change(function () {
        let file = this.files[0];
        if (file.size > 1024 * 1024) {
            alert('File cannot be bigger then 1MB');
        } else {
            //  let fd = new FormData($("#file-upload-form")[0]);
            $.ajax({
                // Your server script to process the upload
                url: '?action=upload_file',
                type: 'POST',

                // Form data
                data: new FormData($('#file-upload-form')[0]),

                // Tell jQuery not to process data or worry about content-type
                // You *must* include these options!
                cache: false,
                contentType: false,
                processData: false,

                success: function (respText) {
                    let fileName = file.name;
                    let downloadFormActionAttr = "?action=download_file&file=" + fileName;
                    let uploadFormActionAttr = "action=upload_file&file=" + fileName;
                    let size = Math.round(file.size / 1024) / 100;
                    let lastModifiedTime = file.lastModified;
                    document.getElementById("files-tbody").innerHTML += "<tr>\n" +
                        "    <td>\n" +
                        "        <form action=\"?action=download_file&file=" + fileName + "\" id=" + fileName + " method=\"post\">\n" +
                        "                <button type=\"submit\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "                    <i class=\"material-icons\">description</i>\n" +
                        "                </button>\n" +
                        "        </form>\n" +
                        "    </td>\n" +
                        "    <td name=\"filename\" class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + fileName + "\n" +
                        "    </td>\n" +
                        "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + lastModifiedTime + "\n" +
                        "    </td>\n" +
                        "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
                        "        " + size + "\n" +
                        "    </td>\n" +
                        "    <td>\n" +
                        "        <button onclick=\"updateFileClick(this)\" type=\"button\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "            <i class=\"material-icons\">upload_file</i>\n" +
                        "        </button>\n" +
                        "    </td>\n" +
                        "    <td>\n" +
                        "        <button onclick=\"moveFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                        "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "            <i class=\"material-icons\">drive_file_move</i>\n" +
                        "        </button>\n" +
                        "    </td>\n" +
                        "    <td>\n" +
                        "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
                        "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
                        "            <i class=\"material-icons\">delete</i>\n" +
                        "        </button>\n" +
                        "    </td>\n" +
                        "</tr>";
                    const notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                        {
                            message: respText
                        }
                    );
                },
                error: function (responseText) {
                    alert(responseText);
                }
                // Custom XMLHttpRequest
                /*  xhr: function () {
                      var myXhr = $.ajaxSettings.xhr();
                      if (myXhr.upload) {
                          // For handling the progress of the upload
                          myXhr.upload.addEventListener('progress', function (e) {
                              if (e.lengthComputable) {
                                  $('progress').attr({
                                      value: e.loaded,
                                      max: e.total,
                                  });
                              }
                          }, false);
                      }
                      return myXhr;
                  }*/
            });
        }
    });
});

/*update file*/
$(function () {
    $("#fileUpdateInput").change(function () {
        let file = this.files[0];
        console.log("File name: " + file.name);
        console.log($(ctl).parents("tr").children()[2].innerHTML)
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

                success: function (respText) {
                    $(ctl).parents("tr").children()[2].innerHTML = file.lastModified;
                    $(ctl).parents("tr").children()[3].innerHTML = file.size;
                    const notification = document.querySelector('.mdl-js-snackbar');
                    notification.MaterialSnackbar.showSnackbar(
                        {
                            message: respText
                        }
                    );
                },
                error: function (responseText) {
                    alert(responseText);
                }
                // Custom XMLHttpRequest
                /*  xhr: function () {
                      var myXhr = $.ajaxSettings.xhr();
                      if (myXhr.upload) {
                          // For handling the progress of the upload
                          myXhr.upload.addEventListener('progress', function (e) {
                              if (e.lengthComputable) {
                                  $('progress').attr({
                                      value: e.loaded,
                                      max: e.total,
                                  });
                              }
                          }, false);
                      }
                      return myXhr;
                  }*/
            });
        }
    });
});
