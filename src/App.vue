<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { scoreStore } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  beforeMount() {
    scoreStore.loadScore();
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  width: 100vw;
  height: 100vh;
}

#app {
  background-image: linear-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
  color: white;
  font-family: 'Barlow Semi Condensed', sans-serif;
}
</style>
