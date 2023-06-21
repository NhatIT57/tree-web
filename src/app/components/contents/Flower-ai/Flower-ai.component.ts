import { Component, OnInit, OnDestroy } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-Flower-ai',
  templateUrl: './Flower-ai.component.html',
  styleUrls: ['./Flower-ai.component.scss'],
})
export class FlowerAiComponent implements OnInit, OnDestroy {
  url = 'https://teachablemachine.withgoogle.com/models/je9QtZdtp/';
  model;
  predictions;
  webcam;
  maxPredictions;
  labelContainer;
  isShow = true;
  flowerName = "";
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.aiFlower();
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

  async aiFlower(): Promise<void> {
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
    // this.labelContainer = document.getElementById('label-container');

  }
  async loop() {
    this.webcam.update();
    await this.predict();
    requestAnimationFrame(() => this.loop());
  }
  // tslint:disable-next-line:typedef
  async predict() {
    const predictions = await this.model.predictTopK(this.webcam.canvas, 1);
    this.flowerName = predictions[0].className;
    // this.labelContainer.innerText = predictions[0].className;
  }
  // tslint:disable-next-line:typedef
  async aiFlowerClose() {
    this.isShow = true;
    await this.webcam.stop();
    document.getElementById('webcam-container').removeChild(this.webcam.canvas);
  }
  async ngOnDestroy(): Promise<void> {
    await this.aiFlowerClose();
    if (this.isShow === false) {
      this.webcam.stop();
    }
  }
}
