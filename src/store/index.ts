import Vue from 'vue';
import Vuex from 'vuex';
import ScoreModule from '@/modules/score.module';
import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex);

const modules = {
  score: ScoreModule,
};

const store = new Vuex.Store({
  modules,
});

export const scoreStore = getModule(ScoreModule, store);
export default store;
