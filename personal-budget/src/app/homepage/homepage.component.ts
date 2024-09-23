import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { ChartComponent } from '../chart/chart.component';


interface Dataset{
  data: any[],
  backgroundColor: string[]
}
interface DataSource{
  datasets: Dataset[],
  labels: string[]
}


@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent, BreadcrumbsComponent, ChartComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  private chart: Chart | undefined;
  constructor (private http: HttpClient){}

  public dataSource = {
    datasets: [
        {
            data: [] as number [],
            backgroundColor: [
                '#dc143c',
                '#ff8c00',
                '#ffd700',
                '#32cd32',
                '#4169e1',
                '#ee139e',
                '#ff6347',
                '#191970',
                '#da70d6',
            ],
        }
    ],
    labels: [] as string []
  };




  ngOnInit(): void{
    this.http.get('http://localhost:3000/budget')
    .subscribe((res:any)=>{
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;

    }
    this.createChart();
    })
  }
  createChart() {
     if (this.chart) {
      this.chart.destroy();
    }
    Chart.register(PieController, ArcElement, Tooltip, Legend);
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if(ctx){
      if(this.chart){
        this.chart?.destroy()

      }

    }
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}
