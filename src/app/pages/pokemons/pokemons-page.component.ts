import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

import { map, tap } from 'rxjs';

import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';


@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {

  private pokemonsService = inject(PokemonsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router)
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.activatedRoute.params.pipe(
      map( params => params['page'] ?? '1'),
      map( page => (isNaN(+page)? 1: +page)),
      map( page => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true,
  })

  public loadPokemons( page = 0 ) {
    this.pokemonsService
    .loadPage( page )
    .pipe(tap( () => this.title.setTitle(`Pokemons SSR - Page ${page}`)))
    .subscribe( pokemons => {
      this.pokemons.set(pokemons);
    });

  }
}
