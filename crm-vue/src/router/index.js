import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'
// import NuevoCliente from '../views/NuevoClienteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),   //createWebHashHistory   es otra opción menos tradicional y menos limpia
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path:'/agregar-cliente',
      name:'agregar-cliente',
      component: ()=>import('../views/NuevoClienteView.vue')
    }
    
  ]
})

export default router
