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
    element: 'Ecommerce',
    path: paths.admin.ecommerce.index,
    sidebarProps: {
      displayText: 'Ecommerce',
      icon: <ShoppingCart />
    },
    child: [
      {
        element: 'Category',
        path: paths.admin.ecommerce.category,
        sidebarProps: {
          displayText: 'Category',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      },
      {
        element: 'Product List',
        path: paths.admin.ecommerce.products,
        sidebarProps: {
          displayText: 'Product List',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      },
      {
        element: 'Create Product',
        path: paths.admin.ecommerce.createProduct,
        sidebarProps: {
          displayText: 'Add New Product',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      }
    ]
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    },
    child: [
      {
        element: 'Category',
        path: paths.admin.ecommerce.category,
        sidebarProps: {
          displayText: 'Category',
          icon: <FiberManualRecord className='text-[8px]' />
        },
        child: [
          {
            element: 'Category',
            path: paths.admin.ecommerce.category,
            sidebarProps: {
              displayText: 'Category',
              icon: <FiberManualRecord className='text-[8px]' />
            }
          }
        ]
      },
      {
        element: 'Product List',
        path: paths.admin.ecommerce.products,
        sidebarProps: {
          displayText: 'Product List',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      }
    ]
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  }
];
