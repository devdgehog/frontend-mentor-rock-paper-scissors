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

ROCK.setWeaknesses([PAPER]);
PAPER.setWeaknesses([SCISSORS]);
SCISSORS.setWeaknesses([ROCK]);

ROCK.setAdvantages([SCISSORS]);
PAPER.setAdvantages([ROCK]);
SCISSORS.setAdvantages([PAPER]);

export const CHOICES = [ROCK, PAPER, SCISSORS];
