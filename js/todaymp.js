$('ul.todaymp li').click(function () {
  var feed = $(this).attr("id");
  console.log($(this).attr("id"));

  $("div.today_content").empty();
  $("div#today_block").show();

  z_index_fun("div#today_block", "open");

  if (feed == "mostread") {
    var feedurl = "https://tools.wmflabs.org/wikitabs/api/topapi.php";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", feedurl, true);
    var resp = null;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        resp = JSON.parse(xhr.responseText);
        console.log(resp);

        var date = resp['date'];
        date = date.slice(0, -1);
        var block_title = `<h3>今日热门条目：${date}</h3>`;
        $("div.today_content").append(block_title);
        var scollHeight = window.screen.availHeight * 0.7;
        $("div.today_content").append(`<div class="top_page" style='height:${scollHeight}px;overflow-y:auto'><ol></ol></div>`);
        for (n in resp) {
          if (typeof resp[n] === 'object') {
            var title = resp[n]['title'];
            var views = resp[n]['views'];
            var image = resp[n]['image'];
            var url = resp[n]['url'];
            var extract = resp[n]['extract'];
            var description = resp[n]['description'];
            if (description != null) {
              var item = `<li><a href="${url}" target="_blank">${title}</a><small style="float: right;">${views}</small><br /><small>${description}</small></li>\n`;
            } else {
              var item = `<li><a href="${url}" target="_blank">${title}</a><small style="float: right;">${views}</small></li>\n`;
            }

            $("div.today_content ol").append(item);
          }
        }

      }
    }

  } else {
    var feedurl = `https://tools.wmflabs.org/wikitabs/api/mpapi.php?feed=${feed}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", feedurl, true);
    var resp = null;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        resp = JSON.parse(xhr.responseText);
        console.log(resp);

        var title = resp['title'][0];
        var summary = resp['summary'][0];
        title = `<h3>${title}</h3>`;

        $("div.today_content").append(title);
        $("div.today_content").append("<div></div>");
        $("div.today_content div").addClass(feed);
        $("div.today_content div").append(summary);

        urlfix();
        
        //fix poanoramic width
        if (parseInt($('div.potd img').attr("width")) > window.screen.availWidth) {
          //console.log($('div.potd img').attr("width"));
          $('div.potd img').attr("width", window.screen.availWidth * .8);
          $('div.potd li.gallerybox').attr("style", "width:auto");
          $('div.potd li.gallerybox > div').attr("style", "width:auto");
          $('div.potd li.gallerybox div.thumb').attr("style", "width:auto");
          $('div.potd li.gallerybox div.thumb+div.gallerytextwrapper').attr("style", "width:auto");
        }
        // remove background-color of potd
        $("div.potd div.mw-parser-output").css("background-color","transparent");
      }
    }
  }
  xhr.send();
});

$("a#today_close").click(function () {
  $("div#today_block").hide();
  z_index_fun("div#today_block", "close");
  $("div.today_content").empty();
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