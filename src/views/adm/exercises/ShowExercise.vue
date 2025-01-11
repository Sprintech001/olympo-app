<script>
import {
  IconChevronLeft,
  IconRowInsertBottom
} from "@tabler/icons-vue";
import { onMounted, ref } from 'vue';
import ExerciseServices from 'services/ExerciseServices';

export default {
  components: {
    IconChevronLeft,
    IconRowInsertBottom
  },
  setup() {
    const exercises = ref([]);
    const error = ref(null);
    const userService = new UserService();

    const fetchExercises = async () => {
      try {
        const { users, error: fetchError } = await userService.getAllUsers();
        if (fetchError) {
          error.value = fetchError;
        } else {
          exercises.value = users;
          console.log(exercises.value);
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    onMounted(() => {
      fetchExercises();
    });

    return {
      exercises,
      error,
      selectedExerciseId
    };
  }
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/adm/home">
            <IconChevronLeft color="#facc15" />
          </ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <main class="w-full flex flex-col gap-8">
        <div id="exercicios" class="w-full text-white">
          <h2 class="text-4xl mt-4 mb-4">Exercícios</h2>
          <div class="w-full flex flex-col gap-4">
            <ion-item v-for="exercise in exercises" :key="exercise.id" button detail href="/adm/exercises/edit" @click="selectedExerciseId.set(exercise.id)">
              <ion-avatar slot="start">
                <img :src="exercise.imagePath" alt="Imagem do exercício">
              </ion-avatar>
              <ion-label>
                <h2>{{ exercise.name }}</h2>
              </ion-label>
            </ion-item>
          </div>
        </div>
      </main>
      <div>
        <ion-button expand="block" href="/adm/exercises/create" color="warning">
          <IconRowInsertBottom size="32" color="#2c2c2c" />
          <span class="text-2xl ml-1">Criar novo exercício</span>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
</style>