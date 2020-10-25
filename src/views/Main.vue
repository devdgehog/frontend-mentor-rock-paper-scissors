<template>
  <main>
    <ScorePanel></ScorePanel>
    <ResultPanel v-if="hasPlayed"></ResultPanel>
    <ChoicePanel v-else></ChoicePanel>
    <div class="attribution">
      <span>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.</span>
      <span>Coded by <a href="https://twitter.com/devdgehog" target="_blank">devdgehog</a>.</span>
    </div>
  </main>
</template>

<script lang="ts">
import { choiceStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';
import ChoicePanel from '@/components/ChoicePanel.vue';
import ResultPanel from '@/components/ResultPanel.vue';
import ScorePanel from '@/components/ScorePanel.vue';

@Component({
  components: {
    ChoicePanel,
    ResultPanel,
    ScorePanel,
  },
})
export default class Main extends Vue {
  get hasPlayed() {
    return choiceStore.hasPlayed;
  }
}
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 80vw;
  max-width: 60rem;
  display: grid;
  align-items: center;
  justify-content: stretch;
}

.attribution {
  display: grid;
  justify-content: center;
  justify-self: center;
  a {
    color: rgb(91, 206, 235);
  }

  span {
    text-align: center;
  }
}
</style>
