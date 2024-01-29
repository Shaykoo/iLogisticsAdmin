import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'master-setup/routes' },
    {
        path: 'login',
        loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'dashboard',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
        path: 'master-setup',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/master-setup/master-setup.module').then((m) => m.MasterSetupModule),
    }    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
