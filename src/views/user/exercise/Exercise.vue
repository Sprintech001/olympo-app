<script>
import OlympoYellow from "public/olympo-yellow.png";
import {
  IconBarbell,
  IconChevronLeft,
  IconClock,
  IconFlame,
  IconHeartbeat,
  IconRun,
  IconUser,
  IconInputCheck,
  IconLock
} from "@tabler/icons-vue";
import { onMounted, ref } from 'vue';
import ExerciseServices from 'services/ExerciseServices';

export default {
  components: {
    IconBarbell,
    IconChevronLeft,
    IconClock,
    IconFlame,
    IconHeartbeat,
    IconRun,
    IconUser,
    IconInputCheck,
    IconLock
  },
  setup() {
    const exercise = ref({ id: null, name: '', description: '', imagePath: '', videoPath: "" });
    const error = ref(null);

    const fetchExercise = async () => {
      try {
        const exerciseId = selectedExerciseId.value;
        if (!exerciseId) {
          throw new Error('ID do exercício não encontrado');
        }

        const { data, error: fetchError } = await ExerciseServices.getExerciseById(exerciseId);
        if (fetchError) {
          error.value = fetchError;
        } else {
          exercise.value = data;
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    onMounted(() => {
      fetchExercise();
    });

    return {
      exercise,
      error
    };
  }
};
</script>

<template>
  <section class="w-full min-h-dvh flex flex-col items-start gap-4 bg-[#2c2c2c]">
    <div id="hero" class="w-full h-60 flex items-start justify-between p-4 rounded-xl bg-cover bg-top" :style="{ backgroundImage: `url(${exercise.imagePath})` }">
      <a href="/home" class="bg-[#2c2c2c] p-2 rounded-full border border-zinc-600">
        <IconChevronLeft color="#facc15" />
      </a>
    </div>

    <main class="w-full flex flex-col gap-8 py-4 px-8">
      <div id="texts" class="w-full flex flex-col items-center justify-center gap-4 text-white">
        <h2 class="text-3xl font-karantina uppercase">{{ exercise.name }}</h2>
        <p>{{ exercise.description }}</p>
      </div>

      <div id="info" class="w-full flex flex-wrap items-center justify-between text-white text-md">
        <div class="flex justify-between items-center gap-2">
          <IconBarbell color="#facc15" size="32" />
          <span class="leading-5">Repetições <br><strong>3x12</strong></span>
        </div>
        <div class="flex justify-between items-center gap-2">
          <IconFlame color="#facc15" size="32" />
          <span class="leading-5">Gastos <br><strong>140 Kcal</strong></span>
        </div>
      </div>
      <a href="/exercise/execution" class="flex items-center justify-center p-4 rounded-xl bg-[#facc15] text-black mt-4">
        <IconInputCheck size="32" color="#2c2c2c" />
        <span class="text-2xl ml-1">Iniciar</span>
      </a>
    </main>
  </section>
</template>

<style scoped>
#hero {
  background-size: cover;
  background-position: center;
}

#name {
  font-size: 2rem;
}
</style>