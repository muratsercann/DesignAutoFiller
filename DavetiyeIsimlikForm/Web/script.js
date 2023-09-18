
const columnNumber = 3;//bir satırda kaç sütün
const imgWidth = 250;//resim boyutu
const imgHeight = 380

var getCellValue = function name(params) {
    var num = "";
    if (settingsData.isPageNumberVisible.toUpperCase() == "TRUE" ) {
        num = params.num;
    }
    var nameText = params.name;
    if (params.name != "") { nameText = settingsData.prefix + " " + params.name; }
    var cellValue = '<td><div class="div1"><div class="div2"><span class="dot" ></span><span class="num">' + num + '</span><img width="'+imgWidth+'" src="' + settingsData.imageUrl + '"alt="Etiket" border="0"/>' +
        '<div class="mainTextView" style="">' +
        '<div class="message" style=""><p>' + settingsData.headerText + '</p></div>' +
        '<div class="name" style=""><p>' + nameText + '</p></div></div></div></div></td>';
    return cellValue;
}

var getMyHtml = function name(params) {
    var html = "";
    var cellValue = "";
    for (var i = 0, j = 0; i < params.length; i++) {
        //console.log(" i = " + i + ",j = " + j);
        cellValue = getCellValue({ name: params[i].trim(), num: (i + 1) });
        if (j == 0) {
            html += "<tr>\n";
        }
        if (j == columnNumber - 1) {

            html += cellValue;
            html += "</tr>\n";
            j = 0;
        }

        else {
            html += cellValue;
            j++;
        }

        if (i >= params.length - 1) {
            html += "</tr>\n";
        }
        //console.log(" a = " + a);
    }
    return html;
}

$(document).ready(function () {
    var myhtml = getMyHtml(names);
    //console.log(myhtml);
    $("#MainTable").append(myhtml);
});


