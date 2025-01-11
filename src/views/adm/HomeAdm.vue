<script>
import {
  IconFlame,
  IconHeartbeat,
  IconRun,
  IconUser,
} from "@tabler/icons-vue";

export default {
  components: {
    IconFlame,
    IconHeartbeat,
    IconRun,
    IconUser,
  }
};
</script>

<template>
  <section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-4 bg-[#2c2c2c] font-karantina uppercase">
    <div id="head" class="w-full">
      <div class="w-full flex justify-end">
        <img src="/public/olympo-yellow.png" alt="Logo Olympo" class="w-9 rounded-full" />
      </div>
      <a href="/profile" class="w-full flex gap-4 items-center">
        <img src="/public/avatar.png" alt="Logo Olympo" class="w-20 h-20 rounded-full" />
        <h1 class="w-3/5 text-white text-1xl font-karantina">
          Bem vindo de volta <br />Administrador
        </h1>
      </a>
    </div>

    <main class="w-full flex flex-col gap-8">
      <div id="estatisticas" class="w-full flex items-center justify-between capitalize">
        <div id="repeticoes" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
          <IconRun size="32" color="#facc15" />
          <h2 class="text-xm text-white">1893</h2>
          <span class="text-white text-xs">Repetições</span>
        </div>
        <div id="kcal" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
          <IconFlame size="32" color="#facc15" />
          <h2 class="text-xm text-white">6.835 Kcal</h2>
          <span class="text-white text-xs">Por exercício</span>
        </div>
        <div id="bpm" class="w-24 h-24 flex flex-col items-center justify-center bg-[#D9D9D9] bg-opacity-10 rounded-xl">
          <IconHeartbeat size="32" color="#facc15" />
          <h2 class="text-xm text-white">123</h2>
          <span class="text-white text-xs">BPM</span>
        </div>
      </div>

      <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
        <div class="bg-[#D9D9D9] bg-opacity-10 p-4 rounded-xl">
          <a href="/adm/alunos" class="text-1xl">Ver alunos</a>
        </div>
        <div class="bg-[#D9D9D9] bg-opacity-10 p-4 rounded-xl">
          <a href="/adm/exercises" class="text-1xl">Exercicios salvos</a>
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped>

</style>