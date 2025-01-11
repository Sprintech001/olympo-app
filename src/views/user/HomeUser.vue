<script>
import OlympoYellow from "public/olympo-yellow.png";
import Avatar from "public/avatar.png";
import { IconFlame, IconHeartbeat, IconRun } from "@tabler/icons-vue";
import ExerciseCard from "@/components/ExerciseCard.vue";
import ExerciseServices from "services/ExerciseServices";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    IconFlame,
    IconHeartbeat,
    IconRun,
    ApexChart: VueApexCharts,
    ExerciseCard
  },
  data() {
    return {
      OlympoYellow,
      Avatar,
      chartOptions: {
        chart: {
          type: 'bar',
          height: 200
        },
        xaxis: {
          type: 'datetime'
        },
        plotOptions: {
          bar: {
            colors: { ranges: [{ from: 0, to: 100, color: '#facc15' }] }
          }
        }
      },
      series: [
        {
          name: "Performance",
          data: [
            { x: "1995-12-17", y: 59 },
            { x: "1995-12-18", y: 44 },
            { x: "1995-12-19", y: 90 },
            { x: "1995-12-20", y: 36 },
            { x: "1995-12-21", y: 44 },
            { x: "1995-12-22", y: 55 }
          ]
        }
      ],
      exercises: [],
      error: null
    };
  },
  async mounted() {
    try {
      const { exercises, error } = await ExerciseServices.getExercises();
      if (error) {
        this.error = error;
      } else {
        this.exercises = exercises;
      }
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<template>
  <section class="w-full min-h-dvh flex flex-col items-start py-4 px-8 gap-4 bg-[#2c2c2c] font-karantina uppercase">
    <div id="head" class="w-full">
      <div class="w-full flex justify-end">
        <img :src="OlympoYellow" alt="Logo Olympo" class="w-6 rounded-full" />
      </div>
      <a href="/user" class="w-full flex gap-4 items-center">
        <img :src="Avatar" alt="Logo Olympo" class="w-20 h-20 rounded-full" />
        <h1 class="w-3/5 text-white text-2xl font-karantina">
          Bem vindo de volta <br />Pedro Henrique
        </h1>
      </a>
    </div>

    <main class="w-full flex flex-col gap-8">
      <div id="estatisticas" class="w-full flex items-center justify-between capitalize">
        <!-- Estatísticas -->
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

      <div id="desempenho" class="w-full p-4 flex flex-col gap-4 bg-[#D9D9D9] bg-opacity-10 rounded-xl">
        <h2 class="text-2xl text-white">Desempenho</h2>
        <apexchart :options="chartOptions" :series="series" />
      </div>

      <!-- Exercícios Diários -->
      <div id="exercicios" class="w-full flex flex-col gap-4 text-white">
        <div class="w-full flex justify-between items-center">
          <h2 class="text-2xl">Exercícios Diarios</h2>
          <a href="/">Ver Todos</a>
        </div>
        <div class="w-full flex flex-col gap-4">
          <ExerciseCard v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" />
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped></style>
