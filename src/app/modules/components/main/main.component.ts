import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = 'https://amigo-secreto.azurewebsites.net';

  public participantes: Array<IParticipante> = [];

  public participanteSelecionadoId: number = 0;
  public amigoSecretoSorteadoId: number = 0;
  public amigoSecretoSorteadoNome: string = '';

  ngOnInit(): void {
    this.obterParticipantes().subscribe({
      next: (res) => {
        this.participantes = res.data;
      },
      error: (err) => err,
    });
  }

  private obterParticipantes(): Observable<IResponse<Array<IParticipante>>> {
    return this.httpClient
      .get<IResponse<Array<IParticipante>>>(this.baseUrl + '/participantes')
      .pipe(
        (res) => {
          return res;
        },
        (err) => err
      );
  }

  public realizarSorteio(): void {
    this.sortear().subscribe({
      next: (res) => {
        this.amigoSecretoSorteadoId = res.data.id;
        this.amigoSecretoSorteadoNome = res.data.nome;
      },
      error: (err) => console.log(err),
      complete: () => {
        this.obterParticipantes().subscribe({
          next: (res) => {
            this.participantes = res.data;
          },
          error: (err) => console.log(err),
        });

        this.participanteSelecionadoId = 0;
      },
    });
  }

  private sortear(): Observable<IResponse<IParticipante>> {
    return this.httpClient
      .post<IResponse<IParticipante>>(
        `${this.baseUrl}/participantes/${this.participanteSelecionadoId}`,
        null
      )
      .pipe(
        (res) => res,
        (err) => err
      );
  }
}

interface IResponse<T> {
  status: boolean;
  data: T;
}

interface IParticipante {
  id: number;
  nome: string;
}
