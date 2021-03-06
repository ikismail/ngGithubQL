import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TopNavComponent } from "./components/top-nav/top-nav.component";

// Apollo Client
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { NgHttpLoaderModule } from "ng-http-loader";

import { gitConfig } from "./../environments/environmentDummy";
import { FollowersComponent } from "./components/followers/followers.component";
import { FollowingComponent } from "./components/following/following.component";
import { PinnedRepoComponent } from "./components/pinned-repo/pinned-repo.component";
import { RepoComponent } from "./components/repo/repo.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LeftsideDashboardComponent } from "./components/dashboard/leftside-dashboard/leftside-dashboard.component";
import { StarredRepoComponent } from "./components/starred-repo/starred-repo.component";
import { MainCompoComponent } from "./components/dashboard/main-compo/main-compo.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FollowersComponent,
    FollowingComponent,
    StarredRepoComponent,
    PinnedRepoComponent,
    MainCompoComponent,
    RepoComponent,
    DashboardComponent,
    LeftsideDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    NgHttpLoaderModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "bearer " + gitConfig.token);

    apollo.create({
      link: httpLink.create({
        uri: gitConfig.githubAPI,
        headers: headers
      }),
      cache: new InMemoryCache()
    });
  }
}
