describe('How to set up powers for Ceryron Image Engine', () => {
  test('An example of how powers should be used', () => {
    // Extracting out of ceyron engine
    const { powers } = ceyron;

    // Create a choice alled mutations. Choices are not allowed to have same name.
    const physical = powers('physical');

    // Add Options for the choices
    physical.option({
      // Name of the Choices
      name: 'Enhancement',
      // The Position on the image for manipulations.
      position: [10, 122, 10, 10],
      modifier: ({ choices }) => {
        /// Adjusting other attributes
      },
    });
    physical.option({
      name: 'Regeneration',
      position: [10, 122, 10, 10],
    });
  });
});
