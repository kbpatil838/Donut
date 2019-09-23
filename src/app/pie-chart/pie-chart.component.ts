import { Component,ViewEncapsulation, OnInit, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { Fruit } from '../json';
import { Datamodel } from '../data/index.model';


@Component({
  selector: 'app-pie-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {

  @Input()
   data:Datamodel[];

  // [
//     {"fruit": "Apple", "count":10},
//     {"fruit": "Strawberry", "count": 20},
//     {"fruit": "Banana", "count": 15},
//     {"fruit": "Blueberry", "count": 20},
//     {"fruit": "Kiwi", "count": 30},
//     {"fruit": "Plum", "count": 5},
//     {"fruit": "Mango", "count": 25}

// ]
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private radius: number;

  private svg: any;
  private arc: any;
  private pie: any;
  private color: any;
  private labelArc:any;

  private g: any;


  constructor() {
        this.width=800- this.margin.left - this.margin.right;
        this.height=400- this.margin.top - this.margin.bottom;
        this.radius= Math.min(this.width, this.height) /4;
        //const data= this.data;
    }

  ngOnInit() {
    this.initSvg();
    this.drawChart(Fruit);


}


  private initSvg() {

        this.svg = d3.select('svg')
            .attr('width',this.width)
            .attr('height',this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width/6  + ',' + this.height/3 + ')');

       this.color = d3Scale.scaleOrdinal()
            .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

        this.arc = d3Shape.arc()
            .outerRadius(this.radius - 5)
            .innerRadius( this.radius-50);

        this.labelArc = d3Shape.arc()
            .outerRadius(this.radius - 25)
            .innerRadius(this.radius - 35);

        this.pie = d3Shape.pie()
            .sort(null)
            .value((d: any) => d.count);

}

    private drawChart(data:any[]) {
        let g = this.svg.selectAll('.arc')
            .data(this.pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        g.append('path')
            .attr('d', this.arc)
            .style('fill', d => this.color(d.data.fruit))

        g.append('text')
            .attr('transform', d => 'translate(' + this.labelArc.centroid(d) + ')')
            .attr('dy', '.35em')
            .text(d => d.data.fruit);
    }




}
