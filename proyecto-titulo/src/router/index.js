import { createRouter, createWebHistory } from 'vue-router';
import { getLoggedUser, signOutUser } from '../utils/auth';
import { getRoleByName } from '../utils/roles';
import LoginVue from '../views/Login.vue';
import ForbiddenVue from '../views/Forbidden.vue';
import InicioVue from '../views/Inicio.vue';
import QuienesSomosVue from '../views/QuienesSomos.vue';
import OrganizacionesVue from '../views/Organizaciones.vue';
import HistoriasVue from '../views/Historias.vue';
import RegistrarCasoVue from '../views/RegistrarCaso.vue';
import BuscarMascotaVue from '../views/BuscarMascota.vue';
import ReportePlusVue from '../views/ReportePlus.vue';

const routes = [
  {
    path: '/',
    component: InicioVue,
  },
  {
    path: '/login',
    alias: '/logout',
    component: LoginVue,
  },
  {
    path: '/forbidden',
    component: ForbiddenVue,
  },
  {
    path: '/quienes-somos',
    component: QuienesSomosVue,
    requiredAuth: false,
  },
  {
    path: '/organizaciones',
    component: OrganizacionesVue,
    requiredAuth: false,
  },
  {
    path: '/historias',
    component: HistoriasVue,
    requiredAuth: false,
  },
  {
    path: '/registrar-caso',
    component: RegistrarCasoVue,
    requiredAuth: true,
  },
  {
    path: '/buscar',
    component: BuscarMascotaVue,
    requiredAuth: true,
  },
  {
    path: '/reporte-plus',
    component: ReportePlusVue,
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
