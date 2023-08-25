import { createRouter, createWebHistory } from 'vue-router';
import { getLoggedUser, doLogout } from './utils/auth';
import LoginVue from './views/Login.vue';
import InicioVue from './views/Inicio.vue';
import QuienesSomosVue from './views/QuienesSomos.vue';
import OrganizacionesVue from './views/Organizaciones.vue';
import HistoriasVue from './views/Historias.vue';
import RegistrarCasoVue from './views/RegistrarCaso.vue';
import BuscarMascotaVue from './views/BuscarMascota.vue';

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
  { path: '/:catchAll(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.path === '/logout') {
    doLogout()
      .then(() => {
        console.log('Logged out!');
        router.to('/login');
      })
      .catch(() => {
      });
  }
  else if(to.path !== '/login') {
    getLoggedUser()
      .then(() => {
        setTimeout(
          () => {
            next();
          },
          800
        );
      })
      .catch(() => {
        router.to('/login');
      })
      .finally(() => {
        // Show the loading component when navigating
        document.querySelector('.loading').style.visibility = 'visible';
      });
  }
  else
  {
    next();
  }
});

router.afterEach(() => {
  // Hide the loading component when navigation is complete
  document.querySelector('.loading').style.visibility = 'hidden';
});

export default router;