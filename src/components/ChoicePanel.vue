<template>
  <div class="choices" ref="choicesPanel">
    <button
      v-for="(choice, index) in choices"
      :key="`choice-${index}`"
      :data-cy="`choice-${index}`"
      :data-color-from="choice.colorGradient.from"
      :data-color-to="choice.colorGradient.to"
      :data-shadow-color="choice.borderShadowColor"
      @pointerup.stop="storeUserChoiceAndPlay(choice)"
      ref="choices"
      class="choice"
      :aria-label="`Select ${choice.name}`"
    >
      <img :src="`/images/icon-${choice.name}.svg`" :alt="`${choice.name} image`" aria-hidden="true" />
      <div class="inner-disk" aria-hidden="true"></div>
    </button>
  </div>
</template>

<script lang="ts">
import { Choice, CHOICES } from '@/models/choice';
import { choiceStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ChoicePanel extends Vue {
  private registeredCallbackOnResize: (() => void)[] = [];

  get choices(): Choice[] {
    return CHOICES;
  }

  storeUserChoiceAndPlay(choice: Choice) {
    const houseChoiceIndex = Math.floor(Math.random() * CHOICES.length);
    choiceStore.setUserChoice(choice);
    choiceStore.setHouseChoice(CHOICES[houseChoiceIndex]);
  }

  setPositionChoice(choiceHtmlElement: HTMLElement, choicePanelHtmlElement: HTMLElement, index: number) {
    choiceHtmlElement.style.width = "";
    choiceHtmlElement.style.height = "";
    const choiceBoundingRect = choiceHtmlElement.getBoundingClientRect();
    const choicePanelBoundingRect = choicePanelHtmlElement.getBoundingClientRect();
    const distance = 0.5 * choicePanelBoundingRect.height;
    choiceHtmlElement.style.width = `${ 0.6 * distance }px`;
    choiceHtmlElement.style.height = `${ 0.6 * distance }px`;

    const centerX = choicePanelBoundingRect.x + 0.5 * (choicePanelBoundingRect.width - choiceHtmlElement.getBoundingClientRect().width);
    const centerY = choicePanelBoundingRect.y + 0.5 * (choicePanelBoundingRect.height - choiceHtmlElement.getBoundingClientRect().height);
    const xDirectionFactor = Math.cos((-0.3 + index * 0.4) * Math.PI);
    const yDirectionFactor = Math.sin((-0.3 + index * 0.4) * Math.PI);
    const offsetX = xDirectionFactor * distance;
    const offsetY = yDirectionFactor * distance;

    choiceHtmlElement.style.top = `${centerY - offsetY}px`;
    choiceHtmlElement.style.left = `${centerX + offsetX}px`;
    choiceHtmlElement.style.backgroundImage = `linear-gradient(135deg, ${choiceHtmlElement.getAttribute('data-color-to')}, ${choiceHtmlElement.getAttribute('data-color-from')})`;
    choiceHtmlElement.style.boxShadow = `0 0.5vmin ${choiceHtmlElement.getAttribute('data-shadow-color')}`;
    choiceHtmlElement.style.visibility = "visible";
  }

  mounted() {
    const choicePanelHtmlElement = this.$refs.choicesPanel as HTMLElement;
    const choiceHtmlElements = this.$refs.choices as HTMLElement[];
    for(let index = 0; index < choiceHtmlElements.length; ++index) {
      (choiceHtmlElements[index].childNodes[0] as HTMLImageElement).onload = () => {
        this.setPositionChoice(choiceHtmlElements[index], choicePanelHtmlElement, index);
      }
      const resizeCallback = () => this.setPositionChoice(choiceHtmlElements[index], choicePanelHtmlElement, index);
      this.registeredCallbackOnResize.push(resizeCallback);
      window.addEventListener("resize", resizeCallback);
    }
  }

  beforeDestroy() {
    for (const resizeCallback of this.registeredCallbackOnResize) {
      window.removeEventListener("resize", resizeCallback);
    }
    this.registeredCallbackOnResize = [];
  }
}
</script>

<style lang="scss" scoped>
.choices {
  justify-self: center;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 45vmin;
  height: 45vmin;
  min-width: 15rem;
  min-height: 15rem;
  background-image: url("/images/bg-pentagon.svg");
  background-repeat: no-repeat;
  background-size: contain;

  .choice {
    display: grid;
    align-items: center;
    justify-content: center;
    position: absolute;
    visibility: hidden;
    border-radius: 50%;
    border: 2vmin solid transparent;
    cursor: pointer;

    &:hover .inner-disk {
      background-color: #fff;
    }
  }

  img {
    z-index: 1;
    width: 5vw;
    max-width: 3rem;
  }

  .inner-disk {
    position: absolute;
    box-shadow: inset 0 0.5vmin rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

}
</style>
