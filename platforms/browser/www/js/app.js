// Dom7
var $$ = Dom7;

var User = localStorage.User;
if (User) {
  var UserData = JSON.parse(User);
  if (UserData.UserType == 'M') {
    $$('.panel-left a.profile').attr('href', '/member-profile/');
  }
  else {
    $$('.panel-left a.profile').attr('href', '/user-profile/');
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
  view: {
    animate: true,
    xhrCache: false,
  },
  dialog: {
    title: 'Duro Superstars',
  },
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  on: {
    init: function (event, page) {
      console.log('App initialized');
    },
  }
});

// API Base URL
var BaseURL = 'http://sardaplydemo.netcarrots.in/API/AllServices.svc';

// Basic Authorization
var AuthUsername = 'Novatis';
var AuthPassword = '!!Novatis!!';

// Custom Functions
function NA(input){
  if(input == ''){
    return 'NA';
  }
  else{
    return input;
  }
}

function testMe(){
  alert('ok');
}

function login() {
  var UserName = $$('#login-form-1 input[name=username]').val();
  if (UserName != '') {
    var obj = {
      UserName: UserName,
      DeviceId: 'D-Device',
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
        if (data.ErrorCode == '-1016') {
          app.router.navigate({
            name: 'login',
            params: { 'UserName': UserName },
          });
        }
        else if (data.ErrorCode == '-1020') {
          app.router.navigate({
            name: 'first-login',
            params: { 'UserName': UserName },
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
  else{
    app.dialog.alert("Please enter username");
  }
}

function logout() {
  localStorage.removeItem("User");
  app.router.navigate('/');
}

function booklet(){
  PDFViewer.openPDF('http://sardaplydemo.netcarrots.in/Admin/ProgramBooklet/ProgramBookletV1.0.pdf');
}
