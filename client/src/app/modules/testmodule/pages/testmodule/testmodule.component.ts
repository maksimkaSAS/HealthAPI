import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TestmoduleService } from '../../services/testmodule.service';
import { Testmodule } from '../../interfaces/testmodule.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { testmoduleFormComponents } from '../../formcomponents/testmodule.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './testmodule.component.html',
	styleUrls: ['./testmodule.component.scss'],
	standalone: false,
})
export class TestmoduleComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('testmodule', testmoduleFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._testmoduleService.setPerPage.bind(this._testmoduleService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Testmodule>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Testmodule);

					await firstValueFrom(
						this._testmoduleService.create(created as Testmodule)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Testmodule): void => {
			this._form
				.modal<Testmodule>(this.form, [], doc)
				.then((updated: Testmodule) => {
					this._core.copy(updated, doc);

					this._testmoduleService.update(doc);
				});
		},
		delete: (doc: Testmodule): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this testmodule?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._testmoduleService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Testmodule): void => {
					this._form.modalUnique<Testmodule>('testmodule', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Testmodule[] = [];

	constructor(
		private _translate: TranslateService,
		private _testmoduleService: TestmoduleService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._testmoduleService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Testmodule>(create ? [] : this.rows)
				.then(async (testmodules: Testmodule[]) => {
					if (create) {
						for (const testmodule of testmodules) {
							this._preCreate(testmodule);

							await firstValueFrom(
								this._testmoduleService.create(testmodule)
							);
						}
					} else {
						for (const testmodule of this.rows) {
							if (
								!testmodules.find(
									(localTestmodule) => localTestmodule._id === testmodule._id
								)
							) {
								await firstValueFrom(
									this._testmoduleService.delete(testmodule)
								);
							}
						}

						for (const testmodule of testmodules) {
							const localTestmodule = this.rows.find(
								(localTestmodule) => localTestmodule._id === testmodule._id
							);

							if (localTestmodule) {
								this._core.copy(testmodule, localTestmodule);

								await firstValueFrom(
									this._testmoduleService.update(localTestmodule)
								);
							} else {
								this._preCreate(testmodule);

								await firstValueFrom(
									this._testmoduleService.create(testmodule)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(testmodule: Testmodule): void {
		delete testmodule.__created;
	}
}
