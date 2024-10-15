import { RouteItemConfig } from '@app/types/route';
import {
  ForgotPasswordPage,
  LoginPage,
  PurchasedHistory,
  SignUpPage,
  UserAccount,
  UserAddress,
  UserFavorite,
  UserSecurity,
  UserSettingPage,
  UserShare
} from '@app/utils/lazyLoad';

export const paths = {
  index: '/',
  login: '/login',
  signUp: '/sign-up',
  verifyAccount: '/verify-account',
  forgotPassword: '/forgot-password',
  pageNotFound: '/page-not-found',
  homePage: '/home-page',
  user: {
    index: '/user',
    account: 'account',
    history: 'order_history',
    security: 'security',
    share: 'share',
    address: 'address',
    favorite: 'favorite'
  },
  admin: {
    index: '/dashboard'
  }
};

export const authenticationRoute: RouteItemConfig[] = [
  {
    element: <LoginPage />,
    path: paths.login
  },
  {
    element: <SignUpPage />,
    path: paths.signUp
  },
  {
    element: <ForgotPasswordPage />,
    path: paths.signUp
  }
];

export const shopRoute: RouteItemConfig[] = [
  {
    element: <UserSettingPage />,
    path: paths.user.index,
    child: [
      { element: <UserAccount />, path: paths.user.account },
      { element: <PurchasedHistory />, path: paths.user.history },
      { element: <UserSecurity />, path: paths.user.security },
      { element: <UserFavorite />, path: paths.user.favorite },
      { element: <UserAddress />, path: paths.user.address },
      { element: <UserShare />, path: paths.user.share }
    ]
  }
];

export const adminRoute: RouteItemConfig[] = [
  {
    element: 'test ADMIN PAGE',
    path: paths.admin.index
  }
];
