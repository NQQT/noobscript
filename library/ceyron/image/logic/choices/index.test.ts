describe('How to set up choices', () => {
  test('An example of how choices should be used', () => {
    // Extracting out of ceyron engine
    const { choices } = ceyron;

    // Create a choice alled mutations. Choices are not allowed to have same name.
    const mutations = choices('mutations');
    // COnfiguration. Setting maximum number of choices allowed. Default will always be 1
    mutations.max(2);

    // Add Options for the choices
    mutations.option({
      // Name of the Choices
      name: 'Claws',
      // The Position on the image for manipulations.
      position: [10, 122, 10, 10],
    });
    mutations.option({
      name: 'Fangs',
      position: [10, 122, 10, 10],
    });
  });
});
