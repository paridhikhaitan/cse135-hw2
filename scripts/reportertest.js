window.addEventListener("load", () => {
  if (localStorage.getItem("browser-css-enabled") === null) {
    var el = document.getElementById("purgeDiv");

    if (el.style.fontSize === "16px") {
      localStorage.setItem("browser-css-enabled", true);
    } else {
      localStorage.setItem("browser-css-enabled", false);
    }
  }
  //PURGE ALL DATA
  document.getElementById("purgeAllData").onclick = () => {
    var con = confirm(
      "Are you sure that you want to delete all existing data?"
    );
    if (con === true) {
      localStorage.clear();
      console.log("All data cleared");
    }
  };

  //STATIC DATA
  let staticData = [
    { name: "User Agent", data: "browser-user-agent" },
    {
      name: "User Language",
      data: "browser-user-language"
    },
    {
      name: "Cookies Enabled",
      data: "browser-cookie-enabled"
    },
    {
      name: "JavaScript Enabled",
      data: "browser-javascript-enabled"
    },
    {
      name: "Images Enabled",
      data: "browser-images-enabled"
    },
    {
      name: "CSS Enabled",
      data: "browser-css-enabled"
    },
    {
      name: "Screen Dimension Height",
      data: "window-current-height"
    },
    {
      name: "Screen Dimension Width",
      data: "window-current-width"
    },
    {
      name: "Window Height",
      data: "screen-height"
    },
    {
      name: "Window Width",
      data: "screen-width"
    },
    {
      name: "Effective Connection Type",
      data: "effective-connection-type"
    }
  ];

  //STATIC DATA
  var staticTable = document.createElement("table");
  var staticDiv = document.getElementById("staticData");
  staticDiv.appendChild(staticTable);

  for (var i = 0; i < staticData.length; i++) {
    let row = staticTable.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = staticData[i].name;
    cell2.innerHTML = localStorage.getItem(staticData[i].data);

    let btn = document.createElement("button");
    btn.innerHTML = "PURGE";
    cell3.appendChild(btn);

    btn.onclick = (function(i) {
      return function() {
        var con = confirm("Are you sure that you want to delete this event?");
        if (con === true) {
          console.log(staticData[i].data);
          cell2.innerHTML = "";
          localStorage.removeItem(staticData[i].data);
        }
      };
    })(i);
  }

  //PERFORMANCE DATA
  var performanceDiv = document.getElementById("performaceData");
  var performanceTable = document.createElement("table");
  performanceDiv.appendChild(performanceTable);

  var performanceJSON = JSON.parse(
    localStorage.getItem("browser-performance-data")
  );
  for (o in performanceJSON) {
    var row = performanceTable.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = o;
    cell2.innerHTML = performanceJSON[o];
  }

  var starttime = document.createElement("div");
  starttime.innerHTML =
    "Start Time : " + localStorage.getItem("navigation-start") + " ms";
  var endtime = document.createElement("div");
  endtime.innerHTML =
    "End Time : " + localStorage.getItem("dom-event-end") + " ms";
  var totalTime = document.createElement("div");
  var time =
    localStorage.getItem("dom-event-end") -
    localStorage.getItem("navigation-start");
  totalTime.innerHTML = "Total Time : " + time + " ms";
  performanceDiv
    .appendChild(starttime)
    .appendChild(endtime)
    .appendChild(totalTime);

  //DYANAMIC DATA

  document.getElementById(
    "viewAllMouseClickEvents"
  ).onclick = displayMouseClicks;

  document.getElementById("viewAllMouseMoveEvents").onclick = displayMouseMove;
  document.getElementById("viewAllKeystrokeEvents").onclick = displayKeystroke;
  document.getElementById("viewAllScrollEvents").onclick = displayScroll;
  document.getElementById("viewBeforeUnload").onclick = displayBeforeUnload;
});

