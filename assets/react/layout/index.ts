type Container = {
  // The identification of the container
  id: string;
  // The component that housed by the container
  components: Component[];
};

type Component = {
  // Component that to be loaded within this container
  name: any;
  // There can only be one child of the component, and it should be the Container
  child: any;
  // Style for the component. Styled Component will config this
  style: {};
  // List of props that to be loaded with the component
  props: {};
};
