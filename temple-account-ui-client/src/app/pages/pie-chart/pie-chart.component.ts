import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { FieldDescriptor, GroupBy } from '../../models/temple.model';
import { UtilService } from '../../services/util.service';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
    @Input() pieChartData!: any[];
    @Input() loading = false;  
    @Input() groupByField!: string;

    @Input() financialYear: string = '2024-2025';
    @Input() selectedDateStr: any;

    today = new Date();

    view: any = [700, 600];
    showXaxis = true;
    showYaxis = true;
    showXAxisLabel = true;
    yAxisLabel = 'Number';
    xAxisLabel = 'Number';

    timeline = true;
    explodeSlice= false;
    
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    legendPosition: string = 'below';

    searchResults : any;
    flickerState = 'pre-flick';
    loadingCount = 0;

  selectedDate: FormControl = new FormControl(new Date());

    fieldItem!: FieldDescriptor;
    @Output() chartClicked: EventEmitter<ChartRegionClickedEvent> = new EventEmitter();

    fields: GroupBy[] = [
      {value: 'paymentType', viewValue: 'Payment Type'},
      {value: 'occasionCd', viewValue: 'occasions'},
      {value: 'paymentMode', viewValue: 'Payment Mode'},
      {value: 'financialYear', viewValue: 'Financial Year'},
      {value: 'paymentDate', viewValue: 'Payment Date'},
      {value: 'receivedBy', viewValue: 'Received By'},
      {value: 'member', viewValue: 'Member'}
    ];

    financialYearList = ['--Select--','2024-2025','2023-2024','2022-2023']

  // colorScheme = {
  //   domain: [
  //     '#4d5ee2','#142078','#c2c9ff',
  //     '#90CAF9','#2196F3','#2962FF',
  //     '#00C853','#00E676','#69F0AE',
  //     '#455A64','#607D8B','#B0BEC5']
  // };

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    // domain: [ '#4d5ee2','#142078','#c2c9ff',
    //      '#90CAF9','#2196F3','#2962FF',
    //      '#00C853','#00E676','#69F0AE',
    //      '#455A64','#607D8B','#B0BEC5'],
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private utilService: UtilService,  public datepipe: DatePipe){
    this.onResize();    
  }

  ngOnInit(){

  }

  ngOnChanges(changes: SimpleChanges){

    if(changes['pieChartData']){
      this.loadingCount++;
      this.flickerState = this.flickerState === 'pre-flick' ? 'post-flick' : 'pre-flick';
    }
  }
  
  onResize(): void {
    if(innerWidth < 1279){
      this.view = [(innerWidth) / 1.2, (innerHeight) / 2.2];
    }else{
      this.view = [(innerWidth) / 2.25, (innerHeight) / 2];
    }
  }

  animatedEnd(){
    if(this.loadingCount === 1){      
      this.flickerState = this.flickerState === 'pre-flick' ? 'post-flick' : 'pre-flick';
      this.loadingCount--;
    }
    
  }

  changeValue(newGroup: string): void{
    this.utilService.setQueryParams(newGroup, this.financialYear, this.selectedDateStr);
  }

  changeFinancialValue(financialYear: string): void{
    this.financialYear = financialYear;
    this.utilService.setQueryParams(this.groupByField, financialYear, this.selectedDateStr);
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>){
    this.selectedDateStr = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.utilService.setQueryParams(this.groupByField, this.financialYear, this.selectedDateStr);
}

  onSelect(event: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(pieChartData)));
    let value = event ? event.name ? event.name : event : null;
    if(!value || value.toLowerCase() === 'null' || value.toLowerCase() === 'n/a') value = 'null';
    this.fieldItem.name = this.groupByField; 
    this.fieldItem.displayName = this.groupByField;
    let item = this.fieldItem;
    this.chartClicked.emit({item: item, value: value});
  }

  onActivate(pieChartData: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(pieChartData)));
  }

  onDeactivate(pieChartData: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(pieChartData)));
  }


}
export class ChartRegionClickedEvent {
  item!: FieldDescriptor;
  value!: any;
}
