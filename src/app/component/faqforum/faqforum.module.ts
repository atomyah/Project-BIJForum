import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FaqforumRoutingModule } from './faqforum-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FaqforumComponent } from './faqforum.component';
import { FaqforumEffects } from './store/faqforum.effects';
import * as fromFaqforum from './store/faqforum.reducer';


@NgModule({
  imports: [
    SharedModule,
    FaqforumRoutingModule,
    StoreModule.forFeature('faqforum', fromFaqforum.reducer),
    EffectsModule.forFeature([FaqforumEffects]),
  ],
  declarations: [
    FaqforumComponent,
  ],
})
export class FaqforumModule { }
