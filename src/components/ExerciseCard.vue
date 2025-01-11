<script>
    export default {
        props: {
            exercise: {
                type: Object,
                required: true
            }
        }
    }
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <router-link :to="{ name: 'exercise', params: { id: exercise.id } }" class="w-full h-44 flex flex-col items-start justify-center p-4 rounded-xl bg-cover bg-top" :style="{ backgroundImage: `url(${exercise.imagePath})` }">
      <h2 class="text-5xl">{{ exercise.name }}</h2>
    </router-link>
  </div>
</template>


<style scoped>
</style>