//DISPLAY EVENT
function displayEventModal(event) {
  window.scrollTo(0, 0);
  var dialog = document.getElementById("mainDialog");
  dialog.open = true;
  var dialogTable = document.createElement("table");
  dialog.appendChild(dialogTable);

  dialogTable.style.background = "#d3d3d3";

  var currEvent = JSON.parse(event);
  console.log(currEvent);

  for (ob in currEvent) {
    var row = dialogTable.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = ob;
    cell2.innerHTML = currEvent[ob];
  }

  var closeBtn = document.createElement("button");
  closeBtn.innerHTML = "CLOSE";
  dialogTable.appendChild(closeBtn);

  closeBtn.onclick = () => {
    dialog.open = false;
    dialogTable.innerHTML = "";
  };
}

//BEFORE UNLOAD
displayBeforeUnload = () => {
  var allUnloads = JSON.parse(localStorage.getItem("before-unload-arr"));
  var unloadDivs = document.getElementById("beforeUnloadEvents");
  var unloadTable = document.createElement("table");
  unloadDivs.style.display = "block";
  unloadDivs.style.height = "500px";
  unloadDivs.style.overflow = "scroll";

  unloadDivs.appendChild(unloadTable);

  for (var i = 0; i < allUnloads.length; i++) {
    var row = unloadTable.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = allUnloads[i].url;
    cell2.innerHTML = allUnloads[i].date;
    cell3.innerHTML = allUnloads[i].time;

    var viewBtn = document.createElement("button");
    viewBtn.innerHTML = "VIEW EVENT";
    cell4.appendChild(viewBtn);

    viewBtn.style.background = "#ddd3ee";
    viewBtn.style.color = "#8565c4";

    viewBtn.onclick = (function(i) {
      return function() {
        displayEventModal(allUnloads[i].data);
      };
    })(i);

    var btn = document.createElement("button");
    btn.innerHTML = "PURGE";
    cell5.appendChild(btn);

    btn.onclick = (function(i) {
      return function() {
        var con = confirm("Are you sure that you want to delete this event?");

        if (con === true) {
          console.log(i);
          allUnloads.splice(i, 1);
          localStorage.setItem("before-unload-arr", JSON.stringify(allUnloads));
        }
      };
    })(i);
  }
};

//DISPLAY SCROLL
displayScroll = () => {
  var allScrolls = JSON.parse(localStorage.getItem("scroll-arr"));

  var scrollsDiv = document.getElementById("scrollEvents");
  var scrollsTable = document.createElement("table");

  scrollsDiv.style.height = "500px";
  scrollsDiv.style.overflow = "scroll";

  scrollsDiv.appendChild(scrollsTable);
  for (var i = 0; i < allScrolls.length; i++) {
    var row = scrollsTable.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = allScrolls[i].url;
    cell2.innerHTML = allScrolls[i].date;
    cell3.innerHTML = allScrolls[i].time;

    var viewBtn = document.createElement("button");
    viewBtn.innerHTML = "VIEW EVENT";
    cell4.appendChild(viewBtn);

    viewBtn.style.background = "#ddd3ee";
    viewBtn.style.color = "#8565c4";

    viewBtn.onclick = (function(i) {
      return function() {
        displayEventModal(allScrolls[i].data);
      };
    })(i);

    var btn = document.createElement("button");
    btn.innerHTML = "PURGE";
    cell5.appendChild(btn);

    btn.onclick = (function(i) {
      return function() {
        var con = confirm("Are you sure that you want to delete this event?");
        if (con === true) {
          console.log(i);
          allScrolls.splice(i, 1);
          localStorage.setItem("scroll-arr", JSON.stringify(allScrolls));
        }
      };
    })(i);
  }
};

