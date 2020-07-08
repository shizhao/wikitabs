var w = window.screen.availWidth;
var h = window.screen.availHeight;
var baseURL = 'https://wikitabs.toolforge.org/api/api.php?';
var searchParams = new URLSearchParams();
searchParams.append('w', w);
searchParams.append('h', h);
var URL = baseURL + searchParams.toString();

var xhr = new XMLHttpRequest();
xhr.open("GET", URL, true);
var resp = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        resp = JSON.parse(xhr.responseText);
        console.log(resp);
        var imageurl = resp['imageurl'];
        var backgroundcss = 'background:url(' + imageurl + ') no-repeat;background-size:cover;background-color:transparent;background-position:center center';
        $('body').attr('style', backgroundcss);

        var title = resp['title'].slice(5, resp['title'].lastIndexOf("."));
        var file_page = resp['file_page'];
        var artist = resp['artist'];
        var credit = resp['credit'];
        var license = resp['license'];
        var license_url = resp['license_url'];
        if (license_url) {
            license = `<a href="${license_url}" target="_blank">${license}</a>`
        }

        var imagecredit = `<a href="${file_page}" target="_blank">${title}</a><br />`;
        imagecredit = imagecredit + 'by ' + artist + ' - ' + credit + ' (' + license + ')';
        $('div.imagecredit').append(imagecredit);
    }
}
xhr.send();

function z_index_fun(id, status) {
    var z_index = 1;
    $('div.display_none').each(function () {
        $(this).css("z-index", z_index);
        if (status == "open") {
            $(id).css("z-index", z_index + 1);
        } else if (status == "close") {
            $(this).css("z-index", z_index - 1);
        }
    });
    return this;
}

$.getJSON("manifest.json", function (data) {
    var ver = `<small>v ${data.version}</small>`;
    $('div#about').append(ver);
});

function urlfix() {
    baseurl = "https://zh.wikipedia.org";
    $("div.today_content a").each(function () {
      var href = $(this).attr("href");
      href = baseurl + href;
      $(this).attr("href", href);
    });
    $("div.today_content img").error(function () {
      var src = "https:" + $(this).attr("src");
      $(this).off("error").attr("src", src);
    });
  
    var srcset = $("div.today_content img").attr("srcset");
    if (typeof srcset !== typeof undefined && srcset !== false) {
      $("div.today_content img").error(function () {
        var srcset = $(this).attr("srcset");
        srcset = srcset.replace(/\/\/upload\.wikimedia\.org/g, "https:\/\/upload.wikimedia.org");
        $(this).off("error").attr("srcset", srcset);
      });
    }
  }