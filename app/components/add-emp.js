import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empDetails } from '../data/employeeData';
import { inject as service } from '@ember/service';
import { runTask, cancelTask } from 'ember-lifeline';

export default class AddEmpComponent extends Component {
  @service router;

  managers = [
    { name: 'James' },
    { name: 'Jonathan' },
    { name: 'Ruth' },
    { name: 'Tina' },
    { name: 'Eric' },
  ];

  @tracked selectedManager = null;

  @tracked name = '';
  @tracked empId = '';
  @tracked designation = '';
  @tracked dob = '';
  @tracked doj = '';

  @action prevent(e) {
    return e.stopImmediatePropagation();
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

  @action addEmployee(e) {
    e.preventDefault();

    empDetails.push({
      name: this.name,
      empId: this.empId,
      designation: this.designation,
      dob: this.dob,
      doj: this.doj,
      manager: this.selectedManager?.name || 'Not Assigned',
      selected: false,
    });

    console.log(empDetails);

    this.router.transitionTo('');

    this.name = '';
    this.empId = '';
    this.designation = '';
    this.dob = '';
    this.doj = '';
    this.selectedManager = null;
  }

  @action Back() {
    this.router.transitionTo('');
  }
}
