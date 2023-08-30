import { createRouter, createWebHistory } from 'vue-router';
import { getLoggedUser } from './utils/auth';
import LoginVue from './views/Login.vue';
import ForbiddenVue from './views/Forbidden.vue';
import InicioVue from './views/Inicio.vue';
import QuienesSomosVue from './views/QuienesSomos.vue';
import OrganizacionesVue from './views/Organizaciones.vue';
import HistoriasVue from './views/Historias.vue';
import RegistrarCasoVue from './views/RegistrarCaso.vue';
import BuscarMascotaVue from './views/BuscarMascota.vue';
import ReportePlusVue from './views/ReportePlus.vue';

const roles = [
  {
    name: 'Administrador',
    value: 'admin',
    allowedRoutes: [
      '/quienes-somos',
      '/organizaciones',
      '/historias',
      '/registrar-caso',
      '/buscar',
      '/reporte-plus'
    ],
  },
  {
    name: 'Usuario',
    value: 'user',
    allowedRoutes: [
      '/quienes-somos',
      '/organizaciones',
      '/historias',
      '/registrar-caso',
      '/buscar',
    ],
  }
];

const routes = [
  {
    path: '/',
    component: InicioVue
  },
  {
    path: '/login',
    component: LoginVue
  },
  {
    path: '/forbidden',
    component: ForbiddenVue
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
  routes
});

router.beforeEach((to, from, next) => {

  // Show the loading component when navigating
  document.querySelector('.loading').style.visibility = 'visible';

  setTimeout(
    () => {

      const route = routes.find((route) => route.path === to.fullPath);
      if(route)
      {
        if(route.requiredAuth === true)
        {
          const loggedUser = getLoggedUser();
          if(loggedUser === null)
          {
            if(to.fullPath === '/login')
            {
              next();
            }
            else if(to.fullPath === '/forbidden')
            {
              next();
            }
            else
            {
              next('/login');
            }
          }
          else
          {
            const role = roles.find((role) => role.value === loggedUser.role);
            if(role.allowedRoutes.includes(to.fullPath))
            {
              next();
            }
            else
            {
              next('/forbidden');
            }
          }
        }
        else
        {
          next();
        }
      }
      else
      {
        next('/');
      }
    },
    200
  );
});

router.afterEach(() => {
  // Hide the loading component when navigation is complete
  document.querySelector('.loading').style.visibility = 'hidden';
});

export default router;