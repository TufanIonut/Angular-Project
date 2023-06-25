import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  playButtonSound() {
    const audio = new Audio('assets/intro.mp3');
    audio.play();
  }

}
