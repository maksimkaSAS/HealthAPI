import { Injectable } from '@angular/core';
import { Testmodule } from '../interfaces/testmodule.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class TestmoduleService extends CrudService<Testmodule> {
	constructor() {
		super({
			name: 'testmodule',
		});
	}
}
