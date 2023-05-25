type Arguments = {
  // The supplied value
  value: any;
  // The key of the element
  key: string;
  // The position of this filler function
  index: number;
  // The total filler length
  length: number;
  // The Theme Setting
  theme: any;
  // Shorthand Notations
  // Same as value
  v: any;
  // Same as key
  k: string;
  // Same as index
  i: number;
  t: any;
};

// Must return Style Object
export type FillerFunction = (args: Arguments) => { [key: string]: any };
