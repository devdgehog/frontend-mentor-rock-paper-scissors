export const LOSE_FACTOR = -1;
export const WIN_FACTOR = 1;
export const NUL_FACTOR = 0;

type HslColor = string;

type ColorGradient = {
  from: HslColor;
  to: HslColor;
}

export class Choice {
  public icon: string;
  public colorGradient: ColorGradient;
  public borderShadowColor: HslColor;

  private readonly advantages: Choice[] = [];

  private readonly weaknesses: Choice[] = [];

  constructor(icon: string, colorGradient: ColorGradient, borderShadowColor: HslColor) {
    this.icon = icon;
    this.colorGradient = colorGradient;
    this.borderShadowColor = borderShadowColor;
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

const rockGradient = { from: "hsl(349, 71%, 52%)", to: "hsl(349, 70%, 56%)" };
const paperGradient = { from: "hsl(230, 89%, 62%)", to: "hsl(230, 89%, 65%)" };
const scissorsGradient = { from: "hsl(39, 89%, 49%)", to: "hsl(40, 84%, 53%)" };
const lizardGradient = { from: "hsl(261, 73%, 60%)", to: "hsl(261, 72%, 63%)" };
const spockGradient = { from: "hsl(189, 59%, 53%)", to: "hsl(189, 58%, 57%)" };

export const ROCK = new Choice('/images/icon-rock.svg', rockGradient, "hsl(349, 70%, 35%)");
export const PAPER = new Choice('/images/icon-paper.svg', paperGradient, "hsl(230, 89%, 35%)");
export const SCISSORS = new Choice('/images/icon-scissors.svg', scissorsGradient, "hsl(40, 84%, 35%)");
export const LIZARD = new Choice('/images/icon-lizard.svg', lizardGradient, "hsl(261, 72%, 35%)");
export const SPOCK = new Choice('/images/icon-spock.svg', spockGradient, "hsl(189, 58%, 35%)");

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
export const CHOICES = [ROCK, PAPER, SCISSORS, SPOCK, LIZARD];
