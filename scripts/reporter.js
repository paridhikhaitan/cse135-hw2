//JUST COLLECTS ALL THE DATA

window.addEventListener("load", () => {
  var windowURL = window.location.href;
  console.log(windowURL);
  var mouseClickArr =
    JSON.parse(localStorage.getItem("mouse-click-arr")) || new Array();
  var mouseMoveArr =
    JSON.parse(localStorage.getItem("mouse-move-arr")) || new Array();
  var keystroke =
    JSON.parse(localStorage.getItem("keystroke-arr")) || new Array();
  var scrollArr = JSON.parse(localStorage.getItem("scroll-arr")) || new Array();

  var beforeUnloadArr =
    JSON.parse(localStorage.getItem("before-unload-arr")) || new Array();

  //STATIC DATA

  if (localStorage.getItem("browser-user-agent") === null) {
    localStorage.setItem("browser-user-agent", navigator.userAgent);
  }

  if (localStorage.getItem("browser-cookie-enabled") === null) {
    localStorage.setItem("browser-cookie-enabled", navigator.cookieEnabled);
  }

  if (localStorage.getItem("browser-user-language") === null) {
    localStorage.setItem("browser-user-language", navigator.language);
  }

  if (localStorage.getItem("browser-images-enabled") === null) {
    var allImages = document.getElementsByTagName("img");
    localStorage.setItem("browser-images-enabled", true);
    for (var i = 0; i < allImages.length; i++) {
      allImages[i].onerror = () => {
        localStorage.setItem("browser-images-enabled", false);
      };
    }
  }

  if (localStorage.getItem("browser-javascript-enabled") === null) {
    localStorage.setItem("browser-javascript-enabled", true);
  }

  if (localStorage.getItem("window-current-width") === null) {
    localStorage.setItem("window-current-width", window.innerWidth);
  }

  if (localStorage.getItem("window-current-height") === null) {
    localStorage.setItem("window-current-height", window.innerHeight);
  }

  if (localStorage.getItem("screen-height") === null) {
    localStorage.setItem("screen-height", screen.height);
  }

  if (localStorage.getItem("screen-width") === null) {
    localStorage.setItem("screen-width", screen.width);
  }

  if (localStorage.getItem("effective-connection-type") === null) {
    localStorage.setItem(
      "effective-connection-type",
      navigator.connection.effectiveType
    );
  }

  //PERFORMANCE LOADING INFORMATION
  if (localStorage.getItem("browser-performance-data") === null) {
    var performanceData = window.performance.timing;
    localStorage.setItem(
      "browser-performance-data",
      JSON.stringify(performanceData)
    );

    localStorage.setItem("navigation-start", performanceData.navigationStart);
    localStorage.getItem(
      "dom-event-start",
      performanceData.domContentLoadedEventStart
    );
    localStorage.setItem(
      "dom-event-end",
      performanceData.domContentLoadedEventEnd
    );
  }

  //DYNAMIC DATA

  //MOUSE CLICKS
  document.onclick = event => {
    const d = new Date();
    var eventObj = serializeObject(event, 1);

    var currentClick = {
      url: windowURL,
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
      data: eventObj
    };

    mouseClickArr.push(currentClick);
    localStorage.setItem("mouse-click-arr", JSON.stringify(mouseClickArr));
  };

  //MOUSE MOVE
  document.onmousemove = event => {
    const d = new Date();
    var eventObj = serializeObject(event, 1);

    var currentMove = {
      url: windowURL,
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
      data: eventObj
    };

    mouseMoveArr.push(currentMove);
    localStorage.setItem("mouse-move-arr", JSON.stringify(mouseMoveArr));
  };

  //KEYSTROKE

  document.onkeypress = event => {
    console.log(keystroke);
    const d = new Date();
    var eventObj = serializeObject(event, 1);

    var currentKey = {
      url: windowURL,
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
      data: eventObj
    };

    keystroke.push(currentKey);
    localStorage.setItem("keystroke-arr", JSON.stringify(keystroke));
  };

  //SCROLL

  document.onscroll = event => {
    const d = new Date();
    var eventObj = serializeObject(event, 1);

    var currentScroll = {
      url: windowURL,
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
      data: eventObj
    };
    scrollArr.push(currentScroll);
    localStorage.setItem("scroll-arr", JSON.stringify(scrollArr));
  };

  //BEFORE UNLOAD
  window.onbeforeunload = () => {
    const d = new Date();
    var eventObj = serializeObject(event, 1);

    var currentLoad = {
      url: windowURL,
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString(),
      data: eventObj
    };
    beforeUnloadArr.push(currentLoad);
    localStorage.setItem("before-unload-arr", JSON.stringify(beforeUnloadArr));
  };
});

//SERIALIZE EVENT
function serializeObject(event, depth) {
  // change max_depth to see more levels, for a touch event, 2 is good
  if (depth > 1) return "object [Object]";

  const jsonEvent = {};
  for (let k in event) {
    let value = event[k];
    if (typeof value === "object") value = serializeObject(value, depth + 1);
    jsonEvent[k] = value;
  }

  return JSON.stringify(jsonEvent);
}
