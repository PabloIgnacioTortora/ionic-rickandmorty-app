import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  characters = [];
  nextPage: string;
  urlCharacters = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getAllCharacter(url) {
    let pagesCount;
    let nextPage;
    let nextCharacters = [];
    this.http.get<any>(url).subscribe((res) => {
      pagesCount = res.info.pages;
      //  console.log(pages); pages = 34 pages
    });
    for (let i = 0; i != pagesCount; i++) {
      this.http.get<any>(url + '/?page=' + i).subscribe((res) => {
        nextPage = res.results;
        // console.log(nextPage.length)  20 characters
        for (let j = 0; j < nextPage.length; j++) {
          nextCharacters = nextPage[j];
          this.characters.push(nextCharacters);
          console.log(nextCharacters);
        }
      });
    }
  }

  ngOnInit() {
    this.getAllCharacter(this.urlCharacters);
  }
}
