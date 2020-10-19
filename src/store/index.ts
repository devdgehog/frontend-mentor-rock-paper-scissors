import Vue from 'vue';
import Vuex from 'vuex';
import ChoiceModule from '@/modules/choice.module';
import ScoreModule from '@/modules/score.module';
import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex);

const modules = {
  choice: ChoiceModule,
  score: ScoreModule,
};

const store = new Vuex.Store({
  modules,
});

export const choiceStore = getModule(ChoiceModule, store);
export const scoreStore = getModule(ScoreModule, store);
export default store;
