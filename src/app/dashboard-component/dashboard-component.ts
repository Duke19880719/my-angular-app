import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartData, Chart, Tooltip } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

import { NgxGaugeModule } from 'ngx-gauge';

import { Navigation } from '../navigation/navigation';
// import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.html',
  standalone: true,
  imports: [CommonModule, BaseChartDirective,NgxGaugeModule,Navigation
    // RouterModule
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [ 
       {
        label: '收入',
        data: [35000, 115000, 45000, 35000, 35000, 37000, 35000, 35000, 35000, 35000, 35000, 35000],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: '支出',
        data: [20000, 21000, 22000, 23000, 24000, 25000, 20000, 20000, 28000, 29000, 20000, 31000],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: '儲蓄',
        data: [15000, 94000, 23000, 12000, 11000, 12000, 15000, 15000, 7000, 6000, 15000, 4000],
        fill: false,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
        pointRadius: 5,
      }
    ]
  };

    public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: '金額（元）' },
      },
      x: {
        title: { display: true, text: '月份' },
      },
    },
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `數值：${context.parsed.y}`,
        },
      },
    },
  };

  public lineChartLegend = true;
  public lineChartType: 'line' = 'line';

  //-------------------Pie Chart-----------------------------------
  public PieChartType = 'Pie';
  
  public PieChartData: ChartData<'pie', number[], string> = {
   labels: ['餐飲', '交通', '娛樂', '訂閱', '其他'],
    datasets: [
      {
        data: [5000, 2000, 1500, 800, 700],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label ?? '';
          const value = context.raw as number;
          return `${label}: ${value}`;
        }
      }
    }
  }
  };

  
  constructor() {
    // 在 constructor 註冊 treemap plugin
    Chart.register( Tooltip,TreemapController, TreemapElement);

    // Set default font size for all charts (use a number, not 'vw')
    Chart.defaults.font.size = this.vwToPx(1);
  }

    // 把 vw 轉換成 px
  vwToPx(vw: number): number {
    return (window.innerWidth * vw) / 100;
  }

  //----------------------bar chart----------------------------------
  bar_data:ChartData<'bar'> = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
        label: '預算',
        data: [20000, 18000, 22000, 25000, 23000,20000, 18000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      },
      {
        label: '實際支出',
        data: [21000, 17000, 20000, 27000, 24000,21000, 17000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }
  ]
  };

  baroptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: { y: { beginAtZero: true, title: { display: true, text: '金額（元）' } }, x: { title: { display: true, text: '月份' } } },
    plugins: {
      legend: { display: true, position: 'top' }, 
      tooltip: {
        callbacks: {
          label: (context) => `數值：${context.parsed.y}`,

        },
      },
    },
    
  };  

  //----------------------tree map----------------------------------
  treemapData: any = {
  datasets: [
    {
      tree: [
        { name: '股票', value: 40 },
        { name: '債券', value: 30 },
        { name: '現金', value: 20 },
        { name: '房產', value: 10 }
      ],
      key: 'value',
      groups: ['name'],
      backgroundColor: (ctx: any) => {
        const colors = {
          '股票': 'rgba(54, 162, 235, 0.7)',
          '債券': 'rgba(255, 206, 86, 0.7)',
          '現金': 'rgba(75, 192, 192, 0.7)',
          '房產': 'rgba(255, 99, 132, 0.7)'
        };

      // 安全檢查 ctx.raw
      if (!ctx.raw || !ctx.raw.g) {
        return 'rgba(0,0,0,0.1)'; // fallback 顏色
      }
      const key = ctx.raw.g as keyof typeof colors;

        return colors[key] ?? 'rgba(0,0,0,0.1)'; // fallback 顏色
      },
      labels: {
        display: true,
        formatter: (ctx: any) => {
          return ctx.raw?.g ?? '';
        }
      }
    }
  ]
  };

  treemapOptions: ChartOptions<'treemap'> = {
    plugins: {
      legend: { display: false }
    }
  };


  //----------------------gauge chart----------------------------------
    //目標淨資產 1,000,00，當前已累積 650,00
  target = 100000;
  current = 65000;

  get percentage(): number {
    return Math.round((this.current / this.target) * 100);
  }
}
