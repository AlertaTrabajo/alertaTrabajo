import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'pokemons-page',
    imports: [
        PokemonListComponent,
        PokemonListSkeletonComponent,
    ],
    templateUrl: './pokemons-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit {

  private pokemonsService: PokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  );


  ngOnInit(): void {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService.loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${ pageToLoad } `) )
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });

  }

}
