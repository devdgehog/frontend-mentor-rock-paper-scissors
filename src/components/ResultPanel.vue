<template>
  <div :class="`results ${showResult ? 'show-result': ''}`">
    <div class="result user">
      <div class="result__text-info">
        You Picked
      </div>
      <div
        class="choice user"
        v-if="userChoice"
        :data-color-from="userChoice.colorGradient.from"
        :data-color-to="userChoice.colorGradient.to"
        :data-shadow-color="userChoice.borderShadowColor"
        ref="userChoice"
      >
        <img :src="userChoice.icon" />
        <div :class="userInnerDiskClasses"></div>
      </div>
    </div>
    <transition name="fade">
    <div class="result announcement" v-show="showResult">
      <div class="result__text result__text-info">{{announcement}}</div>
      <div class="result__playAgain" @pointerup.stop="playAgain()" data-cy="play-again">Play again</div>
    </div>
    </transition>
    <div class="result house">
      <div class="result__text-info">
        The House Picked
      </div>
      <div
        class="choice house"
        :data-color-from="houseChoice.colorGradient.from"
        :data-color-to="houseChoice.colorGradient.to"
        :data-shadow-color="houseChoice.borderShadowColor"
        ref="houseChoice"
        v-show="showHouseChoice"
      >
        <img :src="houseChoice.icon" />
        <div :class="houseInnerDiskClasses"></div>
      </div>
      <div class="choice house" v-show="!showHouseChoice"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Choice, CHOICES } from '@/models/choice';
import { choiceStore, scoreStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ResultPanel extends Vue {
  private houseChoiceVisible = false;
  private resultVisible = false;

  get userChoice() {
    return choiceStore.getUserChoice;
  }

  get houseChoice() {
    return choiceStore.getHouseChoice;
  }

  get choiceResult() {
    if (this.userChoice && this.houseChoice) {
      return this.userChoice.getResult(this.houseChoice);
    }
  }

  get announcement() {
    switch (this.choiceResult) {
      case -1:
        return "YOU LOSE";
      case 1:
        return "YOU WIN";
      default:
        return "DRAW";
    }
  }

  get showHouseChoice() {
    return this.houseChoiceVisible;
  }

  get showResult() {
    return this.resultVisible;
  }

  get userInnerDiskClasses() {
    return {
      "inner-disk": true,
      win: this.showHouseChoice && this.choiceResult && this.choiceResult > 0,
    }
  }

  get houseInnerDiskClasses() {
    return {
      "inner-disk": true,
      win: this.showHouseChoice && this.choiceResult && this.choiceResult < 0,
    }
  }

  updateScore() {
    scoreStore.changeScore(choiceStore.result);
  }

  playAgain() {
    choiceStore.resetChoices();
  }

  colorize(choiceHtmlElement: HTMLElement) {
    choiceHtmlElement.style.backgroundImage = `linear-gradient(135deg, ${choiceHtmlElement.getAttribute('data-color-to')}, ${choiceHtmlElement.getAttribute('data-color-from')})`;
    choiceHtmlElement.style.boxShadow = `0 0.5vmin ${choiceHtmlElement.getAttribute('data-shadow-color')}`;
  }

  mounted() {
    const userChoiceHtmlElement = this.$refs.userChoice as HTMLElement;
    const houseChoiceHtmlElement = this.$refs.houseChoice as HTMLElement;
    this.colorize(userChoiceHtmlElement);
    this.colorize(houseChoiceHtmlElement);
    setTimeout(() => {
      this.houseChoiceVisible = true;
      this.updateScore();
      setTimeout(() => this.resultVisible = true, 1000);
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
@function waveGradient($index) {
  @return radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 25%,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 255, 255, 0.1) 25% + $index * 1.5%,
    rgba(255, 255, 255, 0.1 - $index * 0.005) 25% + $index * 1.5%,
    rgba(255, 255, 255, 0.1 - $index * 0.005) 40% + $index * 1.5%,
    rgba(255, 255, 255, 0.05 - $index * 0.0025) 40% + $index * 1.5%,
    rgba(255, 255, 255, 0.05 - $index * 0.0025) 55% + $index * 1.5%,
    rgba(255, 255, 255, 0.025 - $index * 0.0025) 55% + $index * 1.5%,
    rgba(255, 255, 255, 0) 70%
  );
} 

.results {
  justify-content: center;
  align-items: center;
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 20vmin 20vmin;
  grid-template-areas: "user-choice house-choice";
  text-transform: uppercase;
  text-align: center;
  grid-gap: 0;
  transition: row-gap 1s, column-gap 1s;

  &.show-result {
    grid-template-columns: 20vmin 20vmin 20vmin;
    grid-template-areas: "user-choice result-announcement house-choice";
    grid-gap: 10vmin;
    transition: all 1s;

    @media (max-width: 60rem) {
      grid-template-columns: 20vmin 20vmin;
      grid-template-areas:
        "user-choice house-choice"
        "result-announcement result-announcement";
    }
  }
}

.result {
  display: grid;
  row-gap: 1rem;
  align-items: center;
  justify-content: center;

  &.user {
    grid-area: user-choice;
  }

  &.house {
    grid-area: house-choice;
  }

  &.announcement {
    grid-area: result-announcement;
  }
}

.result__text {
  font-size: calc(min(5vmin, 3rem));
}

.result__text-info {
  white-space: nowrap;
}

.result__playAgain {
  padding: 1vmin;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 0.5vmin;
  background-color: #eee;
  color: hsl(229, 25%, 31%);
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.choice {
  display: grid;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 10vmin;
  height: 10vmin;
  border-radius: 50%;
  border: 2vmin solid transparent;
  box-shadow: inset 0 0 2.5vmin 0 rgba(0, 0, 0, 0.35);;
}

img {
  z-index: 1;
  width: 5vw;
  max-width: 3rem;
  background-image: waveGradient(1);
}

.inner-disk {
  position: absolute;
  box-shadow: inset 0 0.5vmin rgba(0, 0, 0, 0.15);
  width: 10vmin;
  height: 10vmin;
  border-radius: 50%;
  background-color: #eee;
}

.inner-disk.win::before {
  content: "";
  vertical-align: middle;
  position: absolute;
  width: 40vmin;
  height: 40vmin;
  border-radius: 50%;
  
  transform: translateX(-50%) translateY(-15vmin);
  animation-name: wave;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}

@keyframes wave {
  0% {
    background-image: waveGradient(0);
  }
  10% {
    background-image: waveGradient(1);
  }
  20% {
    background-image: waveGradient(2);
  }
  30% {
    background-image: waveGradient(3);
  }
  40% {
    background-image: waveGradient(4);
  }
  50% {
    background-image: waveGradient(5);
  }
  60% {
    background-image: waveGradient(6);
  }
  70% {
    background-image: waveGradient(7);
  }
  80% {
    background-image: waveGradient(8);
  }
  90% {
    background-image: waveGradient(9);
  }
  100% {
    background-image: waveGradient(0);
  }
}
</style>
