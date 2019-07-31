import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-work-order-labor',
  templateUrl: './work-order-labor.component.html',
  styleUrls: ['./work-order-labor.component.css']
})
/** WorkOrderMainComponent component*/
export class WorkOrderLaborComponent implements OnInit {
  @Input() laborForm: any;

  expertiseDropdownMenu = [
    { label: 'Technician', value: 'Technician' },
    { label: 'Quality', value: 'Quality' },
    { label: 'Mechanic', value: 'Mechanic' },
    { label: 'Inspector', value: 'Inspector' },
    { label: 'Receiver', value: 'Receiver' },
    { label: 'Auditor', value: 'Auditor' },
    { label: 'Engineer', value: 'Engineer' }
  ];
  allTasks = {
    Expertise: '',
    EmployeeId: null,
    BillableorNonBillable: '',
    StartDateandTime: '-',
    EndDateandTime: '-',
    HoursandMinutes: '',
    Adjustments: '',
    AdjustmentedHours: '',
    Memo: ''
  };

  ngOnInit() {
    const keysArray = Object.keys(this.laborForm.Tasks[0]);
    for (let i = 0; i < keysArray.length; i++) {
      this.laborForm = {
        ...this.laborForm,
        Tasks: [
          { ...this.laborForm.Tasks[0], [keysArray[i]]: [{ ...this.allTasks }] }
        ]
      };
    }
    console.log(this.laborForm);
  }
  startandStop(obj) {
    if (obj.StartDateandTime === '-') {
      obj.StartDateandTime = moment(new Date()).format('DD/MM/YYYY, h:mm:ss a');
    } else if (obj.EndDateandTime === '-') {
      obj.EndDateandTime = moment(new Date()).format('DD/MM/YYYY, h:mm:ss a');
    }
  }
  saveLabor() {
    console.log(this.laborForm);
  }
}
