import { recordDatabase } from './index';

describe('Record Database', () => {
  it('should create a new database', () => {
    // This is how you create a new record database
    const record = recordDatabase({
      firstname: (input: string) => {},
      lastname: (input: string) => {},
    });

    // const { firstname, lastname } = record('kushina');
    console.log(record('kushina'));
    record('kushina').firstname('kushina');
    record('kushina').lastname('uzumaki');
  });
});
