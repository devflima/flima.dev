import { describe, it, expect } from 'vitest';
import { getSplitTitle } from './textUtils';

describe('getSplitTitle Utility', () => {
  it('returns default title when no title is provided', () => {
    const result = getSplitTitle(null);
    expect(result.before).toBe('ARCHITECTING');
    expect(result.highlighted).toBe('DISTRIBUTED');
    expect(result.after).toBe('SYSTEMS.');
  });

  it('handles short titles with 1 or 2 words', () => {
    expect(getSplitTitle('One')).toEqual({ before: 'One', highlighted: '', after: '' });
    expect(getSplitTitle('One Two')).toEqual({ before: 'One', highlighted: 'Two', after: '' });
  });

  it('splits odd number of words (3 words)', () => {
    // len=3, mid=1, start=1, count=1
    const result = getSplitTitle('Word1 Word2 Word3');
    expect(result.before).toBe('Word1');
    expect(result.highlighted).toBe('Word2');
    expect(result.after).toBe('Word3');
  });

  it('splits even number of words (4 words)', () => {
    // len=4, mid=2, start=1, count=2
    const result = getSplitTitle('Word1 Word2 Word3 Word4');
    expect(result.before).toBe('Word1');
    expect(result.highlighted).toBe('Word2 Word3');
    expect(result.after).toBe('Word4');
  });

  it('splits 5 words correctly', () => {
    // len=5, mid=2, start=2, count=1
    const result = getSplitTitle('W1 W2 W3 W4 W5');
    expect(result.before).toBe('W1 W2');
    expect(result.highlighted).toBe('W3');
    expect(result.after).toBe('W4 W5');
  });
});
