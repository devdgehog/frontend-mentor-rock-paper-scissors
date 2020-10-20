import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';

import { Choice } from '@/models/choice';

@Module({ namespaced: true, name: 'choice' })
export default class ScoreModule extends VuexModule {
    private userChoice: Choice | null = null;

    private houseChoice: Choice | null = null;

    get getUserChoice() {
      return this.userChoice;
    }

    get getHouseChoice() {
      return this.houseChoice;
    }

    get hasPlayed() {
      return this.userChoice !== null && this.houseChoice !== null;
    }

    get result() {
      if (!this.userChoice || !this.houseChoice) {
        return 0;
      }
      return this.userChoice.getResult(this.houseChoice);
    }

    @Mutation
    private commitHouseChoice(choice: Choice | null) {
      this.houseChoice = choice;
    }

    @Action
    public setHouseChoice(choice: Choice) {
      this.commitHouseChoice(choice);
    }

    @Mutation
    private commitUserChoice(choice: Choice | null) {
      this.userChoice = choice;
    }

    @Action
    public setUserChoice(choice: Choice) {
      this.commitUserChoice(choice);
    }

    @Action
    public resetChoices() {
      this.commitHouseChoice(null);
      this.commitUserChoice(null);
    }
}
