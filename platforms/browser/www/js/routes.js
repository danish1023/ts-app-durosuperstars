var routes = [
  // Index
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // About
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
  // Set Password
  {
    path: '/set-password/:UserName/:OTP/',
    componentUrl: './pages/set-password.html',
    name: 'set-password',
  },
  // Change Password
  {
    path: '/change-password/',
    componentUrl: './pages/change-password.html',
    name: 'change-password',
  },
  // First Login
  {
    path: '/first-login/:UserName/',
    componentUrl: './pages/first-login.html',
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
  // Signup
   {
    path: '/sign-up/',
    componentUrl: './pages/sign-up.html',
    name: 'sign-up',
    // options: {
    //   animate: false,
    // },
  },
  // OTP
  {
    path: '/otp/',
    componentUrl: './pages/otp.html',
    name: 'otp',
    // options: {
    //   reloadCurrent: true,
    //   ignoreCache: true,
    // },
  },

  // Member Dashboard
  {
    path: '/dashboard/',
    componentUrl: './pages/dashboard.html',
    name: 'dashboard',
  },

  // User Dashboard
  {
    path: '/user-dashboard/',
    componentUrl: './pages/user-dashboard.html',
    name: 'user-dashboard',
  },

  // Member Profile
  {
    path: '/member-profile/',
    componentUrl: './pages/member-profile.html',
    name: 'member-profile',
  },

  // User Profile
  {
    path: '/user-profile/',
    componentUrl: './pages/user-profile.html',
    name: 'user-profile',
  },

  // Contractor List
  {
    path: '/contractor-list/',
    componentUrl: './pages/contractor-list.html',
    name: 'contractor-list',
  },

  // Dealer List
  {
    path: '/dealer-list/',
    componentUrl: './pages/dealer-list.html',
    name: 'dealer-list',
  },

  // Program Booklet
  {
    path: '/program-booklet/',
    componentUrl: './pages/program-booklet.html',
    name: 'program-booklet',
  },

  // User Guide
  {
    path: '/user-guide/',
    componentUrl: './pages/user-guide.html',
    name: 'user-guide',
  },

  // Training Videos
  {
    path: '/training-videos/',
    componentUrl: './pages/training-videos.html',
    name: 'training-videos',
  },

  // Calculator
  {
    path: '/calculator/',
    componentUrl: './pages/calculator.html',
    name: 'calculator',
  },

  // Campaign
  {
    path: '/campaign/',
    componentUrl: './pages/campaign.html',
    name: 'campaign',
  },

  // Account Statement
  {
    path: '/account-statement/',
    componentUrl: './pages/account-statement.html',
    name: 'account-statement',
  },

  // Query/Complaints
  {
    path: '/query/',
    componentUrl: './pages/query.html',
    name: 'query',
  },

  // Executive Appointment
  {
    path: '/executive-appointment/',
    componentUrl: './pages/executive-appointment.html',
    name: 'executive-appointment',
  },

  // News
  {
    path: '/news/',
    componentUrl: './pages/news.html',
    name: 'news',
  },

  // Company Profile
  {
    path: '/company-profile/',
    componentUrl: './pages/company-profile.html',
    name: 'company-profile',
  },

  // Scan code
  {
    path: '/scan-code/',
    componentUrl: './pages/scan-code.html',
    name: 'scan-code',
  },

  // Rejected coupon history
  {
    path: '/rejectedcoupon-history/',
    componentUrl: './pages/rejectedcoupon-history.html',
    name: 'rejectedcoupon-history',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
