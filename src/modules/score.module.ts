import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';

const scoreLocalStorageKey = 'store';

@Module({ namespaced: true, name: 'score' })
export default class ScoreModule extends VuexModule {
    private scoreValue = 0;

    get score() {
      return this.scoreValue;
    }

    @Mutation
    private commitScore(value: number) {
      this.scoreValue = value;
    }

    @Action
    public changeScore(delta: number) {
      const updatedScore = this.scoreValue + delta;
      localStorage.setItem(scoreLocalStorageKey, updatedScore.toString());
      this.commitScore(updatedScore);
    }

    @Action
    public loadScore() {
      const loadedScore = localStorage.getItem(scoreLocalStorageKey);
      if (loadedScore !== null) {
        this.commitScore(+loadedScore);
      }
    }
}
