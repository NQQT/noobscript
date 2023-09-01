describe('How to set up attributes options', () => {
  test('An example of how choices should be used', () => {
    // Extracting out of ceyron engine
    const { attributes } = ceyron;

    // Create a choice alled mutations. Choices are not allowed to have same name.
    const stats = attributes('stats');

    stats.option({
      name: 'Attack Power',
      position: [10, 122, 10, 10],
      value: {
        current: 8,
        max: 10,
      },
    });

    stats.option({
      name: 'Combat Speed',
      position: [10, 122, 10, 10],
      value: {
        current: 8,
        max: 10,
      },
    });
  });
});
