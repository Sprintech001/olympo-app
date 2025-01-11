<script>
import OlympoYellow from "public/olympo-yellow.png";
import { IconUser, IconLock } from "@tabler/icons-vue";
import { userStore } from "services/StoreServices";
import UserService from "services/UserService";

export default {
    data() {
        return {
            email: "",
            password: "",
            error: null,
            userType: 2,
            OlympoYellow
        };
    },
    methods: {
        async handleSubmit(event) {
            event.preventDefault();

            console.log("Email:", this.email);
            console.log("Senha:", this.password);

            try {
                const { user, error } = await UserService.loginUser(this.email, this.password);

                if (error) {
                    this.error = error;
                    return;
                }

                if (user !== null) {
                    userStore.login(user);
                }
                console.log("Login realizado com sucesso!");
                console.log("Usuário:", user);

            } catch (err) {
                this.error = "Erro de requisição: " + err.message;
            }
        }
    }
};
</script>

<template>
    <section class="w-full min-h-dvh flex flex-col items-start px-8 gap-8 bg-[#2c2c2c]">
        <div class="w-full flex py-8 justify-between">
            <img :src="OlympoYellow" alt="Logo Olympo" class="max-w-16" />
            <router-link to="/register" class="text-yellow-400 font-semibold mt-5 mr-3">Criar conta</router-link>
        </div>
        <div id="titles">
            <h2 class="text-3xl text-yellow-400 font-extrabold">Login</h2>
            <h3 class="text-xl text-white">Bem-vindo(a) de volta!</h3>
        </div>
        <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
            <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
                <IconUser color="#facc15" />
                <input
                    type="email"
                    v-model="email"
                    placeholder="E-mail"
                    class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full"
                />
            </div>
            <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full relative">
                <IconUser color="#facc15" />
                <select 
                    v-model="userType"
                    class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full appearance-none relative z-10"
                >
                    <option value="2" class="text-black bg-transparent">Aluno</option>
                    <option value="1" class="text-black bg-transparent">Professor</option>
                    <option value="0" class="text-black bg-transparent">Administrador</option>
                </select>
            </div>

            <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
                <IconLock color="#facc15" />
                <input
                    type="password"
                    v-model="password"
                    placeholder="Senha"
                    class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full"
                />
            </div>
            <button
                type="submit"
                class="px-4 py-3 bg-yellow-400 font-karantina w-full rounded-full tracking-wider text-3xl text-center"
            >ENTRAR</button>
        </form>
    </section>
</template>

<style scoped>
</style>
