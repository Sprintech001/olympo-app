import { RouteRecordRaw } from 'vue-router';
import HomeUser from '../HomeUser.vue';
import Profile from '../Profile.vue';
import Exercise from '../exercise/Exercise.vue';
import Execution from '../exercise/Execution.vue';

const userRoutes: Array<RouteRecordRaw> = [
    { path: '/home', component: HomeUser },
    { path: '/profile', component: Profile },
    { path: '/exercise', component: Exercise },
    { path: '/exercise/execution/:id', component: Execution },
    { path: '/exercise/execution/', component: Execution },
];

export default userRoutes;