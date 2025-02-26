import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TestpageComponent } from './testpage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TestpageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TestpageComponent]
})
export class TestpageModule {}
