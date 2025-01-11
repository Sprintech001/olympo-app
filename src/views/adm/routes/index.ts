import { RouteRecordRaw } from 'vue-router';
import HomeAdm from '../HomeAdm.vue';
import User from '../studants/User.vue';
import ShowExercise from '../exercises/ShowExercise.vue';
import CreateExercise from '../exercises/CreateExercise.vue';
import EditExercise from '../exercises/EditExercise.vue';

const admRoutes: Array<RouteRecordRaw> = [
    { path: '/adm/home', component: HomeAdm },
    { path: '/adm/alunos', component: User },
    { path: '/adm/exercise', component: ShowExercise },
    { path: '/adm/exercise/create', component: CreateExercise },
    { path: '/adm/exercise/edit/:id', component: EditExercise },
];

export default admRoutes;