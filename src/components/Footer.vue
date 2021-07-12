<template>
  <footer>
    <div class="footer">
      <button class="rulesButton" @click="showRules" aria-label="Display rules">
        RULES
      </button>
      <div class="attribution">
        <span>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.</span>
        <span>Coded by <a href="https://twitter.com/devdgehog" target="_blank">devdgehog</a>.</span>
      </div>
    </div>
    <transition name="fade">
      <div class="overlayPanel" v-show="rulesOpen">
        <div class="dialog">
          <h1 class="dialog__text">Rules</h1>
          <img
            class="dialog__image"
            src="/images/image-rules-bonus.svg"
            alt="rules of the game: scissors beats paper and lizard, paper beats stone and spock, stone beats lizard and scissors,
              lizard beats spock and stone, spock beats scissors and stone" />
          <button class="dialog__closeButton" @click.stop="hideRules">
            <img src="/images/icon-close.svg" alt="close icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </transition>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  private rulesOpen = false;

  showRules() {
    this.rulesOpen = true;
  }

  hideRules() {
    this.rulesOpen = false;
  }
}
</script>

<style lang="scss" scoped>
.attribution {
  grid-area: attribution;
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

.rulesButton {
  grid-area: rulesButton;
  justify-self: center;
  padding: 0.5rem;
  background-color: transparent;
  color: #eee;
  font-size: 1rem;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  width: 5rem;
  text-transform: uppercase;
  cursor: pointer;

  @media (min-width: 60rem) {
    justify-self: end;
  }

  &:hover {
    background-color: #eee;
    color: hsl(229, 25%, 31%);
  }
}

.footer {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-areas:
    "rulesButton"
    "attribution";
  text-align: center;
  row-gap: 1rem;

  @media (min-width: 60rem) {
    grid-template-areas:
      ". attribution rulesButton";
    grid-auto-columns: 1fr;
  }
}

.dialog {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-areas:
    "text"
    "image"
    "actions";
  padding: 3vmin;
  border-radius: 1vmin;
  background-color: white;

  @media (min-width: 60rem) {
    grid-template-areas:
      "text actions"
      "image image";
  }
}

.dialog__text {
  grid-area: text;
  justify-self: center;
  text-transform: uppercase;
  font-size: 2rem;
  color: hsl(229, 25%, 31%);

  @media (min-width: 60rem) {
    justify-self: start;
  }
}

.dialog__image {
  grid-area: image;
}

.dialog__closeButton {
  grid-area: actions;
  justify-self: center;
  place-content: center;

  background-color: transparent;
  border: none;

  cursor: pointer;

  @media (min-width: 60rem) {
    justify-self: end;
  }
}

.overlayPanel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: grid;
  place-items: stretch;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.15);

  @media (min-width: 60rem) {
    align-items: center;
    justify-content: center;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
