// fork https://codepen.io/ottomata/pen/VKNyEw/?editors=0010

(function () {
  var feedNode = document.getElementById('feed');
  var errorNode = document.createElement('div');

  function makeDisplayBuffer(size) {
    var buffer = [];
    return function (element) {
      buffer.push(element);
      if (buffer.length > size) {
        var popped = buffer.shift();
        //console.log($(popped).html());
        $("li#rcstream").eq(size).remove();
      }
    }
  }

  var updateBuffer = makeDisplayBuffer(10);

  function startListening(eventsource) {
    var wiki = 'zhwiki';
    eventsource.onmessage = function(event) {
        // event.data will be a JSON string containing the message event.
      var change = JSON.parse(event.data);
      if (change.wiki == wiki) {
        printEvent({ type: 'message', data: change });
      }
    };
    console.log("start RC_Stream: "+eventsource.readyState);
    eventsource.onerror = function(msg) {
      // Don't print {isTrusted: true}.  (Is this an error?)
      if (!msg.isTrusted) {
        printEvent({
         type: 'error',
         data: msg
        });
      }
    };
  }

  function stopListening(eventsource) {
    eventsource.close();
    //eventsource = null;
    console.log("stop RC_Stream: "+eventsource.readyState);
  }

  var i = 0;
  var eventsource = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange");
  $('#RecentChanges').click(function () {
    if (i == 0) {
      //var eventsource = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange");
      $("#container").show();
      z_index_fun("#container","open");
      if (eventsource.readyState == 2) {
        eventsource = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange");
      }
      startListening(eventsource);
      i = 1;
    } else {
      $("#container").hide();
      z_index_fun("#container","close");
      stopListening(eventsource);
      i = 0;
    }
  });
  $("a#rc_close").click(function () { 
    $("#container").hide();
    z_index_fun("#container","close");
    stopListening(eventsource);
    i = 0;  
  });

  //var infoNode = document.createElement('div');
  //eventsource.onopen = function (event) {
  //    printEvent({
  //      type: 'info',
  //      message: 'Connecting...'
  //    });
  //};
  
  function printEvent(event) {
    var node;
    if (event.type === 'message') {
      var type = event.data.type;
      console.log(event.data.type);
      var title = event.data.title;
      var title_url = event.data.meta.uri;
      title = `<a href="${title_url}">${title}</a>`;
      var comment = event.data.comment;
      if (comment) {
        comment = `(${comment})`;
      }
      var server_url = event.data.server_url;
      var length = event.data.length;
      var user = event.data.user;
      user = `<a href="${server_url}/wiki/Special:Contributions/${encodeURI(user)}">${user}</a>`;

      if (event.data.bot) {
        var abbr = 'b';
      } else if (event.data.minor) {
        var abbr = 'm';
      } else if (event.data.type === 'new') {
        var abbr = 'N';
      } else if (event.data.type === 'external') {
        var abbr = 'd';
      } else {
        var abbr = '';
      }

      if (event.data.patrolled === true) {
        var patrolled = '!';
      } else {
        var patrolled = '';
      }
          
      if (type === 'edit') {
        var revision = event.data.revision;
        var diff_url = `${server_url}/wiki/Special:Diff/${revision.old}/${revision.new}`;
        var diff = `<a href="${diff_url}">差异</a>`;
        var size = length.new - length.old;
        if (size > 0) {
          size = `+${size}`;
        }
        node = `<li id="rcstream"><b>${patrolled}</b> <b>${abbr}</b> (${diff}) . . ${title} . . (${size}) . . ${user} ${comment}</li>\n\n`;
      } else if (type === 'new') {
        var size = `+${length.new}`;
        node = `<li id="rcstream"><b>${patrolled}</b> <b>${abbr}</b> ${title} . . (${size}) . . ${user} ${comment}</li>\n\n`;
      } else if (type === 'external') {
        node = `<li id="rcstream"><b>${patrolled}</b> <b>${abbr}</b> (${diff}) . . ${title} . . (${size}) . . ${user} ${comment}</li>\n\n`;
      } else if (type === 'log') {
        log_action_comment = `(${event.data.log_action_comment})`;
        node = `<li id="rcstream"><b>${patrolled}</b> <b>${abbr}</b> (${event.data.log_type}) . . ${title} . . ${user} ${log_action_comment} ${comment}</li>\n\n`;
      } else if (type === 'categorize') {
        node = `<li id="rcstream"><b>${patrolled}</b> <b>${abbr}</b> ${title} . . ${user} ${comment}</li>\n\n`;
      }
      $(feedNode).prepend(node);
      updateBuffer(node);
    } else if (event.type === 'error') {
      $(errorNode).empty().text('ERROR: ' + JSON.stringify(event.data));
      if (!errorNode.parentNode) {
        $(feedNode).before(errorNode);
      }
    } else if (event.type === 'info') {
      $(infoNode).text(event.message);
      if (!infoNode.parentNode) {
        $(feedNode).prepend(infoNode);
        updateBuffer(infoNode);
      }
    }
  }
  
}());