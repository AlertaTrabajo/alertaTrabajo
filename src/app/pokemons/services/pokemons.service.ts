import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { Pokemon, PokemonSpecies } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient)

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) --page;
    page = Math.max(0, page);

    return this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`
    ).pipe(
      map(resp =>
        resp.results.map(pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name
        }))
      ),
      // Cargar descripciones en paralelo
      switchMap(pokemons =>
        forkJoin(
          pokemons.map(pokemon =>
            this.http.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`).pipe(
              map(species => ({
                ...pokemon,
                description: this.extractSpanishDescription(species)
              }))
            )
          )
        )
      )
    );
  }


  public loadPokemon(id:string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
  }

   // Cargar detalle completo (incluyendo descripción)
   public loadPokemonWithDescription(id: string): Observable<{ pokemon: Pokemon, description: string }> {
    // Hacemos 2 peticiones simultáneas: Detalle + Descripción (species)
    return forkJoin({
      pokemon: this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`),
      species: this.http.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    }).pipe(
      map(({ pokemon, species }) => ({
        pokemon,
        description: this.extractSpanishDescription(species)
      }))
    );
  }

  // Obtener la descripción en español o en inglés (por defecto)
  private extractSpanishDescription(species: PokemonSpecies): string {
    const description = species.flavor_text_entries.find(entry => entry.language.name === 'es');
    return description ? description.flavor_text : 'Descripción no disponible';
  }


}
