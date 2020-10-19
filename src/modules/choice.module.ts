import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';

import { Choice } from '@/models/choice';

@Module({ namespaced: true, name: 'choice' })
export default class ScoreModule extends VuexModule {
    private choice: Choice | null = null;

    get userChoice() {
      return this.choice;
    }

    @Mutation
    private commitChoice(choice: Choice) {
      this.choice = choice;
    }

    @Action
    public setChoice(choice: Choice) {
      this.commitChoice(choice);
    }
}
