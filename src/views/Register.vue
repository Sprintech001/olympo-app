<script>
import OlympoYellow from 'public/olympo-yellow.png';
import { IconRecordMail, IconUser, IconLock } from '@tabler/icons-vue';
import UserService from "services/UserService";

export default {
    data() {
        return {
            OlympoYellow,
            error: null,
            email: '',
            password: '',
            name: '',
            message: '',
            type: 2
        };
    },
    methods: {
        async handleSubmit(event) {
            event.preventDefault();

            const data = {
                email: this.email,
                password: this.password,
                name: this.name,
                type: this.type,
            };

            try {
                const { result, error } = await UserService.saveUser(data);

                if (error) {
                    this.message = error;
                    return;
                }

                this.message = 'Usuário criado com sucesso!';
                console.log(result);
                setTimeout(() => {
                    this.$router.push('/login');
                }, 500);
            } catch (err) {
                this.message = 'Erro de requisição: ' + err.message;
            }
        }
    }
};
</script>

<template>
    <section class="w-full min-h-dvh flex flex-col items-start px-8 gap-8 bg-[#2c2c2c]">
        <div class="w-full flex py-8 justify-between">
            <img :src="OlympoYellow" alt="Logo Olympo" class="max-w-16">
            <router-link to="/login" class="text-yellow-400 font-semibold mt-5 mr-3">Entrar</router-link>
        </div>
        <div id="titles">
            <h2 class="text-3xl text-yellow-400 font-extrabold">Registro</h2>
            <h3 class="text-xl text-white">Bem-vindo(a) a Olympo</h3>
        </div>
        <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
            <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
                <IconUser color="#facc15"/>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    v-model="name" 
                    class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
            </div>
            <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
                <IconRecordMail color="#facc15"/>
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    v-model="email" 
                    class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
            </div>
            <div class="flex items-center justify-start pl-4 border-2 border-white rounded-full">
                <IconLock color="#facc15"/>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    v-model="password" 
                    class="py-3 px-4 bg-transparent font-semibold text-white outline-none rounded-full">
            </div>
            <div class="w-full flex flex-col pb-16 mt-4">
                <button 
                    type="submit" 
                    class="px-4 py-3 bg-yellow-400 font-karantina w-full rounded-full tracking-wider text-3xl text-center">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<style scoped>
</style>
