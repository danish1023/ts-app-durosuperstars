var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
  // Set Password page
  {
    path: '/set-password/',
    url: './pages/set-password.html',
    name: 'set-password',
  },
  // Change Password page
  {
    path: '/change-password/',
    componentUrl: './pages/change-password.html',
    name: 'change-password',
  },
  // First Login
  {
    path: '/first-login/',
    url: './pages/first-login.html',
    name: 'first-login',
  },
  // Login
  {
    path: '/login/:UserName',
    componentUrl: './pages/login.html',
    name: 'login',
    // options: {
    //   history: false,
    // },
  },
  // Signup page
   {
    path: '/sign-up/',
    componentUrl: './pages/sign-up.html',
    name: 'sign-up',
    // options: {
    //   animate: false,
    // },
  },
  // OTP page
  {
    path: '/otp/',
    componentUrl: './pages/otp.html',
    name: 'otp'
  },

  // Dashboard page
  {
    path: '/dashboard/',
    url: './pages/dashboard.html',
    name: 'dashboard',
    // options: {
    //   animate: false,
    // },
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
