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
    $$('.panel-left .ACMenu').hide();
    $$('.panel-left .RedeemRewardMenu').hide();
  }
  else {
    $$('.panel-left a.profile').attr('href', '/user-profile/');
    $$('.panel-left .ScanCouponMenu').hide();
    $$('.panel-left .ACMenu').show();
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
  name: 'DURO Superstars',
  touch: {
    materialRipple: false
  },
  view: {
    animate: true,
    xhrCache: false,
  },
  dialog: {
    title: 'DURO Superstars',
  },
  routes: routes,
});

//var HomeURL = 'http://durosuperstars.com';
var HomeURL = 'http://sardaplydemo.netcarrots.in';

//var BaseURL = 'http://durosuperstars.com/API/AllServices.svc';
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
//var AuthUsername = 'lakshya';
//var AuthPassword = 'lakshya@001';
var AuthUsername = 'Novatis';
var AuthPassword = '!!Novatis!!';

// Custom Functions
function NA(input) {
  if (input == '' || input == null) {
    return 'NA';
  }
  else {
    return input;
  }
}

function zeroIFNULL(input) {
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
  if (!DeviceId) {
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
        alert("No Network Connection");
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
              params: { 'UserName': UserName },
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
  localStorage.removeItem("qr");
  localStorage.removeItem("UserTypeCode");
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

function hideLoader() {
  $$('.preloader-parent').hide();
}

function ShowNotificationCount() {
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

function orderStatusSubmit() {
  var Remarks = $$('#OrderStatusForm input[name=Remarks]').val();
  var MobileNo = $$('#OrderStatusForm input[name=MobileNo]').val();
  var SubOrderNumber = $$('#OrderStatusForm input[name=SubOrderId]').val();
  var Response = $$('#OrderStatusForm input[name=Response]:checked').val();
  var obj = {
    MobileNo: MobileNo,
    SubOrderNumber: SubOrderNumber,
    Response: Response,
    Remarks: Remarks
  };
  app.request({
    url: BaseURL + '/RedemptionOrderStatusFeedbackAPI',
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
      alert("No Network Connection");
    },
    success: function (data, status, xhr) {
      console.log(data);
      app.dialog.close();
      window.plugins.toast.show(data.ErrorMessage, 'long', 'bottom');
    },
    complete: function (xhr, status) {
      SpinnerPlugin.activityStop();
    }
  })
}

function orderStatus(MobileNo, SubOrderId) {
  var dialog = app.dialog.create({
    title: 'Order Received',
    destroyOnClose: true,
    closeByBackdropClick: true,
    text: `<form id="OrderStatusForm">
    <div class="row">
    <div class="col-50"><label class="radio"><input type="radio" name="Response" value="Y" checked><i style="display: inline-block;margin-right: 10px;vertical-align: sub;" class="icon-radio"></i>Yes</label></div>
    <div class="col-50"><label class="radio"><input type="radio" name="Response" value="N"><i style="display: inline-block;margin-right: 10px;vertical-align: sub;" class="icon-radio"></i>No</label></div>
    </div>
    <div class="row">
      <div class="col-100">
        <div class="list no-hairlines no-margin">
          <ul>
            <li class="item-content item-input no-padding">
              <div class="item-inner">
                <div class="item-input-wrap">
                  <input type="text" name="Remarks" placeholder="Enter Remarks">
                  <input type="hidden" name="MobileNo" value="${MobileNo}">
                  <input type="hidden" name="SubOrderId" value="${SubOrderId}">
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button onclick="orderStatusSubmit()" type="button" class="margin-top button button-fill SubmitButton">Submit</button>
      </div>
    </div>
    </form>
    `,
  }).open();
}

function checkLengthContractor(){
  var MobileNo = $$('.searchbar-contractor input[type=search]').val();
  if (MobileNo.length == 10) {
    app.router.navigate({
      name: 'contractor-details',
      params: { 'ContractorMobileNo': MobileNo },
    });
  }
}

function checkLengthDealer(){
  var MobileNo = $$('.searchbar-dealer input[type=search]').val();
  if (MobileNo.length == 10) {
    app.router.navigate({
      name: 'dealersearch-details',
      params: { 'DealerMobileNo': MobileNo },
    });
  }
}
