// Dom7
var $$ = Dom7;
// Platform
var platform = 'android';
// API Version
var AppVersionAndroid = '1.2';
var AppVersionIOS = '1.0';

var User = localStorage.User;
if (User) {
  var UserData = JSON.parse(User);
  if (UserData.UserType == 'M') {
    $$('.panel-left a.profile').attr('href', '/member-profile/');
    $$('.panel-left .ScanCouponMenu').show();
    $$('.panel-left .TCMenu').hide();
    $$('.panel-left .RedeemRewardMenu').hide();
  }
  else {
    $$('.panel-left a.profile').attr('href', '/user-profile/');
    $$('.panel-left .ScanCouponMenu').hide();
    $$('.panel-left .TCMenu').show();
    $$('.panel-left .RedeemRewardMenu').show();
  }
}

// install plugin to Framework7
Framework7.use(Framework7Keypad);

// Init App
var app = new Framework7({
  id: 'com.techstreet.durosuperstars',
  root: '#app',
  theme: 'md',
  name: 'Duro Superstars',
  touch: {
    materialRipple: false
  },
  view: {
    animate: true,
    xhrCache: false,
  },
  dialog: {
    title: 'Duro Superstars',
  },
  routes: routes,
});

// API Base URL
var BaseURL = 'http://sardaplydemo.netcarrots.in/API/AllServices.svc';

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  on: {
    init: function (event, page) {
      console.log('App initialized');
    },
  }
});

// Basic Authorization
var AuthUsername = 'Novatis';
var AuthPassword = '!!Novatis!!';

// Custom Functions
function NA(input) {
  if (input == '') {
    return 'NA';
  }
  else {
    return input;
  }
}

function zeroIFNULL(input){
  if (input == null) {
    return '0';
  }
  else {
    return input;
  }
}

function checkVersion() {
  app.request({
    url: BaseURL + '/GetAPPVersionAPI',
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(AuthUsername + ":" + AuthPassword));
    },
    success: function (data, status, xhr) {
      if (platform == 'ios') {
        if (data.AppVersionIOS > AppVersionIOS) {
          app.dialog.confirm('A new version of the application is available. Please update your app.', 'New Version Available', 
            function () {
              navigator.app.exitApp();
            },
            function () {
              navigator.app.exitApp();
            }
          );
        }
      }
      if (platform == 'android') {
        if (data.AppVersionAndroid > AppVersionAndroid) {
          app.dialog.confirm('A new version of the application is available. Please update your app.', 'New Version Available', 
            function () {
              window.location.href = "https://play.google.com/store/apps/details?id=com.techstreet.durosuperstars";
              navigator.app.exitApp();
            },
            function () {
              navigator.app.exitApp();
            }
          );
        }
      }
    }
  })

}

function login() {
  var DeviceId = localStorage.fcm_token;
  if(!DeviceId){
    DeviceId = 'null';
  }
  var UserName = $$('#login-form-1 input[name=username]').val();
  if (UserName != '') {
    var obj = {
      UserName: UserName,
      DeviceId: DeviceId,
      OSType: device.platform
    };
    app.request({
      url: BaseURL + '/Login',
      method: 'POST',
      dataType: 'json',
      data: obj,
      contentType: 'application/json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(AuthUsername + ":" + AuthPassword));
        var spinnerOptions = { dimBackground: false };
        SpinnerPlugin.activityStart(null, spinnerOptions);
      },
      error: function (xhr, status) {
        alert("Error: " + status);
      },
      success: function (data, status, xhr) {
        console.log(data);
        console.log(JSON.stringify(obj));
        if (data.ErrorCode == '-1016') {
          app.router.navigate({
            name: 'login',
            params: { 'UserName': UserName },
          });
        }
        else if (data.ErrorCode == '-1020' || data.ErrorCode == '-1019') {
          app.router.navigate({
            name: 'first-login',
            params: { 'UserName': UserName },
          });
        }
        else if (data.ErrorCode == '-1022') {
          app.dialog.alert(data.ErrorMessage, function () {
            app.router.navigate({
              name: 'set-password',
              params: { 'UserName': UserName, 'OTP': '' },
            });
          });
        }
        else {
          app.dialog.alert(data.ErrorMessage);
        }
      },
      complete: function (xhr, status) {
        SpinnerPlugin.activityStop();
      }
    })
  }
  else {
    app.dialog.alert("Please enter username");
  }
}

function logout() {
  localStorage.removeItem("User");
  localStorage.removeItem("SignUpData");
  localStorage.removeItem("MyProfile");
  app.router.navigate('/');
}

function playVideo(videoUrl) {
  window.plugins.streamingMedia.playVideo(videoUrl);
}

function notificationClick(NotificationId, Flag) {
  var UserData = JSON.parse(localStorage.User);
  var obj = {
    NotificationId: NotificationId,
    MobileNo: UserData.MobileNo,
    Flag: Flag
  };
  app.request({
    url: BaseURL + '/UpdateNotificationResponse',
    method: 'POST',
    dataType: 'json',
    data: obj,
    contentType: 'application/json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(AuthUsername + ":" + AuthPassword));
    },
    success: function (data, status, xhr) {
      app.router.navigate('/notifications/', {
        reloadCurrent: true,
        ignoreCache: true,
      });
    },
  })
}

function hideLoader(){
  $$('.preloader-parent').hide();
}

function ShowNotificationCount(){
  var User = localStorage.User;
  var UserData = JSON.parse(User);
  var obj = {
    MobileNo: UserData.MobileNo,
  };
  app.request({
    url: BaseURL + '/GetNotification',
    method: 'POST',
    dataType: 'json',
    data: obj,
    contentType: 'application/json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(AuthUsername + ":" + AuthPassword));
    },
    success: function (data, status, xhr) {
      if (data.ErrorCode == '0') {
        $$('.NotificationCount').html(data.Response.NotificationDetails.length);
      }
    }
  })
}