import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';

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
      this.commitScore(this.scoreValue + delta);
    }
}
