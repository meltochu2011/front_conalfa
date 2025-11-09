import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  //constructor() { }
  recognition: any;
  isListening = false;
  onresult: (event: any) => void = () => {};

  constructor(private ngZone: NgZone) {
    const { webkitSpeechRecognition }: IWindow = window as any;
    this.recognition = new webkitSpeechRecognition() || new (window as any).SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        if (this.onresult) {
          this.onresult(event);
        }
      });
    };
  }

  startListening() {
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
  }

}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}