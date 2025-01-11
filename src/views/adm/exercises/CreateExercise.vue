<script>
import { IconChevronLeft, IconInputCheck } from "@tabler/icons-vue";
import { ref } from 'vue';
import ExerciseService from 'services/ExerciseServices';


export default {
  components: {
    IconChevronLeft,
    IconInputCheck
  },
  setup() {
    const exercises = ref([]);
    const error = ref(null);
    const name = ref('');
    const description = ref('');
    const imagePath = ref(null);
    const message = ref('');
    const userService = new UserService();

    const handleImageChange = (event) => {
      imagePath.value = event.target.files[0];
    };

    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('description', description.value);

      if (imagePath.value) {
        formData.append('image', imagePath.value);
      }

      const { result, error: submitError } = await userService.saveUser(formData);
      if (submitError) {
        message.value = 'Erro ao criar exercício.';
        console.log(submitError);
      } else {
        message.value = 'Exercício criado com sucesso!';
        console.log(result);
        setTimeout(() => {
          window.location.href = '/adm/exercises';
        }, 500);
      }
    };

    const fetchExercises = async () => {
      const { users, error: fetchError } = await userService.getAllUsers();
      if (fetchError) {
        error.value = fetchError;
      } else {
        exercises.value = users;
        console.log(exercises.value);
      }
    };

    fetchExercises();

    return {
      exercises,
      error,
      name,
      description,
      imagePath,
      message,
      handleImageChange,
      handleSubmit
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
          <h2 class="text-4xl mt-4 mb-4">Criar Exercícios</h2>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="name" class="text-2xl">Nome do exercício</label>
              <input v-model="name" type="text" id="name" class="w-full p-4 rounded-xl bg-[#2c2c2c] text-white" placeholder="Digite o nome do exercício" required />
            </div>
            <div class="flex flex-col gap-2">
              <label for="description" class="text-2xl">Descrição</label>
              <textarea v-model="description" id="description" class="w-full p-4 rounded-xl bg-[#2c2c2c] text-white" placeholder="Descreva o exercício" rows="4" required></textarea>
            </div>
            <div class="flex flex-col gap-2">
              <label for="image" class="text-2xl">Imagem</label>
              <input @change="handleImageChange" type="file" id="image" name="imagePath" class="w-full p-4 rounded-xl bg-[#2c2c2c] text-white" />
            </div>
            <button type="submit" class="flex items-center justify-center p-4 rounded-xl bg-[#facc15] text-black mt-4">
              <IconInputCheck size="32" color="#2c2c2c" />
              <span class="text-2xl ml-1">Criar</span>
            </button>
            <p v-if="message">{{ message }}</p>
          </form>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<style scoped>
</style>
