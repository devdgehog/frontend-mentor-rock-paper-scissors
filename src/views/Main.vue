<template>
  <main>
    <ScorePanel></ScorePanel>
    <ResultPanel v-if="hasPlayed"></ResultPanel>
    <ChoicePanel v-else></ChoicePanel>
    <Footer></Footer>
  </main>
</template>

<script lang="ts">
import { choiceStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';
import ChoicePanel from '@/components/ChoicePanel.vue';
import ResultPanel from '@/components/ResultPanel.vue';
import ScorePanel from '@/components/ScorePanel.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    ChoicePanel,
    ResultPanel,
    ScorePanel,
    Footer,
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
</style>
