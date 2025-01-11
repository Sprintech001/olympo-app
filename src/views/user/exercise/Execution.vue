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
  IconPlayerPlay,
  IconPlayerPause,
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
    IconPlayerPlay,
    IconPlayerPause,
    IconLock
  },
  setup() {
    const video = ref(null);
    const currentTime = ref(0);
    const isPaused = ref(true);
    const timer = ref(60);
    let interval;
    const exerciseName = ref("Nome do Exercício");
    const exercise = ref({ id: null, name: '', description: '', imagePath: '', videoPath: '' });

    const togglePlayPause = () => {
      if (video.value && video.value.paused) {
        video.value.play();
        isPaused.value = false;
        startTimer();
      } else if (video.value) {
        video.value.pause();
        isPaused.value = true;
        clearInterval(interval);
      }
    };

    const updateTime = () => {
      if (video.value) {
        currentTime.value = video.value.currentTime;
      }
    };

    const startTimer = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };

    const fetchExercise = async () => {
      try {
        const exerciseId = selectedExerciseId.value;
        if (!exerciseId) {
          throw new Error('ID do exercício não encontrado');
        }

        const { data, error: fetchError } = await ExerciseServices.getExerciseById(exerciseId);
        if (fetchError) {
          console.error(fetchError);
        } else {
          exercise.value = data;
          exerciseName.value = data.name;
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    onMounted(() => {
      video.value = document.getElementById("videoPreview");
      if (video.value) {
        video.value.addEventListener("timeupdate", updateTime);
        startTimer();
      }
      fetchExercise();
    });

    return {
      video,
      currentTime,
      isPaused,
      timer,
      exerciseName,
      exercise,
      togglePlayPause
    };
  }
};
</script>

<template>
  <section class="w-full min-h-dvh flex flex-col items-start gap-4 bg-[#2c2c2c]">
    <div class="timer-container">
      <svg class="timer" viewBox="0 0 36 36">
        <path
          class="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle"
          :stroke-dasharray="`${(timer / 60) * 100}, 100`"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          style="transition: stroke-dasharray 1s linear;"
        />
        <text x="18" y="20.35" class="percentage">{{ Math.floor(timer / 60) }}:{{ Math.floor(timer % 60).toString().padStart(2, '0') }}</text>
      </svg>
      <div class="exercise-name">
        <span>{{ exerciseName }}</span>
      </div>
    </div>
    <video id="videoPreview" width="320" height="240" controls>
      <source :src="exercise.videoPath" />
      <track
        kind="captions"
        src="path/to/captions.vtt"
        srclang="en"
        label="English"
      />
      Seu navegador não suporta o elemento de vídeo.
    </video>
    <div class="controls">
      <div class="controls-buttons">
        <div class="info">
          <span>Tempo</span>
          <span>20 MIN</span>
        </div>
        <button @click="togglePlayPause">
          <component :is="isPaused ? IconPlayerPlay : IconPlayerPause" size="30" />
        </button>
        <div class="info">
          <span>Musc</span>
          <span>Pernas</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  height: 100vh;
  background-color: transparent;
  overflow: hidden;
}

video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

video::-webkit-media-controls {
  display: none;
}

.timer-container {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.timer {
  width: 100px;
  height: 100px;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke: #ffdd00;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

.percentage {
  fill: white;
  font-size: 0.6rem;
  text-anchor: middle;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.exercise-name {
  color: white;
  font-size: 1.5rem;
}

.controls {
  width: 100%;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
}

.controls button {
  background-color: #ffcc00;
  color: #2e2e2e;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls span {
  color: white;
  font-size: 3rem;
}

.controls-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  background-color: #2e2e2e;
  width: 6.5rem;
  padding: 10px;
  border-radius: 5px;
  font-weight: 300;
}

.info span {
  font-size: 1rem;
  text-align: center;
}
</style>
