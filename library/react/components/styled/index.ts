import { objectEach } from '@library/presource/js/object/each';
import { objectMapAttribute, objectMapMediaMinMax, objectStyled } from '@library/presource/cs';

type Arguments = {
  value: any;
  key: string;
  v: any;
  k: string;
};

type Callback = (args: Arguments) => any;

type Filters = {
  // Media can be Number or plain number
  media: { [key: string]: number[] };
  name: {
    [key: string]: Callback;
  };
};

/** This function allows creation of styled components. Must add styled component  */
export const createStyledReactComponent = (styled: any, filters: Filters) => {
  // Constructing the Filter and Mappers
  const { media, name } = filters;
  const mappers: any = {};
  // Setting up the Media format
  objectEach(media, ({ v, k }) => {
    mappers[k] = objectMapMediaMinMax(v[0], v[1]);
  });

  objectEach(name, ({ v, k }) => {
    // For Mapping Attribute
    mappers[k] = objectMapAttribute(v);
  });

  // Return the Wrapper to style any components
  return (component: any) => {
    // Return a Styled Components
    return styled(component)((props: any) => objectStyled(props, mappers));
  };
};
