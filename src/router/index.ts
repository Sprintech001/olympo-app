import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import admRoutes from '@/views/adm/routes';
import userRoutes from '@/views/user/route';


const routes: Array<RouteRecordRaw> = [

  { path: '/', component: Welcome},
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  ...admRoutes,
  ...userRoutes,

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
