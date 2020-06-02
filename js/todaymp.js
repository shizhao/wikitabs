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
            $("div#today_block").append(title);
            $("div#today_block").append(summary);
            baseurl = "https://zh.wikipedia.org";
            $("div#today_block a").each(function(){
                var href = $(this).attr("href");
                href = baseurl + href;
                $(this).attr("href",href);
            });
            }
        }
        xhr.send();
        i = 1;
      } else {
        $("div#today_block").hide();
        $("div#today_block").empty();
        i = 0;
      }
});