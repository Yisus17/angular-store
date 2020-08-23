import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }

  //El hasUser de firebase nos retorna un observable, lo que hacemos es que nos subscribimos usando un pipe (flujo continuo de datos como los observables)
  //y con map, revisamos si user es null, retornamos true (es usuario puede estar en la ruta de este guard, sino retornamos false para que no pueda entrar)
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.hasUser().pipe(
      map(user => user ===null ? false: true),
      tap(hasUser => {
        if(!hasUser){
          this.router.navigate(['/auth/login']);
        }
      }) //tap permite tener trazabilidad en los flujos de datos
    );
  }

}
