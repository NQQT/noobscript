describe('How to set up resources for Ceryron Image Engine', () => {
  test('An example of how resources should be used', () => {
    const { resources } = ceyron;

    const time = resources('times');
    const items = resources('consumables');

    // Adding Day item into time resources
    time.add({
      id: 'day',
      value: {
        current: 0,
      },
    });

    items.add({
      id: 'woods',
      value: {
        current: 0,
        max: 10,
      },
    });

    time.get('day').on.increment(() => {
      // Increase wood by 10 for every day increase.
      items.get('woods').increase();

      // How do i remove this afterwards though...?
    });
  });
});
