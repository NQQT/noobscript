export type MapperArguments = {
  value: string[];
  key: string;
  output: { [key: string]: any };

  // Short hand notation
  v: MapperArguments['value'];
  k: MapperArguments['key'];
  o: MapperArguments['output'];
};

// The Transcribe Functions
export type MapperCallback = (args: MapperArguments, resolvers: MapperCallbackList) => any;
export type MapperCallbackList = { [key: string]: MapperCallback };

export type Structure = (value: string, mappers?: MapperCallbackList) => { [key: string]: any };
