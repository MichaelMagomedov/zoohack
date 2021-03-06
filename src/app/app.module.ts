import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {NotifierModule} from 'angular-notifier';
import {CookieService} from 'ngx-cookie-service';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';

// BOOTSTRAP COMPONENTS

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ChartsModule} from 'ng2-charts';

// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import {HeaderComponent} from './Layout/Components/header/header.component';
import {SearchBoxComponent} from './Layout/Components/header/elements/search-box/search-box.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';

// SIDEBAR

import {SidebarComponent} from './Layout/Components/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import {FooterComponent} from './Layout/Components/footer/footer.component';

import {InfoCardsComponent} from './MainPages/infoCards/info-cards.component';
import {InfoCardComponent} from './MainPages/infoCard/info-card.component';
import {LoginBoxedComponent} from './MainPages/login/login-boxed.component';
import {SettingComponent} from './MainPages/setting/setting.component';
import {RequestProcessInterceptor} from './Utils/Interceptors/RequestProcessInterceptor';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [

        // LAYOUT

        AppComponent,
        BaseLayoutComponent,
        PagesLayoutComponent,
        PageTitleComponent,

        // HEADER

        HeaderComponent,
        SearchBoxComponent,
        UserBoxComponent,

        // SIDEBAR

        SidebarComponent,
        LogoComponent,

        // FOOTER

        FooterComponent,

        InfoCardsComponent,
        InfoCardComponent,
        LoginBoxedComponent,
        SettingComponent
    ],
    imports: [
        GoogleMapsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgReduxModule,
        CommonModule,
        LoadingBarRouterModule,
        NotifierModule.withConfig({
                position: {
                    horizontal: {
                        position: 'right',
                    },
                    vertical: {
                        position: 'top',
                    }
                }
            }
        ),
        // Angular Bootstrap Components

        PerfectScrollbarModule,
        NgbModule,
        AngularFontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        // Charts

        ChartsModule,
        FileUploadModule,
    ],
    providers: [
        {
            provide:
            PERFECT_SCROLLBAR_CONFIG,
            // DROPZONE_CONFIG,
            useValue:
            DEFAULT_PERFECT_SCROLLBAR_CONFIG,
            // DEFAULT_DROPZONE_CONFIG,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestProcessInterceptor,
            multi: true
        },
        CookieService,
        FileSelectDirective,
        ConfigActions,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private ngRedux: NgRedux<ArchitectUIState>,
                private devTool: DevToolsExtension) {

        this.ngRedux.configureStore(
            rootReducer,
            {} as ArchitectUIState,
            [],
            [devTool.isEnabled() ? devTool.enhancer() : f => f]
        );

    }
}
