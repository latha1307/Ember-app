import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empDetails } from '../data/employeeData';
import { inject as service } from '@ember/service';
import { runTask, cancelTask } from 'ember-lifeline';
import { DateTime } from 'luxon';

export default class AddEmpComponent extends Component {
  @service router;
  @service flashMessages;

  managers = [
    { name: 'James' },
    { name: 'Jonathan' },
    { name: 'Ruth' },
    { name: 'Tina' },
    { name: 'Eric' },
  ];

  @tracked selectedManager = null;
  @tracked addLoading = false;
  @tracked name = '';
  @tracked empId = '';
  @tracked designation = '';
  @tracked dob = '';
  @tracked doj = '';

  @tracked selectedDate = null;
  @tracked selectedDojDate = null;
  @tracked showCalendar = false;
  @tracked showDojCalendar = false;
  @tracked center2 = null;
  @tracked center3 = null;
  @action prevent(e) {
    return e.stopImmediatePropagation();
  }

  months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
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

  @action
  changeCenter2(unit, calendar, val) {
    console.log(`Changing center: unit=${unit}, val=${val}`); 
    if (calendar.center) {
      let newCenter = calendar.center.clone()[unit](val);
      calendar.actions.changeCenter(newCenter);
      this.center2 = newCenter;
      console.log("New Center2:", this.center2); 
    }
  }
  
  @action
  onCenterChange(selected) {
    const newCenter = selected.date;
    this.center2 = newCenter;
  
  
    if (this.cal) {
      this.cal.actions.changeCenter(newCenter);  
    }
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
    console.log('Selected DOB formatted:', this.dob);
  }

  @action
  selectDoj(selected) {
    const selectedDojLuxon = selected.date?.toFormat ? selected.date : DateTime.fromJSDate(selected.date);
    this.selectedDojDate = selectedDojLuxon;
    this.doj = selectedDojLuxon.toFormat('dd-MM-yyyy');
    this.showDojCalendar = false;
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

  @action open(dropdown) {
    if (this.closeTimer) {
      cancelTask(this, this.closeTimer);
      this.closeTimer = null;
    } else {
      dropdown.actions.open();
    }
  }

  @action
  closeCalendars() {
    if (this.showCalendar) {
      this.showCalendar = false;
    }
    if (this.showDojCalendar) {
      this.showDojCalendar = false;
    }
  }
  

  @action closeLater(dropdown) {
    this.closeTimer = runTask(
      this,
      () => {
        this.closeTimer = null;
        dropdown.actions.close();
      },
      200
    );
  }

  @action selectManager(manager) {
    this.selectedManager = manager;
  }

  @action
  showCustomFlash() {
    this.flashMessages.success('Employee details added successfully!', {
      timeout: 3000,
      sticky: false,
      showProgress: true,
      type: 'custom-success', 
    });

  }

  @action 
  async addEmployee(e) {
    e.preventDefault();
    this.addLoading = true;
    
    await new Promise((resolve) => {
      setTimeout(() => {
        empDetails.push({
          name: this.name,
          empId: this.empId,
          designation: this.designation,
          dob: this.dob,
          doj: this.doj,
          manager: this.selectedManager?.name || 'Not Assigned',
          selected: false,
        }
      );
      this.addLoading = false;
      },2000);
      this.showCustomFlash()
      this.Back();
    })


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
      this.selectedManager = null;
    }, 3000)
  }
}
