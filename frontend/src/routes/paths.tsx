import { Navigate } from 'react-router-dom';

import { AutoAwesome, Dashboard, FiberManualRecord, ShoppingCart } from '@mui/icons-material';

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
    dashboard: '/dashboard',
    ecommerce: {
      index: '/ecommerce',
      category: 'category',
      products: 'products',
      createProduct: 'create-product'
    }
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
    element: 'Dashboard',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Dashboard',
      icon: <Dashboard />
    }
  },
  {
    path: paths.admin.ecommerce.index,
    element: <Navigate to={'/ecommerce/category'} />
  },
  {
    element: 'Ecommerce',
    path: paths.admin.ecommerce.index,
    sidebarProps: {
      displayText: 'Ecommerce',
      icon: <ShoppingCart />
    },
    child: [
      {
        element: 'Category',
        path: '/ecommerce/category',
        sidebarProps: {
          displayText: 'Category',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      },
      {
        element: 'Product List',
        path: '/ecommerce/product-list',
        sidebarProps: {
          displayText: 'Product List',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      },
      {
        element: 'Add new Product',
        path: '/ecommerce/add-new-product',
        sidebarProps: {
          displayText: 'Add New Product',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      }
    ]
  },

  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  }
];
