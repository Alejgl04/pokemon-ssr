import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [
  ],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  private pokemonService = inject(PokemonsService);
  private activatedRoute = inject(ActivatedRoute);
  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const idPokemon = this.activatedRoute.snapshot.paramMap.get('id');
    if ( !idPokemon ) return;

    this.pokemonService.loadPokemon(idPokemon)
    .pipe(
      tap( ({ name, id }) => {

        const pageTitle = `#${ id } - ${ name }`;
        const pageDescription = `Page of Pokemon ${name}`;

        this.title.setTitle( pageTitle );

        this.meta.updateTag({ name: 'description', content: `Page of Pokemon ${name}` })
        this.meta.updateTag({ name: 'og:title', content: pageTitle })
        this.meta.updateTag({ name: 'og:description', content: pageDescription })
        this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` })
      })
    )
    .subscribe(this.pokemon.set);
  }
}
