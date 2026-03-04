import { describe, it, expect } from 'vitest';

describe('Sample Test Suite', () => {
  it('should perform basic arithmetic', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  it('should handle strings', () => {
    const greeting = 'Hello, World!';
    expect(greeting).toContain('World');
  });
});
