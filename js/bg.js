var w = window.screen.availWidth;
var h = window.screen.availHeight;
var baseURL = 'https://tools.wmflabs.org/wikitabs/api/api.php?';
var searchParams = new URLSearchParams();
searchParams.append('w',w);
searchParams.append('h',h);
var URL = baseURL + searchParams.toString();

var xhr = new XMLHttpRequest();
xhr.open("GET", URL, true);
var resp = null;
xhr.onreadystatechange = function() {
if (xhr.readyState == 4) {
    resp = JSON.parse(xhr.responseText);
    console.log(resp);
    var imageurl = resp['imageurl'];
    var backgroundcss = 'background:url(' + imageurl + ') no-repeat;background-size:cover;background-color:transparent;background-position:center center';
    $('body').attr('style', backgroundcss);

    var title = resp['title'].slice(5,resp['title'].lastIndexOf("."));
    var file_page = resp['file_page'];
    var artist = resp['artist'];
    var credit = resp['credit'];
    var license = resp['license'];
    var license_url = resp['license_url'];
    if (license_url){
        license = '<a href="'+license_url+'">'+license+'</a>'
        }

    var imagecredit = '<a href="'+ file_page + '">'+ title + '</a><br />';
    imagecredit = imagecredit + 'by ' + artist + ' - ' + credit + ' (' + license + ')';
    $('div.imagecredit').append(imagecredit);
    }
}
xhr.send();

//$('#RecentChanges').click(function () {
//    $("#container").toggleClass("rcdisplay_none");
//});
