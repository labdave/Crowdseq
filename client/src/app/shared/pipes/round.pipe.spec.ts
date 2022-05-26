import { DecimalPipe } from '@angular/common';
import { RoundPipe } from './round.pipe';

/**
 * Complete
 */
describe('RoundPipe', () => {
  const pipe: RoundPipe = new RoundPipe(new DecimalPipe('en-US'));

  it('should be created', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform 1e10 to 10,000,000,000.00', () => {
    expect(pipe.transform(1e11)).toBe('1.00e+11');
  });

  it('should transform 1.4444445 to 1.45', () => {
    expect(pipe.transform(1.4444445)).toBe('1.44');
  });

  it(`should change nothing`, () => {
    expect(pipe.transform(1.12)).toBe('1.12');
  });
});
