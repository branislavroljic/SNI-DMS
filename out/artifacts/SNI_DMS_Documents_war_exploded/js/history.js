$(function () {
    $("#refresh-button").click(function () {
        $.ajax({
            type: 'GET',
            url: '?action=refresh_history',
            cache: false,
            dataType: 'json',
            success: function (jsonHistory) {
                document.getElementById("history_tbody").innerHTML = "";
                for(let i in jsonHistory) {
                    document.getElementById("history_tbody").innerHTML += "<tr>\n" +
                        "            <td class=\"mdl-data-table__cell--non-numeric\">" + jsonHistory[i].fileName + " </td>\n" +
                        "            <td class=\"mdl-data-table__cell--non-numeric\">" + jsonHistory[i].username + "</td>\n" +
                        "            <td class=\"mdl-data-table__cell--non-numeric\"> " + jsonHistory[i].type + "</td>\n" +
                        "            <td class=\"mdl-data-table__cell--non-numeric\">" + jsonHistory[i].time + " </td>\n" +
                        "        </tr>";
                }
            },
            error: function () {
                let notification = document.querySelector('.mdl-js-snackbar');
                notification.MaterialSnackbar.showSnackbar(
                    {
                        message: "Refresh failed!"
                    }
                );
            }
        });
    });
});
