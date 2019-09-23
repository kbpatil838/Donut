import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Fruit } from '../json';

@Component({
  selector: 'app-donut',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Kiwi','Mongo','Blueberry'];
  public doughnutChartData: number[] = [50, 45,30];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }
  

  ngOnInit() {
    
    
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
