export interface Exercise {
    id: number;
    title: string;
    description: string;
}

// const API_ADDRESS = import.meta.env.VITE_API_ADDRESS || 'http://localhost:5217';
const API_ADDRESS = 'http://localhost:5217';

class ExerciseServices {
    // [1] - MÉTODOS GET PARA A API

    // ------------ RETORNAR TODOS OS EXERCÍCIOS ------------ //

    public async getExercises(): Promise<{ exercises: Exercise[], error: string | null }> {
        let exercises: Exercise[] = [];
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/exercise`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            exercises = await response.json();
            console.log(exercises);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao buscar exercícios:", error);
        }

        return { exercises, error };
    }

    // ---------------- RETORNAR EXERCÍCIO PELO ID ------------------- //

    public async findExerciseById(id: number): Promise<{ exercise: Exercise | null, error: string | null }> {
        let exercise: Exercise | null = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/exercise`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            const exercises = await response.json();
            exercise = exercises.find((exercise: Exercise) => exercise.id === id);
            console.log(exercise);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao buscar exercício:", error);
        }

        return { exercise, error };
    }

    // [2] - MÉTODOS POST PARA A API

    // ------------ CRIAR EXERCÍCIO ------------ //

    public async createExercise(data: any): Promise<{ result: any, error: string | null }> {
        let result: any = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/exercise`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            result = await response.json();
            console.log("Exercício criado com sucesso!", result);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao criar exercício:", error);
        }

        return { result, error };
    }

    // [3] - MÉTODOS PUT PARA A API

    // ------------ ATUALIZAR EXERCÍCIO ------------ //

    public async updateExercise(id: number, data: any): Promise<{ result: any, error: string | null }> {
        let result: any = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/exercise/${id}`, {
                method: 'PUT',
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            result = await response.json();
            console.log("Exercício atualizado com sucesso!", result);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao atualizar exercício:", error);
        }

        return { result, error };
    }

    // [4] - MÉTODOS DELETE PARA A API

    // ------------ DELETAR EXERCÍCIO ------------ //

    public async deleteExercise(id: number): Promise<{ result: any, error: string | null }> {
        let result: any = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/exercise/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            result = await response.json();
            console.log("Exercício deletado com sucesso!", result);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao deletar exercício:", error);
        }

        return { result, error };
    }
}

export default ExerciseServices;
export { ExerciseServices };