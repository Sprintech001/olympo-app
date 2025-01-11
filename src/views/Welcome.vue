<script>
import OlympoYellow from 'public/olympo-yellow.png';

export default {
    data() {
        return {
            OlympoYellow
        };
    }
};
</script>

<template>
    <section class="w-full min-h-dvh flex flex-col items-center justify-between bg-cover bg-top">
        <div class="w-full flex p-8 justify-end">
            <img :src="OlympoYellow" alt="Logo Olympo" class="max-w-16">
        </div>
        <div class="w-4/5 flex flex-col gap-8 pb-16">
            <h1 class="text-7xl uppercase text-white font-karantina">Sua Rotina de Treinos</h1>
            <a href="/login" class="px-4 py-3 font-karantina bg-yellow-400 w-full rounded-full tracking-wider text-3xl text-center">ENTRAR</a>
        </div>
    </section>
</template>

<style scoped>
section {
    background-image: url('public/hero-bg.png');
}
</style>