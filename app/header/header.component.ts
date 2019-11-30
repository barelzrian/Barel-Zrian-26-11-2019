import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
constructor(private themeService:ThemeService){}

  toggleTheme(){
    this.themeService.toggleTheme()
  
  }
  ngOnInit(){
    this.themeService.toggleTheme()

  }
   
}
