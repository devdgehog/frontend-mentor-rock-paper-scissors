<template>
  <div>
    <ScorePanel></ScorePanel>
    <ResultPanel v-if="hasPlayed"></ResultPanel>
    <ChoicePanel v-else></ChoicePanel>
    <div class="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
      Coded by <a href="#">Your Name Here</a>.
    </div>
  </div>
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
