import { loopFor } from '../../../js/loop/for';
import { ArrayDatabase } from '../class';

export const eachFunction = ($self: ArrayDatabase, callback: (args: { value: any; index: number }) => any) => {
  // Scanning Through the Loop Function
  loopFor($self.length, ({ i }) =>
    // Scanning Through Each Function
    callback({
      value: $self[i],
      index: i,
    }),
  );
};
