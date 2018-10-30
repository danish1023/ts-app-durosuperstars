// Dom7
var $$ = Dom7;

// Init App
var app = new Framework7({
  id: 'com.techstreet.durosuperstars',
  root: '#app',
  theme: 'auto',
  view: {
    pushState: false,
    uniqueHistory: true,
    xhrCache: false,
  },
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Custom Functions
function showSpinner() {
  SpinnerPlugin.activityStart("Please wait...");
  setTimeout(function () {
    SpinnerPlugin.activityStop();
  }, 3000);
}
function showSpinner2() {
  var options = { dimBackground: false };
  SpinnerPlugin.activityStart(null, options);
  setTimeout(function () {
    SpinnerPlugin.activityStop();
  }, 3000);
}
function showToast() {
  window.plugins.toast.show('Toast on Bottom', 'long', 'bottom');
}
function showScanner() {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      if (!result.cancelled) {
        alert(result.text);
      }
    },
    function (error) {
      alert("Error: " + error);
    },
    {
      prompt: "Place QR code/Barcode inside the scan area"
    }
  );
}
function callMe() {
  window.plugins.CallNumber.callNumber(onSuccess, onError, "+919267965329", true);
  function onSuccess(result) {
    console.log("Success: " + result);
  }
  function onError(result) {
    window.plugins.toast.show("Error: " + result, 'long', 'bottom');
  }
}
function flashLight() {
  window.plugins.flashlight.available(function (isAvailable) {
    if (isAvailable) {
      window.plugins.flashlight.toggle(
        function () { }, // optional success callback
        function () { }, // optional error callback
        { intensity: 0.3 } // optional as well, used on iOS when switching on
      );
    } else {
      window.plugins.toast.show("Flashlight not available on this device", 'long', 'bottom');
    }
  });
}
function checkHeadset() {
  window.HeadsetDetection.detect(function (detected) {
    if (detected == true) {
      var message = 'Detected';
    }
    else {
      var message = 'Not Detected';
    }
    window.plugins.toast.show(message, 'long', 'bottom');
  });
}
