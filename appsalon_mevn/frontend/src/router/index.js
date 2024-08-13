import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthAPI from '@/api/AuthAPI'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      // para controlar el acceso a las rutas con JWT  (1)
      meta:{requiresAuth: true},
      children:[
        {
          path:'',
          name:'my-appointments',
          component: ()=>import('../views/appointments/MyAppointmentsView.vue')
        },
        {
          path: 'nueva',
          component: ()=>import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
           {
            path: '',
            name: 'new-appointment',
            component: ()=>import('../views/appointments/ServicesView.vue')
           },
           {
            path: 'detalles',
            name: 'appointments-details',
            component: ()=>import('../views/appointments/AppointmentView.vue')
           }
          ]
        },
        {
          path:':id/editar',
          component: ()=> import('../views/appointments/EditAppointmentLayout.vue'),
          children: [
            {
             path: '',
             name: 'edit-appointment',
             component: ()=>import('../views/appointments/ServicesView.vue')
            },
            {
             path: 'detalles',
             name: 'edit-appointments-details',
             component: ()=>import('../views/appointments/AppointmentView.vue')
            }
          ]
        }
      ]
    },
    // Estas rutas no requieren que el usuario este autenticado
    {
      path:'/auth',
      name:'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children:[
        {
          path: 'registro',
          name: 'register',
          component: ()=>import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: ()=>import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: ()=>import('../views/auth/LoginView.vue'),
        }
      ]
    }
  ]
})
// Control de acceso a las rutas con JWT (2)
// Esto se ejecuta antes de mandar a llamar o mostrar la información de una página
router.beforeEach(async (to, from, next)=>{

  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if (requiresAuth) {
    try {
      // Tomamos el JWT y lo pasamos a express, donde se verificara si el token es valido (Esto retorna true o false)
      // Se utilizara un middleware de Autenticación antes de mostrar la información
      await AuthAPI.auth()
      next()
    } catch (error) {
      next({name:'login'})
    }
  } else {
    // Para mostrar la vista
    next()
  }
})

export default router
