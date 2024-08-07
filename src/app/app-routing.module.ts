import { NgModule } from '@angular/core'
import { RouterModule, Routes, provideRouter, withViewTransitions } from '@angular/router'

const routes: Routes = []

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 64] })],
  exports: [RouterModule],
  providers: [provideRouter(routes, withViewTransitions())],
})
export class AppRoutingModule {}
