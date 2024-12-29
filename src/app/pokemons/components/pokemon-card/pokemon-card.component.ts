import { Component, computed, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {

  public pokemon = input.required<SimplePokemon>();

  // logEffect = effect(()=>{
  //   console.log('PokemonCard:', this.pokemon());
  // })

  public readonly pokemonImage = computed(
    () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  );

}
