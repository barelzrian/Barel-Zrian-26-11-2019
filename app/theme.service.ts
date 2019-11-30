import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

constructor(private overlay: OverlayContainer) { }
toggleTheme(): void {
  if (this.overlay.getContainerElement().classList.contains("dark-theme")) {
    this.overlay.getContainerElement().classList.remove("dark-theme");
    this.overlay.getContainerElement().classList.add("light-theme");
  } else if (this.overlay.getContainerElement().classList.contains("light-theme")) {
    this.overlay.getContainerElement().classList.remove("light-theme");
    this.overlay.getContainerElement().classList.add("dark-theme");
  } else {
    this.overlay.getContainerElement().classList.add("light-theme");
  }
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else if (document.body.classList.contains("light-theme")) {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.add("light-theme");
  }
}
}
