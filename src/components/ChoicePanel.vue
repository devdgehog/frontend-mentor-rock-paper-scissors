<template>
  <div class="choices">
    <img
      v-for="(choice, i) in choices"
      :key="`choice-${i}`"
      :src="choice.icon"
      @pointerup.stop="storeUserChoiceAndPlay(choice)"
    />
    <img :src="getIcon" />
  </div>
</template>

<script lang="ts">
import { Choice, CHOICES } from '@/models/choice';
import { choiceStore, scoreStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ChoicePanel extends Vue {
  get choices(): Choice[] {
    return CHOICES;
  }

  storeUserChoiceAndPlay(choice: Choice) {
    const houseChoiceIndex = Math.floor(Math.random() * CHOICES.length);
    choiceStore.setUserChoice(choice);
    choiceStore.setHouseChoice(CHOICES[houseChoiceIndex]);
  }

  get getIcon() {
    return choiceStore.getUserChoice?.icon;
  }
}
</script>
