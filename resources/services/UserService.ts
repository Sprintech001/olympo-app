export interface User {
    id: number;
    name: string;
    email: string;
    ApiAdress: string;
}

// const API_ADDRESS = import.meta.env.VITE_API_ADDRESS || 'http://localhost:5217';
const API_ADDRESS = 'http://localhost:5217';

class UserService 
{
    // [1] - MÉTODOS GET PARA A API

    // ------------ RETORNAR TODOS OS USUÁRIOS ------------ //

    async getAllUsers(): Promise<{ users: User[], error: string | null }> {
        let users: User[] = [];
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/user`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            users = await response.json();
            console.log(users);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao buscar usuários:", error);
        }

        return { users, error };
    }

    // ---------------- RETORNAR ALUNOS ------------------- //
    
    async getStudants(): Promise<{ studants: User[], error: string | null }> {
        let studants: User[] = [];
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/user/type?type=2`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            studants = await response.json();
            console.log(studants);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao buscar alunos:", error);
        }

        return { studants, error };
    }

    // ---------------- RETORNAR PROFESSORES ------------------- //

    async getTeachers(): Promise<{ teachers: User[], error: string | null }> {
        let teachers: User[] = [];
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/user/type?type=1`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            teachers = await response.json();
            console.log(teachers);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao buscar professores:", error);
        }

        return { teachers, error };
    }

    // ---------------- RETORNAR ADMINISTRADORES ------------------- //

    async getAdmins(): Promise<{ admins: User[], error: string | null }> {
        let admins: User[] = [];
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/user/type?type=0`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            admins = await response.json();
            console.log(admins);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao buscar administradores:", error);
        }

        return { admins, error };
    }

    // [2] - MÉTODOS POST PARA A API

    // ---------------- SALVAR USUÁRIOS ------------------- //

    async saveUser(data: User): Promise<{ result: any, error: string | null }> {
        let result: any = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            result = await response.json();
            console.log("Usuário salvo com sucesso!", result);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao salvar usuário:", error);
        }

        return { result, error };
    }

    // ---------------- LOGIN USUÁRIO ------------------- //

    async loginUser(email: string, password: string): Promise<{ user: User | null, error: string | null }> {
        let user: User | null = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            user = await response.json();
            console.log("Login realizado com sucesso!", user);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao realizar login:", error);
        }

        return { user, error };
    }

    // [3] - MÉTODOS PUT PARA A API

    // ---------------- EDITAR USUÁRIOS ------------------- //

    async editUser(id: number, data: Partial<User>): Promise<{ result: any, error: string | null }> {
        let result: any = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            result = await response.json();
            console.log("Usuário editado com sucesso!", result);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao editar usuário:", error);
        }

        return { result, error };
    }

    // [4] - MÉTODOS DELETE PARA A API

    // ---------------- DELETAR USUÁRIOS ------------------- //

    async deleteUser(id: number): Promise<{ result: any, error: string | null }> {
        let result: any = null;
        let error: string | null = null;

        try {
            const response = await fetch(`${API_ADDRESS}/api/user/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            result = await response.json();
            console.log("Usuário deletado com sucesso!", result);
        } catch (err) {
            error = (err as Error).message;
            console.error("Erro ao deletar usuário:", error);
        }

        return { result, error };
    }
}

export default new UserService();