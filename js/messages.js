$("title").text(`${chrome.i18n.getMessage("tab_name")} - ${chrome.i18n.getMessage("ext_name")}`);
$("div#about a").attr("title", chrome.i18n.getMessage("about"));
$("li#today>a").text(chrome.i18n.getMessage("nav_todaymp"));
$("li#today>a").text(chrome.i18n.getMessage("nav_todaymp"));
$("li#featured a span.title").text(chrome.i18n.getMessage("nav_fa"));
$("li#good a span.title").text(chrome.i18n.getMessage("nav_ga"));
$("li#dyk a span.title").text(chrome.i18n.getMessage("nav_dyk"));
$("li#onthisday a span.title").text(chrome.i18n.getMessage("nav_onthisday"));
$("li#potd a span.title").text(chrome.i18n.getMessage("nav_potd"));
$("li#mostread a span.title").text(chrome.i18n.getMessage("nav_mostread"));
$("li#RecentChanges a").text(chrome.i18n.getMessage("nav_rc"));
$("li#Watchlist a").text(chrome.i18n.getMessage("nav_watchlist"));
$("div#container h2").text(chrome.i18n.getMessage("rc_h"));