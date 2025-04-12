import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empDetails } from '../data/employeeData';
import { inject as service } from '@ember/service';
import { runTask, cancelTask } from 'ember-lifeline';
import { DateTime } from 'luxon';


export default class EditEmpComponent extends Component {
  managers = [
      { name: 'James' },
      { name: 'Jonathan' },
      { name: 'Ruth'},
      { name: 'Tina' },
      { name: 'Eric' },
    ];
  @tracked isEqualID = null;
  @tracked updateLoading = false;
  @tracked selectedManager = null;
  @tracked selectedDate = null;
  @tracked selectedDojDate = null;
  @tracked showCalendar = false;
  @tracked showDojCalendar = false;
  @tracked center2 = null;
  @tracked center3 = null;
  @service router;
  @service flashMessages;
  @tracked name = '';
  @tracked empId = '';
  @tracked designation = '';
  @tracked dob = '';
  @tracked doj = '';
  @tracked manager = '';
  @tracked editingEmp = null;

  prevent(e) {
    return e.stopImmediatePropagation();
  }
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  groupedYears = [
    {
      groupName: "40's",
      options: Array(...Array(10)).map((_, i) => `${i + 1940}`),
    },
    {
      groupName: "50's",
      options: Array(...Array(10)).map((_, i) => `${i + 1950}`),
    },
    {
      groupName: "60's",
      options: Array(...Array(10)).map((_, i) => `${i + 1960}`),
    },
    {
      groupName: "70's",
      options: Array(...Array(10)).map((_, i) => `${i + 1970}`),
    },
    {
      groupName: "80's",
      options: Array(...Array(10)).map((_, i) => `${i + 1980}`),
    },
    {
      groupName: "90's",
      options: Array(...Array(10)).map((_, i) => `${i + 1990}`),
    },
    {
      groupName: "00's",
      options: Array(...Array(10)).map((_, i) => `${i + 2000}`),
    },
  ];

  constructor() {
    super(...arguments);
    this.editingEmp = this.args.editingEmp;

    if (this.editingEmp) {
      this.name = this.editingEmp.name;
      this.empId = this.editingEmp.empId;
      this.designation = this.editingEmp.designation;
      this.dob = this.editingEmp.dob;
      this.doj = this.editingEmp.doj;
      this.selectedDate = this.editingEmp.doj;
      this.selectedManager = this.managers.find(
        (m) => m.name === this.editingEmp.manager
      );
      console.log(this.editingEmp.manager)

    }

  }

  @action
  checkEmpID() {
    let existing = empDetails.find((emp) => emp.empId === this.empId);
    this.isEqualID = existing ? this.empId : null;
  }

  @action
  changeCenter2(unit, calendar, val) {
    let newCenter = calendar.center.clone()[unit](val);
    calendar.actions.changeCenter(newCenter);
  }

  @action
  onCenterChange(selected) {
    this.center2 = selected.date;
  }

  @action
  onDojCenterChange(selected) {
    this.center3 = selected.date;
  }


  @action
  changeCenter3(unit, calendar, val) {
    let newCenter = calendar.center.clone()[unit](val);
    calendar.actions.changeCenter(newCenter);
    this.center3 = DateTime.fromJSDate(newCenter.toJSDate());
  }
  
  

  @action
  triggerDobPicker() {
    this.showCalendar = true;
  }

  @action
  triggerDojPicker() {
    this.showDojCalendar = true;
  }

  @action
  selectDob(selected) {
    const selectedLuxon = selected.date?.toFormat ? selected.date : DateTime.fromJSDate(selected.date);
  
    this.selectedDate = selectedLuxon;
    this.dob = selectedLuxon.toFormat('dd-MM-yyyy');
    this.showCalendar = false;
    console.log('Selected object:', this.dob);
  }
  

  @action
  open(dropdown) {
    if (this.closeTimer) {
      cancelTask(this, this.closeTimer);
      this.closeTimer = null;
    } else {
      dropdown.actions.open();
    }
  }

  @action
  closeLater(dropdown) {
    this.closeTimer = runTask(
      this,
      () => {
        this.closeTimer = null;
        dropdown.actions.close();
      },
      200,
    );
  }

 
 

  @action
  selectDoj(selected) {
    const selectedDojLuxon = selected.date?.toFormat ? selected.date : DateTime.fromJSDate(selected.date);
  
    this.selectedDojDate = selectedDojLuxon;
    this.doj = selectedDojLuxon.toFormat('dd-MM-yyyy');
    this.showDojCalendar = false;
    console.log('Selected DOJ:', this.doj);
  }

  
  @action
  selectManager(manager) {
    this.selectedManager = manager;
  }


  @action setName(e) {
    this.name = e.target.value;
  }

  @action setEmpId(e) {
    this.empId = e.target.value;
  }

  @action setDesignation(e) {
    this.designation = e.target.value;
  }

  @action setDob(e) {
    this.dob = e.target.value;
  }

  @action setDoj(e) {
    this.doj = e.target.value;
  }

  @action
  showCustomFlash() {
    this.flashMessages.success('Employee details updated successfully!', {
      timeout: 3000,
      sticky: false,
      showProgress: true,
      type: 'custom-success', 
    });

  }

  @action 
  closeCalendar() {
    if(this.showCalendar) {
      this.showCalendar = false;
    }
    if(this.showDojCalendar) {
      this.showDojCalendar = false;
    }
  }


  @action 
  async EditEmployee(e) {
    e.preventDefault();
    this.updateLoading = true;

    await new Promise((resolve) => {
      setTimeout(() => {
      this.editingEmp.name = this.name;
    this.editingEmp.empId = this.empId;
    this.editingEmp.designation = this.designation;
    this.editingEmp.dob = this.dob;
    this.editingEmp.doj = this.doj;
    this.editingEmp.manager = this.selectedManager?.name || this.manager;
    this.updateLoading = false;
    }, 2000)
    this.showCustomFlash()
    this.Back();
  });
}

  @action
  Back() {
    setTimeout(() => {
      this.router.transitionTo('');
    }, 3000); 
  }
  
  @action
  resetForm() {
    setTimeout(() => {
      this.name = '';
      this.empId = '';
      this.designation = '';
      this.dob = '';
      this.doj = '';
      this.manager = '';
    }, 3000)
  }
}
