// Standard Styled Object
export type StyledObject = { [key: string]: any };
// The Argument
export type MapperArguments = {
  // The Value
  value: number | string | StyledObject;
  key: string;
  input: StyledObject;
  output: StyledObject;
  i: StyledObject;
  o: StyledObject;
  // Short hand Notation
  v: number | string | StyledObject;
  k: string;
};
// The Transcribe Functions
export type MapperCallback = (args: MapperArguments, resolvers: MapperCallbackList) => any;

// The Transcribing Function
export type MapperCallbackList = { [key: string]: MapperCallback | MapperCallback[] };
