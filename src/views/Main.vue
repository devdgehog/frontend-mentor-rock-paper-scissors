<template>
  <div>
    Score: {{ score }}
    Rules

    You Picked
    The House Picked

    You Win
    You Lose

    Play Again

    <div class="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
      Coded by <a href="#">Your Name Here</a>.
    </div>
  </div>
</template>

<script lang="ts">
import { scoreStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  get score(): number {
    return scoreStore.score;
  }
}
</script>
