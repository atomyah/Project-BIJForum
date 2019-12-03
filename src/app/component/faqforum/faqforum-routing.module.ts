import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqforumComponent } from './faqforum.component';


const routes: Routes = [
  { path: '', component: FaqforumComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FaqforumRoutingModule { }
