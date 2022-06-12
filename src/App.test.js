import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe("Fifth practice", () => {

  it("This should show a list of x-men from the api", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => data
    });

    render(<App />);
    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith('https://xmenapiheroku.herokuapp.com/api/characters');

    for(let xmen of data.results) {
      expect(await screen.findByText(xmen.name)).toBeInTheDocument();
    }
  });

  it("This should show an error message when there is an error network", async () => {
    window.fetch.mockRejectedValue(new Error('Network error'));

    render(<App />);
    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });

  it("This should show an error message when there is an server error", async () => {
    window.fetch.mockRejectedValue({
      ok: false,
      status: 500
    });
  
    render(<App />);
    expect(await screen.findByText("Server error")).toBeInTheDocument();
  });
  
  it("This should show an error message when there is an not found error", async () => {
    window.fetch.mockRejectedValueOnce({
      ok: false,
      status: 404
    });
  
    render(<App />);
    expect(await screen.findByText(/Not found/i)).toBeInTheDocument();
  });

});
