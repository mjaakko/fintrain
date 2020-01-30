import { renderHook, act } from '@testing-library/react-hooks';
import usePersistedState from '../usePersistedState';

describe('usePersistedState', () => {
  const mapStorage = new Map();
  const fakeStorage = {
    getItem: key => mapStorage.get(key),
    setItem: (key, value) => mapStorage.set(key, value),
    clear: () => mapStorage.clear(),
  };

  afterEach(() => {
    fakeStorage.clear();
  });

  test('value from storage is used if available', () => {
    fakeStorage.setItem('key', JSON.stringify('test'));

    const { result } = renderHook(() =>
      usePersistedState('key', fakeStorage, 'abc')
    );

    expect(result.current[0]).toBe('test');
  });

  test('default value is saved to storage', () => {
    const { result } = renderHook(() =>
      usePersistedState('key', fakeStorage, 'abc')
    );

    expect(result.current[0]).toBe('abc');
    expect(fakeStorage.getItem('key')).toBe(JSON.stringify('abc'));
  });

  test('updated value is saved to storage', () => {
    const { result } = renderHook(() =>
      usePersistedState('key', fakeStorage, 'abc')
    );

    act(() => {
      result.current[1]('def'); //setValue
    });

    expect(result.current[0]).toBe('def');
    expect(fakeStorage.getItem('key')).toBe(JSON.stringify('def'));
  });
});
