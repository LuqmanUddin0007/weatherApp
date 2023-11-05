
import useWeatherData from '../../hooks/useWeatherData'; 
import { renderHook, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock'; 


jest.mock('jest-fetch-mock');

describe('useWeatherData hook', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches search options correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ name: 'City 1', lat: 1, lon: 1 }, { name: 'City 2', lat: 2, lon: 2 }]));

    const { result } = renderHook(() => useWeatherData());

    await act(async () => {
      result.current.onInputChange({ target: { value: 'City' } } as React.ChangeEvent<HTMLInputElement>);

      await new Promise(resolve => setTimeout(resolve, 0)); // Wait for the next tick of the event loop

      expect(fetchMock).toHaveBeenCalledWith(/* expected API endpoint */);
    });

    expect(result.current.options).toEqual([{ name: 'City 1', lat: 1, lon: 1 }, { name: 'City 2', lat: 2, lon: 2 }]);
  });

  it('fetches forecast data correctly', async () => {
    const mockData = {
      city: { name: 'London', country: 'GB', lat: 1, lon: 1 },
      list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => useWeatherData());

    await act(async () => {
      result.current.onOptionSelect({ name: 'London', country: 'GB', lat: 1, lon: 1 },);

      await new Promise(resolve => setTimeout(resolve, 0)); // Wait for the next tick of the event loop

      expect(fetchMock).toHaveBeenCalledWith(/* expected API endpoint */);
    });

    expect(result.current.forecast).toEqual(mockData);
  });

  // Add more test cases for other functionalities of the hook
});
