import { createRouter, createWebHistory } from 'vue-router';
import InicioVue from './views/Inicio.vue';
import QuienesSomosVue from './views/QuienesSomos.vue';
import OrganizacionesVue from './views/Organizaciones.vue';

const routes = [
  {
    path: '/',
    component: InicioVue
  },
  { 
    path: '/quienes-somos',
    component: QuienesSomosVue
  },
  { 
    path: '/organizaciones',
    component: OrganizacionesVue
  },
  { path: '/:catchAll(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;