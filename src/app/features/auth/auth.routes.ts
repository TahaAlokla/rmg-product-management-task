import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { Logout } from "./pages/logout/logout";

export const AUTH_ROUTES: Routes = [
 { path: '', component: Login },
 { path: 'logout', component: Logout },
];

// export default [
//  {
//   path: '',
//   component: Dashboard,

//  },
// ] as Routes;
