export const LOSE_FACTOR = -1;
export const WIN_FACTOR = 1;
export const NUL_FACTOR = 0;

export class Choice {
  public icon: string;

  private readonly advantages: Choice[] = [];

  private readonly weaknesses: Choice[] = [];

  constructor(icon: string) {
    this.icon = icon;
  }

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

export const ROCK = new Choice('/images/icon-rock.svg');
export const PAPER = new Choice('/images/icon-paper.svg');
export const SCISSORS = new Choice('/images/icon-scissors.svg');
export const LIZARD = new Choice('/images/icon-lizard.svg');
export const SPOCK = new Choice('/images/icon-spock.svg');

ROCK.setWeaknesses([PAPER, SPOCK]);
PAPER.setWeaknesses([SCISSORS, LIZARD]);
SCISSORS.setWeaknesses([ROCK, SPOCK]);
LIZARD.setWeaknesses([ROCK, SCISSORS]);
SPOCK.setWeaknesses([PAPER, LIZARD]);

ROCK.setAdvantages([SCISSORS, LIZARD]);
PAPER.setAdvantages([ROCK, SPOCK]);
SCISSORS.setAdvantages([PAPER, LIZARD]);
LIZARD.setWeaknesses([PAPER, SPOCK]);
SPOCK.setWeaknesses([ROCK, SCISSORS]);

export const SIMPLE_CHOICES = [ROCK, PAPER, SCISSORS];
export const CHOICES = [ROCK, PAPER, SCISSORS, LIZARD, SPOCK];
