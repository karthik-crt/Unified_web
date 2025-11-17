import { Routes } from '@angular/router';

export const routes: Routes = [

  // Default route → customer-login
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },

  // Customer Login (standalone component)
  {
    path: 'customer-login',
    loadComponent: () =>
      import('./customer/customer-login/customer-login.component')
        .then(m => m.CustomerLoginComponent),
    data: { title: 'Customer Login' }
  },
  {
    path: 'agent-login',
    loadComponent: () =>
      import('../app/Agent/agent-login/agent-login.component')
        .then(m => m.AgentLoginComponent),
    data: { title: 'Agent Login' }
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../app/customer/home/home.component')
        .then(m => m.HomeComponent),
    data: { title: 'Home' }
  },
  {
    path: 'default',
    loadComponent: () =>
      import('../app/customer/default/unified/unified.component')
        .then(m => m.UnifiedComponent),
    data: { title: 'Default' }
  },
  // Layout wrapper for auth-required pages
  {
    path: '',
    loadComponent: () =>
      import('./layout').then(m => m.DefaultLayoutComponent),
    data: { title: 'Home' },

    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then(m => m.routes)
      },
      {
        path: 'manage-users',
        loadComponent: () =>
          import('../app/Admin/manage-customer/manage-customer.component').then(m => m.ManageCustomerComponent)
      },
      {
        path: 'agent-customers',
        loadComponent: () =>
          import('../app/Agent/agent-manage-customer/agent-manage-customer.component').then(m => m.AgentManageCustomerComponent)
      },
      {
        path: 'manage-agents',
        loadComponent: () =>
          import('../app/Admin/manage-agents/manage-agents.component').then(m => m.ManageAgentsComponent)
      },
      {
        path: 'agent-dashboard',
        loadComponent: () =>
          import('../app/Agent/agent-dashboard/agent-dashboard.component')
            .then(m => m.AgentDashboardComponent),
        data: { title: 'Agent Dashboard' }
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/routes').then(m => m.routes)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/routes').then(m => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/routes').then(m => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/routes').then(m => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/routes').then(m => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/routes').then(m => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/routes').then(m => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/routes').then(m => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/routes').then(m => m.routes)
      }
    ]
  },

  // System pages
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component')
        .then(m => m.Page404Component),
    data: { title: 'Page 404' }
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component')
        .then(m => m.Page500Component),
    data: { title: 'Page 500' }
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component')
        .then(m => m.LoginComponent),
    data: { title: 'Login' }
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/pages/register/register.component')
        .then(m => m.RegisterComponent),
    data: { title: 'Register' }
  },

  // Catch-all → customer-login
  { path: '**', redirectTo: 'customer-login' }
];
