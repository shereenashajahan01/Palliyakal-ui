import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "impact-item",
  templateUrl: "./impact-item.component.html",
  styleUrls: ["./impact-item.component.scss"],
})
export class ImpactItemComponent implements OnInit {
  @Input() target: number = 0;
  @Input() loss: number = 0;
  @Input() additional: number = 0;
  @Input() max: number = 0;
  total: number = 0;
  targetWidth: number = 0;
  lossWidth: number = 0;
  additionalWidth: number = 0;
  targetCharLength: number = 0;
  targetCharPercent: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.targetWidth = (this.target / this.max) * 50;
    this.lossWidth = Math.abs((this.loss / this.max) * 50);
    this.additionalWidth = (this.additional / this.max) * 50;
    this.total = this.target + this.loss;
    this.targetCharLength = this.target.toString().length * 9.5;
    this.targetCharPercent = this.target.toString().length * 14;
  }
}
