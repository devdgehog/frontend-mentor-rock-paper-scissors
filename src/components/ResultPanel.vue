<template>
  <div class="results">
    <div>
      You Picked
      <img :src="getUserIcon" />
    </div>
    <div>
      The House Picked
      <img :src="getHouseIcon" />
    </div>
    <button @pointerup.stop="playAgain()" data-cy="play-again">Play again</button>
  </div>
</template>

<script lang="ts">
import { Choice, CHOICES } from '@/models/choice';
import { choiceStore, scoreStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ResultPanel extends Vue {
  get choices(): Choice[] {
    return CHOICES;
  }

  storeUserChoiceAndPlay(choice: Choice) {
    const houseChoiceIndex = Math.floor(Math.random() * CHOICES.length);
    choiceStore.setUserChoice(choice);
    choiceStore.setHouseChoice(CHOICES[houseChoiceIndex]);
  }

  get getUserIcon() {
    return choiceStore.getUserChoice?.icon;
  }

  get getHouseIcon() {
    return choiceStore.getHouseChoice?.icon;
  }

  updateScore() {
    scoreStore.changeScore(choiceStore.result);
  }

  playAgain() {
    this.updateScore();
    choiceStore.resetChoices();
  }
}
</script>
