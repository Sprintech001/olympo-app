import { reactive, toRefs } from 'vue';
import { User } from 'interfaces/User';
import { Exercise } from 'interfaces/Exercise';

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS || 'http://localhost:5217';

class StoreService {
    private state = reactive<{ user: User | null, exercises: Exercise[] }>({
        user: null,
        exercises: []
    });

    // ----------------- MÉTODOS DE ARMAZENAMENTO ----------------- //

    public storeUser(initialUser: User | null) {
        const storedUser = localStorage.getItem('user');
        this.state.user = storedUser ? JSON.parse(storedUser) : initialUser;

        return {
            ...toRefs(this.state),
            login: (user: User) => {
                localStorage.setItem('user', JSON.stringify(user));
                this.state.user = user;
            },
            logout: () => {
                localStorage.removeItem('user');
                this.state.user = null;
            }
        };
    }

    public async storeExercises() {
        const storedExercises = localStorage.getItem('exercises');
        this.state.exercises = storedExercises ? JSON.parse(storedExercises) : [];

        return {
            ...toRefs(this.state),
            fetchExercises: async () => {
                try {
                    const response = await fetch(`${API_ADDRESS}/api/exercises`);
                    if (!response.ok) {
                        throw new Error(`Erro: ${response.statusText}`);
                    }
                    const data = await response.json();
                    localStorage.setItem('exercises', JSON.stringify(data));
                    this.state.exercises = data;
                } catch (err) {
                    console.error("Erro ao buscar exercícios:", (err as Error).message);
                }
            },
            saveExercise: (exercise: Exercise) => {
                this.state.exercises.push(exercise);
                localStorage.setItem('exercises', JSON.stringify(this.state.exercises));
            },
            deleteExercise: (id: number) => {
                this.state.exercises = this.state.exercises.filter(exercise => exercise.id !== id);
                localStorage.setItem('exercises', JSON.stringify(this.state.exercises));
            }
        };
    }
}

export const userStore = new StoreService().storeUser(null);
export const exerciseStore = new StoreService().storeExercises();
export default StoreService;
