<script>
import OlympoYellow from "public/olympo-yellow.png";
import Avatar from 'public/avatar.png';
import { IconBell, IconChevronLeft, IconChevronRight, IconFlame, IconHeartbeat, IconHelp, IconRun, IconSettings, IconUser, IconLock } from "@tabler/icons-vue";

export default {
    data() {
        return {
            OlympoYellow,
            Avatar
        };
    }
};
</script>

<template>
    <section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-4 bg-[#2c2c2c] font-karantina uppercase">
        <div id="head" class="w-full">
            <div class="w-full flex justify-between">
                <router-link to="/home" class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600">
                    <IconChevronLeft color="#facc15"/>
                </router-link>
                <img :src="OlympoYellow" alt="Logo Olympo" class="w-8 h-8 rounded-full" />
            </div>
            <div class="w-full flex flex-col gap-4 items-center text-center">
                <img :src="Avatar" alt="Logo Olympo" class="w-20 h-20 rounded-full" />
                <h1 class="w-3/5 text-white text-2xl font-karantina">
                    Pedro Henrique
                </h1>
            </div>
        </div>

        <main class="w-full flex flex-col gap-8">
            <div id="estatisticas" class="w-full flex items-center justify-between capitalize">
                <div id="repeticoes" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
                    <IconRun size="32" color="#facc15" />
                    <h2 class="text-xl text-white">1893</h2>
                    <span class="text-white">Repetições</span>
                </div>
                <div id="kcal" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
                    <IconFlame size="32" color="#facc15" />
                    <h2 class="text-xl text-white">6.835 Kcal</h2>
                    <span class="text-white">Por exercício</span>
                </div>
                <div id="bpm" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
                    <IconHeartbeat size="32" color="#facc15" />
                    <h2 class="text-xl text-white">123</h2>
                    <span class="text-white">BPM</span>
                </div>
            </div>

            <div id="ajustes" class="w-full p-4 flex flex-col gap-4 bg-[#D9D9D9] bg-opacity-10 rounded-xl text-2xl text-white">
                <router-link to="/" class="w-full flex items-center justify-between">
                    <span class="flex gap-2">
                        <IconUser size="28" color="#facc15"/> Perfil
                    </span>
                    <IconChevronRight color="#facc15"/>
                </router-link>
                <router-link to="/" class="w-full flex items-center justify-between">
                    <span class="flex gap-2">
                        <IconSettings size="28" color="#facc15"/> Configurações
                    </span>
                    <IconChevronRight color="#facc15"/>
                </router-link>
                <router-link to="/" class="w-full flex items-center justify-between">
                    <span class="flex gap-2">
                        <IconBell size="28" color="#facc15"/> Notificações
                    </span>
                    <IconChevronRight color="#facc15"/>
                </router-link>
                <router-link to="/" class="w-full flex items-center justify-between">
                    <span class="flex gap-2">
                        <IconHelp size="28" color="#facc15"/> Ajuda
                    </span>
                    <IconChevronRight color="#facc15"/>
                </router-link>
            </div>
        </main>
    </section>
</template>

<style scoped>
</style>
