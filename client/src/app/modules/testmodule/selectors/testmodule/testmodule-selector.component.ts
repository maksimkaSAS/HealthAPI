import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TestmoduleService } from '../../services/testmodule.service';
import { Testmodule } from '../../interfaces/testmodule.interface';

@Component({
	selector: 'testmodule-selector',
	templateUrl: './testmodule-selector.component.html',
	styleUrls: ['./testmodule-selector.component.scss'],
	imports: [SelectModule],
})
export class TestmoduleSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Testmodule[] {
		return this._testmoduleService.testmodules;
	}

	constructor(private _testmoduleService: TestmoduleService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
