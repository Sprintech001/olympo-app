<script>
    import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/vue';
    import { IconChevronLeft, IconRowInsertBottom } from '@tabler/icons-vue';
    import { onMounted, ref } from 'vue';
    import UserService from 'services/UserService';
    import avatar from 'public/avatar.png';

    export default {
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonContent,
        IonButton,
        IonList,
        IonItem,
        IonAvatar,
        IonLabel,
        IconChevronLeft,
        IconRowInsertBottom
    },
    setup() {
        const alunos = ref([]);
        const error = ref(null);
        const userService = new UserService();

        const fetchAlunos = async () => {
        const { studants, error: fetchError } = await userService.getStudants();
        if (fetchError) {
            error.value = fetchError;
        } else {
            alunos.value = studants;
        }
        };

        onMounted(() => {
        fetchAlunos();
        });

        return {
        alunos,
        error,
        avatar
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
      <div class="w-full flex justify-between items-center mt-4 mb-4">
        <h2 class="text-4xl">Seus Alunos</h2>
        <ion-button expand="block" href="/adm/alunos/create" color="warning">
          <IconRowInsertBottom size="32" color="#2c2c2c" />
          <span class="text-xl ml-1">Adicionar aluno</span>
        </ion-button>
      </div>
      <ion-list>
        <ion-item v-for="aluno in alunos" :key="aluno.id" button detail href="/adm/alunos/edit">
          <ion-avatar slot="start">
            <img :src="avatar" alt="Avatar">
          </ion-avatar>
          <ion-label>
            <h2>{{ aluno.name }}</h2>
            <p>Visualizar plano de treinos</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
</style>
