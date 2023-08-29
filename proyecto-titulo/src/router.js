import { createRouter, createWebHistory } from 'vue-router';
import { getLoggedUser } from './utils/auth';
import LoginVue from './views/Login.vue';
import InicioVue from './views/Inicio.vue';
import QuienesSomosVue from './views/QuienesSomos.vue';
import OrganizacionesVue from './views/Organizaciones.vue';
import HistoriasVue from './views/Historias.vue';
import RegistrarCasoVue from './views/RegistrarCaso.vue';
import BuscarMascotaVue from './views/BuscarMascota.vue';
import ReportePlusVue from './views/ReportePlus.vue';

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
    path: '/quienes-somos',
    component: QuienesSomosVue
  },
  { 
    path: '/organizaciones',
    component: OrganizacionesVue
  },
  { 
    path: '/historias',
    component: HistoriasVue
  },
  { 
    path: '/registrar-caso',
    component: RegistrarCasoVue
  },
  { 
    path: '/buscar',
    component: BuscarMascotaVue
  },
  { 
    path: '/reporte-plus',
    component: ReportePlusVue
  },
  { path: '/:catchAll(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {

  const loggedUser = getLoggedUser();

  // Show the loading component when navigating
  document.querySelector('.loading').style.visibility = 'visible';

  setTimeout(
    () => {
      if(loggedUser === null)
      {
        if(to.fullPath === '/login')
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
        if(to.fullPath === '/login')
        {
          next('/');
        }
        else
        {
          next();
        }
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