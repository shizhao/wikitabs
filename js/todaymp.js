var i = 0;
$('ul.todaymp li a.fa').click(function () {
    if (i == 0) {
        $("div#today_block").show();
        var feedurl = 'https://tools.wmflabs.org/wikitabs/api/apitest.php?feed=featured';
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", feedurl, true);
        var resp = null;
    
        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          resp = JSON.parse(xhr.responseText);
          console.log(resp);
          var title = resp['title'][0];
          var summary = resp['summary'][0];
          

          title = `<h2>${title}</h2>`;
          $("div.today_content").append(title);
          $("div.today_content").append(summary);
          baseurl = "https://zh.wikipedia.org";
          $("div.today_content a").each(function(){
                var href = $(this).attr("href");
                href = baseurl + href;
                $(this).attr("href",href);
          });
          $("div.today_content img").error(function(){
            var src = "https:" + $(this).attr("src");
            //can't replace?
            //src.replace(/^\/\/upload.wikimedia.org/, "https:\/\/upload.wikimedia.org");
            $(this).off("error").attr("src", src);
          });
      
        }
      }
        xhr.send();
        i = 1;
    } else {
        $("div#today_block").hide();
        $("div.today_content").empty();
        i = 0;
    }
});

$("a#today_close").click(function () { 
  $("div#today_block").hide();
  $("div.today_content").empty();
  i = 0;
});