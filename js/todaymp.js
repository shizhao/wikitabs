var i = 0;
$('ul.todaymp li a.fa').click(function () {
  if (i == 0) {
    $("div#today_block").show();
    z_index_fun("div#today_block","open");
    var feedurl = 'https://tools.wmflabs.org/wikitabs/api/apitest.php?feed=featured';
    
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
        $("div.today_content").append(summary);
        baseurl = "https://zh.wikipedia.org";
        $("div.today_content a").each(function () {
          var href = $(this).attr("href");
          href = baseurl + href;
          $(this).attr("href", href);
        });
        $("div.today_content img").error(function () {
          var src = "https:" + $(this).attr("src");
          //can't replace()?
          $(this).off("error").attr("src", src);
        });
        var srcset = $("div.today_content img").attr("srcset");

        if (typeof srcset !== typeof undefined && srcset !== false) {
          $("div.today_content img").error(function () {
            var srcset = $(this).attr("srcset");
            srcset.replace(/\/\/upload.wikimedia.org/, "https:\/\/upload.wikimedia.org");
            $(this).off("error").attr("srcset", srcset);
          });
        }
      }
    }
    xhr.send();
    i = 1;
  } else {
    $("div#today_block").hide();
    z_index_fun("div#today_block","close");
    $("div.today_content").empty();
      i = 0;
    }
});

$("a#today_close").click(function () { 
  $("div#today_block").hide();
   z_index_fun("div#today_block","close");
  $("div.today_content").empty();
  i = 0;
});