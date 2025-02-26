import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TestmoduleComponent } from './testmodule.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TestmoduleComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TestmoduleComponent],
	providers: []
})
export class TestmoduleModule {}
