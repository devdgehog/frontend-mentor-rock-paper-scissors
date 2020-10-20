<template>
  <div class="score">
    Score: {{ score }}
  </div>
</template>

<script lang="ts">
import { scoreStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ScorePanel extends Vue {
  get score(): number {
    return scoreStore.score;
  }
}
</script>