//DISPLAY KEYSTROKE
displayKeystroke = () => {
  var allKeystrokes = JSON.parse(localStorage.getItem("keystroke-arr"));
  var keystrokeDiv = document.getElementById("keystrokeEvents");
  var keystrokeTable = document.createElement("table");
  keystrokeDiv.style.display = "block";
  keystrokeDiv.style.height = "500px";
  keystrokeDiv.style.overflow = "scroll";

  keystrokeDiv.appendChild(keystrokeTable);

  for (var i = 0; i < allKeystrokes.length; i++) {
    var row = keystrokeTable.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = allKeystrokes[i].url;
    cell2.innerHTML = allKeystrokes[i].date;
    cell3.innerHTML = allKeystrokes[i].time;

    var viewBtn = document.createElement("button");
    viewBtn.innerHTML = "VIEW EVENT";
    cell4.appendChild(viewBtn);

    viewBtn.style.background = "#ddd3ee";
    viewBtn.style.color = "#8565c4";

    viewBtn.onclick = (function(i) {
      return function() {
        displayEventModal(allKeystrokes[i].data);
      };
    })(i);

    var btn = document.createElement("button");
    btn.innerHTML = "PURGE";
    cell5.appendChild(btn);

    btn.onclick = (function(i) {
      return function() {
        var con = confirm("Are you sure that you want to delete this event?");

        if (con === true) {
          console.log(i);
          allKeystrokes.splice(i, 1);
          localStorage.setItem("keystroke-arr", JSON.stringify(allKeystrokes));
        }
      };
    })(i);
  }
};

//DISPLAY MOUSE MOVE
displayMouseMove = () => {
  var allMouseMove = JSON.parse(localStorage.getItem("mouse-move-arr"));
  var mouseMoveDiv = document.getElementById("mouseMoveEvents");
  var mouseMoveTable = document.createElement("table");
  mouseMoveDiv.style.display = "block";
  mouseMoveDiv.style.height = "500px";
  mouseMoveDiv.style.overflow = "scroll";

  mouseMoveDiv.appendChild(mouseMoveTable);

  for (var i = 0; i < allMouseMove.length; i++) {
    var row = mouseMoveTable.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = allMouseMove[i].url;
    cell2.innerHTML = allMouseMove[i].date;
    cell3.innerHTML = allMouseMove[i].time;

    var viewBtn = document.createElement("button");
    viewBtn.innerHTML = "VIEW EVENT";
    cell4.appendChild(viewBtn);

    viewBtn.style.background = "#ddd3ee";
    viewBtn.style.color = "#8565c4";

    viewBtn.onclick = (function(i) {
      return function() {
        displayEventModal(allMouseMove[i].data);
      };
    })(i);

    var btn = document.createElement("button");
    btn.innerHTML = "PURGE";
    cell5.appendChild(btn);

    btn.onclick = (function(i) {
      return function() {
        var con = confirm("Are you sure that you want to delete this event?");

        if (con === true) {
          allMouseMove.splice(i, 1);
          localStorage.setItem("mouse-move-arr", JSON.stringify(allMouseMove));
        }
      };
    })(i);
  }
};

//DISPLAY MOUSE CLICKS
displayMouseClicks = () => {
  var allMouseClicks = JSON.parse(localStorage.getItem("mouse-click-arr"));
  var mouseClickTable = document.createElement("table");
  var mouseClickDiv = document.getElementById("mouseClickEvents");
  mouseClickDiv.style.display = "block";
  mouseClickDiv.style.height = "500px";
  mouseClickDiv.style.overflow = "scroll";

  mouseClickDiv.appendChild(mouseClickTable);

  for (var i = 0; i < allMouseClicks.length; i++) {
    var row = mouseClickTable.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = allMouseClicks[i].url;
    cell2.innerHTML = allMouseClicks[i].date;
    cell3.innerHTML = allMouseClicks[i].time;

    var viewBtn = document.createElement("button");
    viewBtn.innerHTML = "VIEW EVENT";
    cell4.appendChild(viewBtn);

    viewBtn.style.background = "#ddd3ee";
    viewBtn.style.color = "#8565c4";

    viewBtn.onclick = (function(i) {
      return function() {
        displayEventModal(allMouseClicks[i].data);
      };
    })(i);

    var btn = document.createElement("button");
    btn.innerHTML = "PURGE";
    cell5.appendChild(btn);

    btn.onclick = (function(i) {
      return function() {
        var con = confirm("Are you sure that you want to delete this event?");
        if (con === true) {
          allMouseClicks.splice(i, 1);
          localStorage.setItem(
            "mouse-click-arr",
            JSON.stringify(allMouseClicks)
          );
        }
      };
    })(i);
  }
};
