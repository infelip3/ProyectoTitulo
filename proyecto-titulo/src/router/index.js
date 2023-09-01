import { createRouter, createWebHistory } from 'vue-router';
import { getLoggedUser, signOutUser } from '../utils/auth';
import { getRoleByName } from '../utils/roles';
import LoginView from '../views/LoginView.vue';
import ForbiddenView from '../views/ForbiddenView.vue';
import InicioView from '../views/InicioView.vue';
import QuienesSomosView from '../views/QuienesSomosView.vue';
import OrganizacionesView from '../views/OrganizacionesView.vue';
import HistoriasView from '../views/HistoriasView.vue';
import RegistrarCasoView from '../views/RegistrarCasoView.vue';
import BuscarMascotaView from '../views/BuscarMascotaView.vue';
import ReportePlusView from '../views/ReportePlusView.vue';

const routes = [
  {
    path: '/',
    component: InicioView,
  },
  {
    path: '/login',
    alias: '/logout',
    component: LoginView,
  },
  {
    path: '/forbidden',
    component: ForbiddenView,
  },
  {
    path: '/quienes-somos',
    component: QuienesSomosView,
    requiredAuth: false,
  },
  {
    path: '/organizaciones',
    component: OrganizacionesView,
    requiredAuth: false,
  },
  {
    path: '/historias',
    component: HistoriasView,
    requiredAuth: false,
  },
  {
    path: '/registrar-caso',
    component: RegistrarCasoView,
    requiredAuth: true,
  },
  {
    path: '/buscar',
    component: BuscarMascotaView,
    requiredAuth: true,
  },
  {
    path: '/reporte-plus',
    component: ReportePlusView,
    requiredAuth: true,
  },
  { path: '/:catchAll(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Show the loading component when navigating
  document.querySelector('.loading').style.visibility = 'visible';
  
  if(to.fullPath === '/logout') {
    await signOutUser();
    next('/login');
  }
  else
  {
    const loggedUser = getLoggedUser();
    const route = routes.find((route) => route.path === to.fullPath);
    if (route) {
      if (route.requiredAuth === true) {
        if (loggedUser === null) {
          if (to.fullPath === '/login' || to.fullPath === '/forbidden') {
            next();
          } else {
            next('/login');
          }
        } else {
          const role = await getRoleByName(loggedUser.role);
          if (role && role.allowedRoutes.includes(to.fullPath)) {
            next();
          } else {
            next('/forbidden');
          }
        }
      } else {
        next();
      }
    } else {
      next('/');
    }
  }
});

router.afterEach(() => {
  // Hide the loading component when navigation is complete
  document.querySelector('.loading').style.visibility = 'hidden';
});

export default router;
