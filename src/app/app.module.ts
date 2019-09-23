import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DonutComponent } from './donut/donut.component';
import { Donut2Component } from './donut2/donut2.component';

const routes: Routes = [
  {path:'' , component : AppComponent} ,
  {path:'D2' , component : Donut2Component} ,
];

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    DonutComponent,
    Donut2Component,
    
   
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
