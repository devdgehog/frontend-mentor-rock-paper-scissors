<template>
  <div class="choices" ref="choicesPanel">
    <div
      v-for="(choice, index) in choices"
      :key="`choice-${index}`"
      :data-cy="`choice-${index}`"
      :data-color-from="choice.colorGradient.from"
      :data-color-to="choice.colorGradient.to"
      @pointerup.stop="storeUserChoiceAndPlay(choice)"
      ref="choices"
      class="choice"
    >
      <img :src="choice.icon"/>
      <div class="border"></div>
  </div>
  </div>
</template>

<script lang="ts">
import { Choice, CHOICES } from '@/models/choice';
import { choiceStore } from '@/store';
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

  setPositionChoice(choiceHtmlElement: HTMLElement, choicePanelHtmlElement: HTMLElement, index: number) {
    choiceHtmlElement.style.width = "";
    choiceHtmlElement.style.height = "";
    const choiceBoundingRect = choiceHtmlElement.getBoundingClientRect();
    const choicePanelBoundingRect = choicePanelHtmlElement.getBoundingClientRect();
    const distance = 0.5 * choicePanelBoundingRect.height;
    choiceHtmlElement.style.width = `${ 0.5 * distance }px`;
    choiceHtmlElement.style.height = `${ 0.5 * distance }px`;

    const centerX = choicePanelBoundingRect.x + 0.5 * (choicePanelBoundingRect.width - choiceHtmlElement.getBoundingClientRect().width);
    const centerY = choicePanelBoundingRect.y + 0.5 * (choicePanelBoundingRect.height - choiceHtmlElement.getBoundingClientRect().height);
    const xDirectionFactor = Math.cos((-0.3 + index * 0.4) * Math.PI);
    const yDirectionFactor = Math.sin((-0.3 + index * 0.4) * Math.PI);
    const offsetX = xDirectionFactor * distance;
    const offsetY = yDirectionFactor * distance;

    console.log(offsetX, offsetY);
    choiceHtmlElement.style.top = `${centerY - offsetY}px`;
    choiceHtmlElement.style.left = `${centerX + offsetX}px`;
    choiceHtmlElement.style.backgroundImage = `linear-gradient(135deg, ${choiceHtmlElement.getAttribute('data-color-from')}, ${choiceHtmlElement.getAttribute('data-color-to')})`;
    choiceHtmlElement.style.visibility = "visible";
}

  mounted() {
    const choicePanelHtmlElement = this.$refs.choicesPanel as HTMLElement;
    const choiceHtmlElements = this.$refs.choices as HTMLElement[];
    for(let index = 0; index < choiceHtmlElements.length; ++index) {
      (choiceHtmlElements[index].childNodes[0] as HTMLImageElement).onload = () => {
        this.setPositionChoice(choiceHtmlElements[index], choicePanelHtmlElement, index);
      }
      window.addEventListener("resize", () => this.setPositionChoice(choiceHtmlElements[index], choicePanelHtmlElement, index));
    }
  }
}
</script>
