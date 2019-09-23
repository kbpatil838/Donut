import { Component,ViewEncapsulation, OnInit,Input } from '@angular/core';
import * as d3 from 'd3';
import { Datamodel } from '../data/index.model';

@Component({
  selector: 'app-donut2',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './donut2.component.html',
  styleUrls: ['./donut2.component.css']
})
export class Donut2Component implements OnInit {

  @Input()
   data:Datamodel[];
  
  private height: number = 500;//{ return parseInt(d3.select('body').style('height'), 10); }
  private width: number =  200//{ return parseInt(d3.select('body').style('width'), 10); }
  radius: number;
  // Arcs & pie
  private arc: any;  private pie: any;  private slices: any;
  private color: any;
  // Drawing containers
  private svg: any;  private mainContainer: any;
  // Data
  dataSource: Datamodel[];
  // any = [
  //     {"fruit": "Orange", "count":10},
  //     {"fruit": "Strawberry", "count": 20},
  //     {"fruit": "Banana", "count": 15},
  //     {"fruit": "Blueberry", "count": 20},
  //     {"fruit": "Kiwi", "count": 30},
  //     {"fruit": "Plum", "count": 45},
  //     {"fruit": "Mango", "count": 25}
  
  // ]
  private tooltip: any;  private total: number;
  private arcLabel: any;
  private texts: any;
  private labelValue: any;  private labelName: any;
  private labelPercent: any;  private labelTotal: any;

  constructor() { 
    this.total = this.dataSource.reduce((sum, it) => sum += it.count, 0);
  }

  ngOnInit() {
    this.svg = d3.select('#pie').select('svg');
    this.setSVGDimensions();
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.mainContainer = this.svg.append('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
    this.pie = d3.pie().sort(null).value((d: any) => d.count);
    this.draw();
    this.initSvg();
    window.addEventListener('resize', this.resize.bind(this));
    this.tooltip = d3.select('#pie') // or d3.select('#bar')
    .append('div').attr('class', 'tooltip').style('display', 'none').style('opacity', 0);
  }
  
  private setSVGDimensions() {
    this.radius = (Math.min(this.width, this.height)) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }
  private draw() {
    this.setArcs();
    this.drawSlices();
    this.drawLabels();
    this.initSvg();
  }
  private setArcs() {
    this.arc = d3.arc().outerRadius(this.radius).innerRadius(this.radius * .65);
    this.arcLabel = d3.arc().innerRadius(this.radius * .85).outerRadius(this.radius * .8);
  }
  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.dataSource))
      .enter().append('g').append('path')
      .attr('d', this.arc);
    // this.slices
    //   .attr('fill', (d, i) => this.color(i))
      // .on('mousemove', function (s) {
      //   const percent = (Math.abs(s.data.fruit / this.total) * 100).toFixed(2) + '%';
      //   this.tooltip .style('top', (d3.event.layerY + 15) + 'px').style('left', (d3.event.layerX) + 'px')
      //     .style('display', 'block').style('opacity', 1).style('height', '40px')
      //     this.tooltip.html(`name: ${s.data.fruit}<br>value: ${s.data.count}`);
      // }.bind(this))
      // .on('mouseout', function () {
      //   this.tooltip.style('display', 'none').style('opacity', 0);
      // }.bind(this));
    this.slices
    .attr('fill', (d, i) => this.color(i))
    .on('mouseover', function (s) {
      this.computeLabels(true, s.data);
    }.bind(this))
    .on('mouseout', function () {
      this.computeLabels(false);
    }.bind(this));
  }
  private drawLabels() {
    this.texts = this.mainContainer.selectAll('text')
      .remove().exit()
      .data(this.pie(this.dataSource))
      .enter().append('text')
      .attr('text-anchor', 'middle').attr('transform', d => `translate(${this.arcLabel.centroid(d)})`).attr('dy', '0.35em');
    this.texts.append('tspan').filter(d => (d.endAngle - d.startAngle) > 0.05)
      .attr('x', 0).attr('y', 0).style('font-size', '0.5em')
      .text(d => d.data.fruit);
    // this.texts.append('tspan').filter(d => (d.endAngle - d.startAngle) > 0.25)
    //   .attr('x', 0).attr('y', '1.3em').attr('fill-opacity', 0.7)
    //   .text(d => d.data.count);
  }
  private resize() {
    this.setSVGDimensions();
    this.setArcs();
    this.repaint();
    this.drawLabels();
    this.initSvg();
  }

  private repaint() {
    this.drawSlices();
    this.drawLabels();
    this.initSvg();
  }
  private initSvg() {
    // ...
    // this.labelTotal = this.mainContainer.append('text')
    //   .attr('text-anchor', 'middle').style('font-size', '6em')
    //   .attr('dy', '.5em').text(this.total);
    this.labelName = this.mainContainer.append('text')
      .attr('text-anchor', 'middle').attr('dy', '.4em').attr('dx', '-1em')
      .style('font-size', '1em').style('opacity', 0);
    this.labelValue = this.mainContainer.append('text')
      .attr('text-anchor', 'middle').style('font-size', '1em')
      .attr('dx', '2em').attr('dy', '.4em').style('opacity', 0);
    //this.labelPercent = this.mainContainer.append('text')
      //.attr('text-anchor', 'middle').attr('dy', '1.7em').style('opacity', 0);
  }
  private computeLabels(visible: boolean, data?: any) {
    if (visible) {
      const percent = (Math.abs(data.fruit / this.total) * 100).toFixed(2) + '%';
      this.labelName.text(data.fruit).style('opacity', 1);
      this.labelValue.text(data.count).style('opacity', 1);
      this.labelPercent.text(percent).style('opacity', 1);
      //this.labelTotal.style('opacity', 0);
    } else {
       [this.labelName, this.labelValue, this.labelPercent].forEach(l => l.style('opacity', 0));
      //this.labelTotal.style('opacity', 1);
    }
  
}
}