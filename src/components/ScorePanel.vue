<template>
  <header>
    <img src="/images/logo-bonus.svg" />
    <div class="score-panel">
      <div class="score-label">SCORE</div>
      <div class="score-value">{{ score }}</div>
    </div>
  </header>
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

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1.5rem;
  border: 0.25rem solid hsl(217, 16%, 45%);
  border-radius: 1rem;
}

.score-panel {
  justify-self: end;
  display: grid;
  justify-content: center;
  grid-template-rows: min-content 1fr;
  width: 15vw;
  max-width: 8rem;
  background-color: #eee;
  color: hsl(229, 25%, 31%);
  border-radius: 0.5rem;
  padding: 1rem;
}

.score-label {
  display: grid;
  justify-content: center;
  color: hsl(229, 64%, 46%);
}

.score-value {
  display: grid;
  justify-content: center;
  font-size: 3em;
}
</style>
