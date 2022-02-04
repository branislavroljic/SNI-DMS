// var ctl = null;
// var moveFileName = null;
//
// $(function () {
//     let dialog = document.getElementById("dialog_move_file");
//     if (!dialog.showModal) {
//         dialogPolyfill.registerDialog(dialog);
//     }
// });
//
// $(function (){
//     $("#move_file_confirm").click(function () {moveFile();});
// })
//
// $(function (){
//
// })
//
// // $(function () {
// //     let dialog = document.getElementById("dialog_move_file");
// //     dialog.querySelector('.close').addEventListener('click', function() {
// //         dialog.close();
// //     });
// // });
//
//
// function moveFileClick(ctl, moveFileName){
//     this.ctl = ctl;
//     this.moveFileName = moveFileName;
//     let dialog = document.getElementById("dialog_move_file");
//     dialog.showModal();
// }
//
// function listDirs(directoryName, permissions, role) {
//     let dirInfo = {
//         dirName: directoryName
//     }
//     console.log(permissions);
//     console.log(role);
//     $.ajax({
//         type: 'POST',
//         url: '?action=list_files',
//         cache: false,
//         dataType: 'json',
//         contentType: 'application/json',
//         data: JSON.stringify(dirInfo),
//         success: function (jsonFiles) {
//             let filesBody = document.getElementById("files-tbody");
//             document.getElementById("curr-dir-text").innerHTML = directoryName;
//             filesBody.innerHTML = "";
//             // filesBody.innerHTML += "<form enctype=\"multipart/form-data\" id=\"file-update-form\">\n" +
//             //     "                                    <input type=\"file\" name=\"file\" id=\"fileUpdateInput\" style=\"display: none\">\n" +
//             //     "                                </form>";
//             console.log(jsonFiles);
//             for (let i in jsonFiles) {
//                 //console.log(jsonFiles[i]);
//                 const fileName = jsonFiles[i].fileName;
//                 const filePath = jsonFiles[i].filePath;
//                 const isDir = jsonFiles[i].isDir;
//                 const lastModifiedTime = jsonFiles[i].lastModifiedTime;
//                 const size = jsonFiles[i].size;
//                 let tr = document.createElement("tr");
//                 if (isDir) {
//                     console.log("dir je : " + fileName);
//
//                     tr.innerHTML =
//                         "    <td>\n" +
//                         "        <button type=\"button\" onclick=\"listFiles('" + fileName + "', ' " + permissions + "', '" + role + "' )\"\n" +
//                         "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
//                         "            <i class=\"material-icons\">folder</i>\n" +
//                         "        </button>\n" +
//                         "    </td>\n" +
//                         "    <td name=\"filename\" class=\"mdl-data-table__cell--non-numeric\">\n" +
//                         "        " + fileName + "\n" +
//                         "    </td>\n" +
//                         "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
//                         "       " + lastModifiedTime + "\n" +
//                         "    </td>\n" +
//                         "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
//                         "        " + size + "\n" +
//                         "    </td>\n" +
//                         "    <td></td>\n" +
//                         "    <td></td>";
//                     if (role != 'C') {
//                         tr.innerHTML += "<td>\n" +
//                             "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
//                             "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
//                             "            <i class=\"material-icons\">delete</i>\n" +
//                             "        </button>\n" +
//                             "    </td>"
//                     }
//
//                 } else {
//                     console.log("fajl je: " + fileName);
//                     if (permissions.includes('R')) {
//                         console.log("permission includes R");
//                         tr.innerHTML += " <td>\n" +
//                             "        <form action=\"?action=download_file&file=" + fileName + "\" id=" + fileName + " method=\"post\">\n" +
//                             "                <button type=\"submit\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
//                             "                    <i class=\"material-icons\">description</i>\n" +
//                             "                </button>\n" +
//                             "        </form>\n" +
//                             "    </td>\n";
//                     }
//                     tr.innerHTML +=
//                         " <td name=\"filename\" class=\"mdl-data-table__cell--non-numeric\">\n" +
//                         "        " + fileName + "\n" +
//                         "    </td>\n" +
//                         "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
//                         "        " + lastModifiedTime + "\n" +
//                         "    </td>\n" +
//                         "    <td class=\"mdl-data-table__cell--non-numeric\">\n" +
//                         "        " + size + "\n" +
//                         "    </td>\n";
//                     if (permissions.includes('U')) {
//                         console.log("permission includes U");
//                         tr.innerHTML +=
//                             "    <td>\n" +
//                             "        <button onclick=\"updateFileClick(this)\" type=\"button\" class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
//                             "            <i class=\"material-icons\">upload_file</i>\n" +
//                             "        </button>\n" +
//                             "    </td>\n";
//                     }
//                     if (role != 'C') {
//                         console.log("Role is not C");
//                         tr.innerHTML +=
//                             "    <td>\n" +
//                             "        <button onclick=\"moveFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
//                             "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
//                             "            <i class=\"material-icons\">drive_file_move</i>\n" +
//                             "        </button>\n" +
//                             "    </td>\n";
//                     }
//                     if (permissions.includes('D')) {
//                         tr.innerHTML +=
//                             "    <td>\n" +
//                             "        <button onclick=\"deleteFileClick(this, '" + fileName + "' )\" type=\"button\"\n" +
//                             "            class=\"mdl-button mdl-js-button mdl-button--icon\">\n" +
//                             "            <i class=\"material-icons\">delete</i>\n" +
//                             "        </button>\n" +
//                             "    </td>\n";
//                     }
//                 }
//                 filesBody.append(tr);
//                 // const notification = document.querySelector('.mdl-js-snackbar');
//                 // notification.MaterialSnackbar.showSnackbar(
//                 //     {
//                 //         message: respText
//                 //     }
//             }
//         },
//         error: function () {
//             alert("error");
//         }
//     });
// }
//
//
// function moveFile(){
//
//     let file = {
//         fileName : this.moveFileName
//     }
//     $.ajax({
//         type: "POST",
//         url : "?action=move_file",
//         cache : false,
//         data : JSON.stringify(file),
//         success : function (responseText){
//             $(ctl).parents("tr").remove();
//             let notification = document.querySelector('.mdl-js-snackbar');
//             notification.MaterialSnackbar.showSnackbar(
//                 {
//                     message: responseText
//                 }
//             );
//         },
//         error : function (errorResponse){
//             console.log(errorResponse.responseText);
//             alert(errorResponse.responseText);
//         }
//     });
// }

// var fileToMove = null;
//
// function moveFileClick(filePath) {
//     $("#move-here-button").show();
//     $("#cancel-move-button").show();
// }
//
// $(function () {
//     $("#cancel-move-button").click(function () {
//         $("#move-here-button").hide(1000);
//         $("#cancel-move-button").hide(1000);
//         fileToMove = null;
//     });
// });
// $(function () {
//     $("#move-here-button").click(function () {
//
//         let file = {
//             filePath: fileToMove
//         }
//
//         $.ajax({
//             type: "POST",
//             url: "?action=move_file",
//             cache: false,
//             data: JSON.stringify(file),
//             dataType: 'json',
//             contentType: 'application/json',
//             success: function (responseText) {
//                 let curDirr
//                 let notification = document.querySelector('.mdl-js-snackbar');
//                 notification.MaterialSnackbar.showSnackbar(
//                     {
//                         message: ("File moved sucessfully");
//                     }
//                 );
//             },
//             error: function (errorResponse) {
//                 console.log(errorResponse.responseText);
//                 alert(errorResponse.responseText);
//             }
//         });
//
//
//         $("#move-here-button").hide(1000);
//         $("#cancel-move-button").hide(1000);
//         fileToMove = null;
//     });
// });
