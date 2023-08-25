// Creating a new Biopedia
import { database } from '@library/biopedia';

const { firstname, lastname, gender, age, son, husband } = database('kushina uzumaki');

son('naruto uzumaki');
husband('minato uzumaki');
firstname('kushina');
lastname('uzumaki');
gender('female');
age(24);

const { type } = dictionary('house');

type('noun');
type('adverb');
