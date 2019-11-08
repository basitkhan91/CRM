import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import {
  WorkOrderLabor,
  AllTasks
} from '../../../../models/work-order-labor.modal';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { getObjectByValue, getValueFromObjectByKey } from '../../../../generic/autocomplete';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-work-order-labor',
  templateUrl: './work-order-labor.component.html',
  styleUrls: ['./work-order-labor.component.css']
})
/** WorkOrderMainComponent component*/
export class WorkOrderLaborComponent implements OnInit {
  @Input() savedWorkOrderData;
  @Input() laborForm: WorkOrderLabor;
  @Output() saveworkOrderLabor = new EventEmitter();

  workOrderWorkFlowOriginalData: any;
  workOrderWorkFlowList: any;
  employeesOriginalData: any;
  employeeList: any;
  dataEnteredByList: any;
  expertiseTypeList: Object;
  id: any;
  saveFormdata: any;
  billableList = [
    {label: 'Billable', value: 1},
    {label: 'Non-Billable', value: 2}
]

  constructor(private workOrderService: WorkOrderService,
    private authService: AuthService,
     private commonService : CommonService){}

  // expertiseDropdownMenu = [
  //   { label: 'Technician', value: 'Technician' },
  //   { label: 'Quality', value: 'Quality' },
  //   { label: 'Mechanic', value: 'Mechanic' },
  //   { label: 'Inspector', value: 'Inspector' },
  //   { label: 'Receiver', value: 'Receiver' },
  //   { label: 'Auditor', value: 'Auditor' },
  //   { label: 'Engineer', value: 'Engineer' }
  // ];
  ngOnInit() {

    this.getWorkOrderWorkFlowNos();
    this.getAllEmployees();
    this.getAllExpertiseType();
    this.id = this.savedWorkOrderData.workOrderId;
  }


  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }


  getWorkOrderWorkFlowNos(){
    this.workOrderService.getWorkOrderWorkFlowNumbers().subscribe(res => {
      this.workOrderWorkFlowOriginalData = res;
    })
  }

  
  
  filterWorkFlowNumbers(event): void {

    this.workOrderWorkFlowList = this.workOrderWorkFlowOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const workFlowNos = [...this.workOrderWorkFlowOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.workOrderWorkFlowList = workFlowNos;
    }
  }

  getAllEmployees(): void {
    this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').subscribe(res => {
      this.employeesOriginalData = res;
    })
  }

  filterDataEnteredBy(event): void {

    this.dataEnteredByList = this.employeesOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const dataEnteredBy = [...this.employeesOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.dataEnteredByList = dataEnteredBy;
    }
  }


  filterEmployee(event): void {

    this.employeeList = this.employeesOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const employee = [...this.employeesOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.employeeList = employee;
    }
  }

  getAllExpertiseType(){
    this.commonService.smartDropDownList('ExpertiseType' , 'ExpertiseTypeId',  'Description').subscribe(res => {
      this.expertiseTypeList = res;
    })
  }

  addNewTask(taskName) {
    this.laborForm.workOrderLaborList[0][taskName].push(new AllTasks());
  }
  startandStop(obj) {
    if (obj.startDate === null) {
      obj.startDate = new Date();
    } else if (obj.endDate === null) {
      obj.endDate = new Date();
    }
  }
  isEditTime(data, field){
    console.log(data, field)
    if(field === 'endDateandTimeIsEdit'){
      data[field] = data[field] === true ?  false : true;
    }else if(field === 'startDateandTimeIsEdit'){
      data[field] =  data[field] === true ?  false : true;
    }

  }

  // moment(new Date()).format('DD/MM/YYYY, h:mm:ss a');
  saveLabor() {
    console.log(this.laborForm);
    const excessParams = {
      createdBy : this.userName,
      updatedBy : this.userName,
      createdate : new Date(),
      updatdate : new Date() ,
      isActive : true,
      IsDeleted : false,
  }
    let hoursorClockorScan;
  if( this.laborForm.hoursorClockorScan === 'labourHours'){
    hoursorClockorScan = 1;
  } else if(this.laborForm.hoursorClockorScan === 'labourClock'){
    hoursorClockorScan =2;
  }else if(this.laborForm.hoursorClockorScan === 'scan'){
    hoursorClockorScan = 3;
  }

    let tasksData = this.laborForm.workOrderLaborList[0];
    this.saveFormdata = {...this.laborForm , 
      hoursorClockorScan : hoursorClockorScan,
      dataEnteredBy :  getValueFromObjectByKey('value', this.laborForm.dataEnteredBy ) ,
      employeeId: getValueFromObjectByKey('value', this.laborForm.employeeId ), 
      masterCompanyId: 1,
      ...excessParams,
    workOrderId : this.id,
    workOrderLaborList: 
    {
     receive :  tasksData['receive'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 1,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    inspect :  tasksData['inspect'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 2,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    evaluate :  tasksData['evaluate'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 3, 
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    tearDown :  tasksData['tearDown'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 4,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    disassemble :  tasksData['disassemble'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 5,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    assemble :  tasksData['assemble'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 6,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    testing :  tasksData['testing'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 7,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    qualityControl :  tasksData['qualityControl'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 8,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    ship :  tasksData['ship'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 9,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    }),
    clean :  tasksData['clean'].map(x => {
      return {
        ...x,
        ...excessParams,
        taskId: 10,
        employeeId: getValueFromObjectByKey('value', x.employeeId ) 
      }
    })
    }
    
  
  }


    // const labFormData =  this.laborForm

    // const keysArray: any = Object.keys(this.laborForm.tasks[0]);
    // console.log(keysArray);
    // for (let i = 0; i < keysArray.length; i++) {
    //   let currentKey = keysArray[i];
    //   console.log(currentKey)
    //   this.saveFormdata  = {
    //     ...this.laborForm,
    //     tasks : [  { 
    //       [currentKey] : this.laborForm.tasks[0][currentKey].map(x => {
    //        return{
    //          ...x,
    //          name:  keysArray[i],
    //          employeeId: getValueFromObjectByKey('value', x.employeeId )
    //        }
    //       }),
    //     workOrderId : this.id }]
    //   };
    // }


    
    this.saveworkOrderLabor.emit(this.saveFormdata);
    
  }
      // tasks : this.laborForm.tasks[0][keysArray[i]].map(x => {
      //   return {
      //     ...x,
      //     employeeId: getValueFromObjectByKey('value', x.employeeId )
      //   }
      // }),
}
