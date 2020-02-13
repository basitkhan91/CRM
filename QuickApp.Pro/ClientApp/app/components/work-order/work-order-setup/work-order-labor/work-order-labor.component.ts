import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class WorkOrderLaborComponent implements OnInit, OnChanges {
  @Input() savedWorkOrderData;
  @Input() laborForm: WorkOrderLabor;
  @Input() workOrderWorkFlowOriginalData: any;
  @Output() saveworkOrderLabor = new EventEmitter();
  @Input() workOrderLaborList: any;
  @Input() taskList: any;
  @Input() isQuote = false;
  @Input() markupList;
  @Input() isView: boolean = false;
  @Input() isEdit: boolean = false;

    totalHours: number;
  workOrderWorkFlowList: any;
  employeesOriginalData: any;
  employeeList: any;
  dataEnteredByList: any;
  expertiseTypeList: Object;
  id: any;
  saveFormdata: any;
  totalWorkHours: any;
  minDateValue: Date = new Date()
  billableList = [
    { label: 'Billable', value: 1 },
    { label: 'Non-Billable', value: 2 }
    ];
  overAllMarkup: any;


  constructor(private workOrderService: WorkOrderService,
    private authService: AuthService,
      private commonService: CommonService) { }
    

  ngOnInit() {

    
    this.workOrderWorkFlowList = this.workOrderWorkFlowOriginalData;
    this.laborForm['costPlusType'] = 'Mark Up';
console.log(this.workOrderLaborList);
    if(this.workOrderLaborList){
      this.laborForm.workFlowWorkOrderId = this.workOrderLaborList['workFlowWorkOrderId'];
      this.laborForm.dataEnteredBy = this.workOrderLaborList['dataEnteredBy'];
      this.laborForm.employeeId = this.workOrderLaborList['employeeId'];
      this.laborForm.isTaskCompletedByOne = this.workOrderLaborList['isTaskCompletedByOne'];
      this.laborForm.expertiseId = this.workOrderLaborList['expertiseId'];
    }
    this.getAllEmployees();
    this.getAllExpertiseType();
    this.id = this.savedWorkOrderData.workOrderId;
    if(this.isView || this.isEdit){
      for(let task of this.taskList){
        this.calculateTaskHours(task);
      }
    }
    if(this.laborForm['costPlusType']){
      this.laborForm['costPlusType'] = this.laborForm['markupFixedPrice'];
    }
  }

  ngOnChanges(){
    this.getAllEmployees();
    this.laborForm['costPlusType'] = 'Mark Up'
    this.workOrderWorkFlowList = this.workOrderWorkFlowOriginalData;
    if(this.laborForm['workOrderHoursType']){
      if(this.laborForm['workOrderHoursType'] == 1){
        this.laborForm.workFloworSpecificTaskorWorkOrder = 'workFlow';
      }
      else if(this.laborForm['workOrderHoursType'] == 2){
        this.laborForm.workFloworSpecificTaskorWorkOrder = 'specificTasks';
      }
      else {
        this.laborForm.workFloworSpecificTaskorWorkOrder = "workOrder";
      }
    }
    this.calculateTotalWorkHours();
    if(this.workOrderLaborList){
      this.laborForm.workFlowWorkOrderId = this.workOrderLaborList['workFlowWorkOrderId'];
      this.laborForm.dataEnteredBy = this.workOrderLaborList['dataEnteredBy'];
      this.laborForm.employeeId = this.workOrderLaborList['employeeId'];
      this.laborForm.isTaskCompletedByOne = this.workOrderLaborList['isTaskCompletedByOne'];
        this.laborForm.expertiseId = this.workOrderLaborList['expertiseId'];
    }
    if(this.isView || this.isEdit){
      for(let task of this.taskList){
        this.calculateTaskHours(task);
      }
    }
    if(this.laborForm['costPlusType']){
      this.laborForm['costPlusType'] = this.laborForm['markupFixedPrice'];
    }
  }


  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }

  generateLaborForm() {
    const keysArray = Object.keys(this.laborForm.workOrderLaborList[0]);
    for (let i = 0; i < keysArray.length; i++) {
      this.laborForm = {
        ...this.laborForm,
        workOrderLaborList: [{ ...this.laborForm.workOrderLaborList[0], [keysArray[i]]: [new AllTasks()] }]
      };
    }
    console.log(this.laborForm);
  }

  calculateHoursDifference(obj){
    if(obj.hours != null && obj.adjustments != null){
      this.totalWorkHours = 0;

      // let hoursArr = obj.hours.split(':');
      // if(hoursArr.length == 1){ hoursArr.push(0)}
      // let hoursInSeconds = (+hoursArr[0]) * 60 * 60 + (+hoursArr[1]) * 60;
      // let adjustmentsHoursArr = obj.adjustments.split(':');
      // if(adjustmentsHoursArr.length == 1){ adjustmentsHoursArr.push(0)}
      // let adjustmentsInSec = (+obj.adjustments) * 60 * 60 + (+hoursArr[1]) * 60;
      // let diff = hoursInSeconds - adjustmentsInSec;
      // let h = Math.floor(diff / 3600).toString();
      // let m = Math.floor(diff % 3600 / 60).toString();
      // let s = Math.floor(diff % 3600 % 60).toString();
      // obj['adjustedHours'] = `${(h.length ==1)?'0'+h:h}.${(m.length ==1)?'0'+m:m}`;
      obj['adjustedHours'] = Number(obj.hours) + Number(obj.adjustments)
      var totalHours = 0;
      // h = Math.floor(totalSec / 3600).toString();
      // m = Math.floor(totalSec % 3600 / 60).toString();
      // s = Math.floor(totalSec % 3600 % 60).toString();
      // this.totalWorkHours = `${(h.length ==1)?'0'+h:h}:${(m.length ==1)?'0'+m:m}:${(s.length ==1)?'0'+s:s}`;
      // this.totalWorkHours = totalHours;
    }
    this.calculateTotalWorkHours();
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
      this.employeeList = res;
      if(this.laborForm.dataEnteredBy != null){
        this.employeeList.forEach(emp=>{
          if(this.laborForm.dataEnteredBy == emp.value){
            this.laborForm.dataEnteredBy = emp;
          }
          if(this.laborForm.employeeId == emp.value){
            this.laborForm.employeeId = emp;
          }
        })
      }
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

  getAllExpertiseType() {
    this.commonService.smartDropDownList('ExpertiseType', 'ExpertiseTypeId', 'Description').subscribe(res => {
      this.expertiseTypeList = res;
    })
  }

  addNewTask(taskName) {
    let taskData = new AllTasks();
    taskData.expertiseId = Number(this.laborForm.expertiseId);
    taskData.employeeId = this.laborForm.employeeId;
    this.laborForm.workOrderLaborList[0][taskName].push(taskData);
    }

  startandStop(currentRecord) {
    if (currentRecord.startDate === null) {
      currentRecord.startDate = new Date();
    } else if (currentRecord.endDate === null) {
      currentRecord.endDate = currentRecord.startDate;
    }
    this.calculateWorkingHoursandMins(currentRecord)
  }

  resetEndDateandTime(currentRecord) {
    currentRecord.endDate = null;
  }

  calculateWorkingHoursandMins(currentRecord) {
    console.log(currentRecord)
    if (currentRecord.startDate && currentRecord.endDate) {
      const start = moment(currentRecord.startDate)
      const end = moment(currentRecord.endDate)
      // currentRecord.hours = start.diff(end);
      const ms = moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
      console.log(ms);
      const days = moment.duration(ms)
      console.log(days);
      currentRecord.hours = Math.floor(days.asHours()) + moment.utc(ms).format(".mm")
      // currentRecord.hours = moment(moment(startTime, "hh:mm").diff(moment(endTime, "hh:mm"))).format("hh:mm");
    }

  }

  isEditTime(currentRecord, field) {
    if (field === 'endDateandTimeIsEdit') {
      currentRecord[field] = currentRecord[field] === true ? false : true;
    } else if (field === 'startDateandTimeIsEdit') {
      currentRecord[field] = currentRecord[field] === true ? false : true;
    }

  }

  // moment(new Date()).format('DD/MM/YYYY, h:mm:ss a');
    saveLabor() {
        var wolHeaderId = 0;
        if (this.workOrderLaborList !== undefined && this.workOrderLaborList !== null) {

            wolHeaderId = this.workOrderLaborList.workOrderLaborHeaderId;
        }
      console.log(this.laborForm);
    const excessParams = {
      createdBy: this.userName,
      updatedBy: this.userName,
      createdate: new Date(),
      updatdate: new Date(),
      isActive: true,
      IsDeleted: false,
    }

        let tasksData = this.laborForm.workOrderLaborList[0];
        console.log(tasksData);
    let formedData = {}
        for (let tdata in tasksData) {
            console.log('Suresh');
            console.log(tdata);
            if (tdata != 'length') {
                formedData[tdata] = tasksData[tdata].map(x => {
                    console.log(x);
                    return {
                        ...x,
                        ...excessParams,
                        taskId: this.getTaksId(tdata),
                        employeeId: getValueFromObjectByKey('value', x.employeeId)
                    }
                })
            }
    }
    this.saveFormdata = {
      ...this.laborForm,
      hoursorClockorScan: this.laborForm.hoursorClockorScan,
      dataEnteredBy: getValueFromObjectByKey('value', this.laborForm.dataEnteredBy),
      employeeId: getValueFromObjectByKey('value', this.laborForm.employeeId),
      masterCompanyId: 1,
      ...excessParams,
      workOrderId: this.id,
        workFlowWorkOrderId: getValueFromObjectByKey('value', this.laborForm.workFlowWorkOrderId),
        workOrderLaborHeaderId: wolHeaderId,
        workOrderLaborList: formedData,
        totalWorkHours:this.laborForm.totalWorkHours
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
    if(this.laborForm.workFloworSpecificTaskorWorkOrder == 'workFlow'){
      this.saveFormdata['workOrderHoursType'] = 1;
    }
    else if(this.laborForm.workFloworSpecificTaskorWorkOrder == 'specificTasks'){
      this.saveFormdata['workOrderHoursType'] = 2;
    }
    else {
      this.saveFormdata['workOrderHoursType'] = 3;
    }
    if(this.isQuote){
      this.saveFormdata.markupFixedPrice = this.laborForm['costPlusType'];
      // for(let labor in this.saveFormdata.workOrderLaborList){
      //   this.saveFormdata.workOrderLaborList[labor].forEach(
      //     (lab)=>{
      //       lab['markupFixedPrice'] = this.laborForm['costPlusType'];
      //     }
      //   )
      // }
    }

    this.saveworkOrderLabor.emit(this.saveFormdata);  

  }

  getExpertise(expertiseType, taskId){

    // try{
    //   if(this.workOrderLaborList){
    //     for(let workOrdLList of this.workOrderLaborList){
    //       if ()
    //     }
    //   }
    // }
    // catch{
      try{
        if(this.workOrderLaborList){
          for(let workOrdLList of this.workOrderLaborList['laborList']){
            if (workOrdLList['taskId'] == taskId && workOrdLList['expertiseId'] == expertiseType['value']){
              return true;
            }
          }
          return false
        }
        return true;
      }
      catch{
        return true;
      }
    // }
    // console.log(expertiseTypeList)
    // console.log(taskId);
    // console.log(this.workOrderLaborList);
    // return expertiseTypeList;
  }

  getTaksId(taskName){
    for(let t of this.taskList){
        if (t['description'].toLowerCase() == taskName.toLowerCase()) {
        return t['taskId']
      }
    }
  }

  isAllowedTask(taskId){
    try{
      if(this.workOrderLaborList){
        for(let workOrdLList of this.workOrderLaborList['laborList']){
          if (workOrdLList['taskId'] == taskId){
            return true;
          }
        }
        return false
      }
      return true;
    }
    catch{
      return true;
    }
  }

  checkDisability(record, taskId){
    try{
      if(this.workOrderLaborList){
        if(this.laborForm['workFloworSpecificTaskorWorkOrder'] == 'workOrder'){
          return true;
        }
        else if (this.laborForm['workFloworSpecificTaskorWorkOrder'] == 'workFlow'){
          for(let workOrdLList of this.workOrderLaborList['laborList']){
            if (workOrdLList['taskId'] == taskId && workOrdLList['expertiseId'] == record['expertiseId']){
              record['hours'] = workOrdLList['hours'];
              this.calculateHoursDifference(record);
            }
          }
          return true;
        }
      }
      return false;
    }
    catch{
      return false;
    }
    
  }

  deleteLabor(taskName, index){
    this.laborForm.workOrderLaborList[0][taskName.toLowerCase()][index].isDeleted = true;
  }

  calculateTotalCost(rec){
    if(rec['directLaborOHCost'] && rec['burdenRateAmount']){
      rec.totalCostPerHour = Number(rec['directLaborOHCost'])+Number(rec['burdenRateAmount']);
      if(rec.hours){
        rec['totalCost'] = Number(rec.totalCostPerHour) * Number(rec.hours);
      }
    }
  }

  tmchange(){
    for(let t in this.laborForm.workOrderLaborList[0]){
      for(let mData of this.laborForm.workOrderLaborList[0][t]){
        mData.billingMethodId = Number(this.laborForm['costPlusType']);
      }
    }
  }

  markupChanged(matData, type) {
      try {
        if(this.markupList){
          this.markupList.forEach((markup)=>{
            if(type == 'row' && markup.value == matData.markupPercentageId){
              matData['billingRate'] = (matData['totalCostPerHour']) + (((matData['totalCostPerHour']) / 100) * Number(markup.label))
              matData['billingAmount'] = Number(matData['billingRate']) * Number(matData.hours);
            }
            else if(type == 'all' && markup.value == this.overAllMarkup){
              for(let t in this.laborForm.workOrderLaborList[0]){
                for(let mData of this.laborForm.workOrderLaborList[0][t]){
                  if(mData['billingMethodId'] == 1){
                    mData.markupPercentageId = this.overAllMarkup;
                    mData['billingRate'] = (mData['totalCostPerHour']) + (((mData['totalCostPerHour']) / 100) * Number(markup.label))
                    mData['billingAmount'] = Number(mData['billingRate']) * Number(mData.hours);
                  }
                }
              }
              // this.materialListQuotation.forEach((mData)=>{
              //   mData.markupPercentageId = this.overAllMarkup;
              //   mData.materialCostPlus = Number(mData.extendedCost) + ((Number(mData.extendedCost) / 100) * Number(markup.label))
              // })
            }
          })
        }

          // this.markupList.forEach((markup) => {
          // if (markup.value == matData.markupPercentageId) {
          //     matData.labourCostPlus = (matData.directLaborOHCost) + (((matData.directLaborOHCost) / 100) * Number(markup.label))
          // }
          // })
      }
      catch (e) {
          console.log(e);
      }
  }

  calculateTotalWorkHours(){
    this.laborForm.totalWorkHours = 0;
    if(this.laborForm.workOrderLaborList){
      for(let task in this.laborForm.workOrderLaborList[0]){
        if(this.laborForm.workOrderLaborList[0][task][0] && this.laborForm.workOrderLaborList[0][task][0]['hours'] != null){
          for (let taskList of this.laborForm.workOrderLaborList[0][task] ){
            // hoursArr = taskList['hours'].split(":");
            // if(hoursArr.length == 1){ hoursArr.push(0)}
            // hoursInSeconds = (+hoursArr[0]) * 60 * 60 + (+hoursArr[1]) * 60;
              this.laborForm.totalWorkHours += taskList['hours'];
              
          }
        }
      }
    }
  }

  getTotalCostPlusAmount(){
    let total = 0;
    this.laborForm.workOrderLaborList.forEach(
      (material)=>{
        if(material.labourCostPlus){
          total += material.labourCostPlus;
        }
      }
    )
    return total;
  }

  getTotalFixedAmount(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.fixedAmount){
        total += labor.fixedAmount;
      }
    }
    return total;
  }

  getTotalLaborOHCost(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.directLaborOHCost){
        total += labor.directLaborOHCost;
      }
    }
    return total;
  }

  getTotalLaborBurdenRate(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.burdenRateAmount){
        total += labor.burdenRateAmount;
      }
    }
    return total;
  }

  getTotalCostPerHour(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.totalCostPerHour){
        total += labor.totalCostPerHour;
      }
    }
    return total;
  }

  getTotalCost(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.totalCost){
        total += labor.totalCost;
      }
    }
    return total;
  }

  getTotalBillingRate(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.billingRate){
        total += labor.billingRate;
      }
    }
    return total;
  }

  getTotalBillingAmount(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.billingAmount){
        total += labor.billingAmount;
      }
    }
    return total;
  }

  getTotalCostPlus(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.labourCostPlus){
        total += labor.labourCostPlus;
      }
    }
    return total;
  }

  getTotalHours(taskList){
    let total = 0;
    for(let labor of taskList){
      if(labor.labourCostPlus){
        total += labor.labourCostPlus;
      }
    }
    return total;
  }

  calculateTotalHours(){
    this.laborForm.totalWorkHours = 0;
    for(let task of this.taskList){
      if(task.totalWorkHours){
        this.laborForm.totalWorkHours += task.totalWorkHours;
      }
    }
  }

  calculateTaskHours(task){
    task.totalWorkHours = 0;
    if(this.laborForm.workOrderLaborList[0] && this.laborForm.workOrderLaborList[0][task.description.toLowerCase()]){
      for(let taskData of this.laborForm.workOrderLaborList[0][task.description.toLowerCase()]){
        task.totalWorkHours += taskData.hours;
      }
    }
  }
  // tasks : this.laborForm.tasks[0][keysArray[i]].map(x => {
  //   return {
  //     ...x,
  //     employeeId: getValueFromObjectByKey('value', x.employeeId )
  //   }
  // }),
}
