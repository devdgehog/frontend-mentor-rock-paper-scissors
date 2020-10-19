export const LOSE_FACTOR = -1;
export const WIN_FACTOR = 1;
export const NUL_FACTOR = 0;

class Choice {
  private readonly weaknesses: Choice[] = [];

  private readonly advantages: Choice[] = [];

  public getResult(choice: Choice): number {
    if (this.weaknesses.includes(choice)) {
      return LOSE_FACTOR;
    } if (this.advantages.includes(choice)) {
      return WIN_FACTOR;
    }
    return NUL_FACTOR;
  }

  public setWeaknesses(weaknesses: Choice[]) {
    this.weaknesses.push(...weaknesses);
  }

  public setAdvantages(advantages: Choice[]) {
    this.advantages.push(...advantages);
  }
}

export const ROCK = new Choice();
export const PAPER = new Choice();
export const SCISSORS = new Choice();

ROCK.setWeaknesses([PAPER]);
PAPER.setWeaknesses([SCISSORS]);
SCISSORS.setWeaknesses([ROCK]);

ROCK.setAdvantages([SCISSORS]);
PAPER.setAdvantages([ROCK]);
SCISSORS.setAdvantages([PAPER]);
