
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'Charmander'
  },
  {
    id: '2',
    name: 'Picachu'
  }
]

describe('PokemonListComponent', () => {

  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ provideRouter([]) ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', [])
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render pokemon list with two pokemon cards', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect( compiled.querySelectorAll('pokemon-card').length ).toBe(2);
  });
});
