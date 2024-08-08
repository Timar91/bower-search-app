import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

test('renders Home component', async () => {
  global.fetch = jest.fn(() =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { repository_id: '1', name: 'React', owner: 'Facebook', stars: 100 },
              { repository_id: '2', name: 'Vue', owner: 'Evan You', stars: 80 },
            ]),
          headers: new Headers(),
          redirected: false,
          status: 200,
          statusText: 'OK',
          type: 'basic',
          url: '',
          clone: jest.fn(),
          body: null,
          bodyUsed: false,
          text: jest.fn(),
          formData: jest.fn(),
          blob: jest.fn(),
          arrayBuffer: jest.fn(),
        });
      }, 100);
    })
  );

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<Home />);
  });

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('React')).toBeInTheDocument();
  expect(await screen.findByText('Vue')).toBeInTheDocument();
  expect(await screen.findByText('Owner: Facebook')).toBeInTheDocument();
  expect(await screen.findByText('Owner: Evan You')).toBeInTheDocument();
  expect(await screen.findByText('Stars: 100')).toBeInTheDocument();
  expect(await screen.findByText('Stars: 80')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);

  (global.fetch as jest.Mock).mockClear();
});

test('handles fetch error', async () => {
  global.fetch = jest.fn(() =>
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Network error'));
      }, 100);
    })
  );

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<Home />);
  });

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('Error fetching data')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);

  (global.fetch as jest.Mock).mockClear();
});
