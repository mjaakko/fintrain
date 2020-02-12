import longestCommonSubsequence from '../longestCommonSubsequence';

describe('longestCommonSubsequence', () => {
  test('longest common subseqence for empty strings is empty string', () => {
    expect(longestCommonSubsequence('', '')).toBe('');
  });

  test("longest common subseqence for 'aa' and 'aab' is 'aa'", () => {
    expect(longestCommonSubsequence('aa', 'aab')).toBe('aa');
  });

  test("longest common subseqence for 'aab' and 'aac' is 'aa'", () => {
    expect(longestCommonSubsequence('aab', 'aac')).toBe('aa');
  });

  test("longest common subseqence for 'abc' and 'xyz' is empty string", () => {
    expect(longestCommonSubsequence('abc', 'xyz')).toBe('');
  });
});
