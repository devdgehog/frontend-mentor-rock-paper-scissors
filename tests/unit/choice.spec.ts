import * as Choice from '@/models/choice';

describe('Choice', () => {
  it('should return a correct score using rock', () => {
    expect(Choice.ROCK.getResult(Choice.ROCK)).toBe(Choice.NUL_FACTOR);
    expect(Choice.ROCK.getResult(Choice.PAPER)).toBe(Choice.LOSE_FACTOR);
    expect(Choice.ROCK.getResult(Choice.SCISSORS)).toBe(Choice.WIN_FACTOR);
  });

  it('should return a correct score using paper', () => {
    expect(Choice.PAPER.getResult(Choice.ROCK)).toBe(Choice.WIN_FACTOR);
    expect(Choice.PAPER.getResult(Choice.PAPER)).toBe(Choice.NUL_FACTOR);
    expect(Choice.PAPER.getResult(Choice.SCISSORS)).toBe(Choice.LOSE_FACTOR);
  });

  it('should return a correct score using scissors', () => {
    expect(Choice.SCISSORS.getResult(Choice.ROCK)).toBe(Choice.LOSE_FACTOR);
    expect(Choice.SCISSORS.getResult(Choice.PAPER)).toBe(Choice.WIN_FACTOR);
    expect(Choice.SCISSORS.getResult(Choice.SCISSORS)).toBe(Choice.NUL_FACTOR);
  });

  // update with lizard and spock in a serious project
});
