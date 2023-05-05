import { Component, OnInit, OnDestroy } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pets-ai',
  templateUrl: './pets-ai.component.html',
  styleUrls: ['./pets-ai.component.scss'],
})
export class PetsAiComponent implements OnInit, OnDestroy {
  url = 'https://teachablemachine.withgoogle.com/models/a0N_P5ZOA/';
  model;
  predictions;
  webcam;
  maxPredictions;
  labelContainer;
  isShow = true;
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.aiPets();
    /** spinner starts on init */
    this.spinner.show();
    this.toTop();
  }

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async aiPets(): Promise<void> {
    if (!('mediaDevices' in navigator) || !('RTCPeerConnection' in window)) {
      alert('Sorry, your browser does not support WebRTC.');
      return;
    }

    this.isShow = false;

    const modelURL = this.url + 'model.json';
    const metadataURL = this.url + 'metadata.json';

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    const flip = true;
    this.webcam = new tmImage.Webcam(500, 350, flip);
    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();
    requestAnimationFrame(() => this.loop());
    await this.spinner.hide();

    document.getElementById('webcam-container').appendChild(this.webcam.canvas);
    this.labelContainer = document.getElementById('label-container');
    // for (let i = 0; i < this.maxPredictions; i++) {
    //   // and class labels
    //   this.labelContainer.appendChild(document.createElement("div"));
    // }
  }
  // tslint:disable-next-line:typedef
  async loop() {
    this.webcam.update();
    await this.predict();
    requestAnimationFrame(() => this.loop());
  }
  // tslint:disable-next-line:typedef
  async predict() {
    const predictions = await this.model.predictTopK(this.webcam.canvas, 1);
    this.labelContainer.innerText = predictions[0].className;
    // for (let i = 0; i < this.maxPredictions; i++) {
    //   const classPrediction =
    //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //   this.labelContainer.childNodes[i].innerHTML = classPrediction;
    // }
  }
  // tslint:disable-next-line:typedef
  async aiPetsClose() {
    this.isShow = true;
    await this.webcam.stop();
    document.getElementById('webcam-container').removeChild(this.webcam.canvas);
  }
  async ngOnDestroy(): Promise<void> {
    await this.aiPetsClose();
    if (this.isShow === false) {
      this.webcam.stop();
    }
  }
}
