import { Component, enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

@Component({
  selector: "app-main",
  standalone: true,
  imports: [RouterModule],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
class MainComponent {}

bootstrapApplication(MainComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        {
          path: "",
          loadComponent: () =>
            import("./app/app.component").then((mod) => mod.AppComponent),
        },
      ])
    ),
  ],
}).catch((err) => console.error(err));
