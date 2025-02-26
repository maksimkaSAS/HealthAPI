import { CrudDocument } from 'wacom';

export interface Testmodule extends CrudDocument {
	name: string;
	description: string;
}
