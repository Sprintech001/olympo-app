<script>
import {
  IconBarbell,
  IconChevronLeft,
  IconInputCheck,
  IconFlame,
} from "@tabler/icons-vue";
import { onMounted, ref } from "vue";
import ExerciseServices from '/resources/services/ExerciseServices.ts';

export default {
  components: {
    IconBarbell,
    IconChevronLeft,
    IconInputCheck,
    IconFlame,
  },
  setup() {
    const exercises = ref([]);
    const exercise = ref({ id: null, name: '', description: '', imagePath: '', videoPath: "" });
    const error = ref(null);
    const message = ref('');
    const imagePath = ref(null);
    const videoPath = ref(null);
    const userService = new UserService();

    function adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function addImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          imagePath.value = files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            const hero = document.getElementById('hero');
            hero.style.backgroundImage = `url(${event.target.result})`;
          };
          reader.readAsDataURL(imagePath.value);
        }
      };
      input.click();
    }

    function addVideo(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        videoPath.value = files[0];
        const videoPreview = document.getElementById('videoPreview');
        const videoURL = URL.createObjectURL(videoPath.value);
        videoPreview.src = videoURL;
        videoPreview.load();
        console.log('Vídeo selecionado:', videoPath.value);
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('id', exercise.value.id);
      formData.append('name', exercise.value.name);
      formData.append('description', exercise.value.description);

      if (imagePath.value) {
        formData.append('image', imagePath.value);
      }

      if (videoPath.value) {
        formData.append('video', videoPath.value);
      }

      const { result, error: submitError } = await userService.editUser(exercise.value.id, formData);
      if (submitError) {
        message.value = 'Erro ao atualizar exercício.';
        console.log(submitError);
      } else {
        message.value = 'Exercício atualizado com sucesso!';
        console.log(result);
        setTimeout(() => {
          window.location.href = '/adm/exercises';
        }, 300);
      }
    };

    async function fetchExercises() {
      try {
        const exerciseId = selectedExerciseId.value;
        if (!exerciseId) {
          throw new Error('ID do exercício não encontrado');
        }

        const { studants, error: fetchError } = await userService.getStudants();
        if (fetchError) {
          error.value = fetchError;
        } else {
          exercise.value = studants.find(e => e.id === exerciseId);
          console.log(exercise.value);
        }
      } catch (err) {
        error.value = err.message;
      }
    }

    onMounted(() => {
      fetchExercises();

      const textarea = document.getElementById("description");
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });

    return {
      exercises,
      exercise,
      error,
      message,
      imagePath,
      videoPath,
      adjustHeight,
      addImage,
      addVideo,
      handleSubmit,
      fetchExercises,
    };
  },
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/adm/exercises">
            <IconChevronLeft color="#facc15" />
          </ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div @click="addImage" id="hero" class="w-full h-60 flex items-start justify-between p-4 rounded-xl bg-cover bg-top" :style="{ backgroundImage: `url(${exercise.imagePath})` }">
      </div>
      <main class="w-full flex flex-col gap-8 py-4 px-8">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <div id="texts" class="w-full flex flex-col items-center justify-center gap-4 text-white">
            <input v-model="exercise.name" class="w-full p-4 rounded-xl bg-[#2c2c2c] text-white text-3xl font-karantina uppercase" type="text" id="name" required />
            <textarea v-model="exercise.description" id="description" class="w-full p-4 rounded-xl bg-[#2c2c2c] text-white" @input="adjustHeight"></textarea>
          </div>
          <div>
            <label for="videoPath">Execução:</label>
            <input type="file" id="video" accept="video/*" @change="addVideo">
          </div>
          <video id="videoPreview" width="320" height="240" controls>
            <source v-if="exercise.videoPath" :src="exercise.videoPath" />
            <track kind="captions" src="path/to/captions.vtt" srclang="en" label="English">
            Seu navegador não suporta o elemento de vídeo.
          </video>
          <p>{{ exercise.videoPath }}</p>
          <div id="info" class="w-full flex flex-wrap items-center justify-between text-white text-md mt-10">
            <div class="flex justify-between items-center gap-2">
              <IconBarbell color="#facc15" size="32"/>
              <span class="leading-5">Repetiçẽs <br><strong>3x12</strong></span>
            </div>
            <div class="flex justify-between items-center gap-2">
              <IconFlame color="#facc15" size="32"/>
              <span class="leading-5">Gastos <br><strong>140 Kcal</strong></span>
            </div>
          </div>
          <button type="submit" class="flex items-center justify-center p-4 rounded-xl bg-[#facc15] text-black mt-4">
            <IconInputCheck size="32" color="#2c2c2c" />
            <span class="text-2xl ml-1">Atualizar</span>
          </button>
        </form>
      </main>
    </ion-content>
  </ion-page>
</template>

<style>
#hero {
  background-size: cover;
  background-position: center;
}

#name {
  font-size: 2rem;
}
</style>
