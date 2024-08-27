import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PokemonsService } from './pokemons.service';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';
import { catchError } from 'rxjs';

const mockPokemonApiResponse: PokeAPIResponse = {
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": '',
  "results": [
    {
      "name": "Charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "Picachu",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'Charmander'},
  { id: '2', name: 'Picachu'}
];

const mockPokemon = {
  id: '1',
  name: 'bulbasaur'
}

describe('PokemonsService', () => {

  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Finally, we can assert that no other requests were made.
    httpMock.verify();
  })

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {

    service.loadPage(1).subscribe( pokemons => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    expect(req.request.method).toBe('GET');

    req.flush(mockPokemonApiResponse);
  });

  it('should load a page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe( pokemons => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=80&limit=20');

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemonApiResponse);

  });

  it('should load pokemon by ID', () => {
    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should load pokemon by name', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);

  });

  it('should catch error if pokemon not found', () => {
    const pokemonName = 'no-pokemon';

    service.loadPokemon(pokemonName)
    .pipe(
      catchError( err => {
        expect(err.message).toContain('Pokemon not found')
        return [];
      })
    )
    .subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not Found'
    });
  });
});
