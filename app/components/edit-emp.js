import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empDetails } from '../data/employeeData';
import { inject as service } from '@ember/service';

export default class EditEmpComponent extends Component {
  @service router;

  @tracked name = '';
  @tracked empId = '';
  @tracked designation = '';
  @tracked dob = '';
  @tracked doj = '';
  @tracked manager = '';
  @tracked editingEmp = null;

  constructor() {
    super(...arguments);
    this.editingEmp = this.args.editingEmp;

    if (this.editingEmp) {
      this.name = this.editingEmp.name;
      this.empId = this.editingEmp.empId;
      this.designation = this.editingEmp.designation;
      this.dob = this.editingEmp.dob;
      this.doj = this.editingEmp.doj;
      this.manager = this.editingEmp.manager;
    }
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

  @action setManager(e) {
    this.manager = e.target.value;
  }

  @action EditEmployee(e) {
    e.preventDefault();

    this.editingEmp.name = this.name;
    this.editingEmp.empId = this.empId;
    this.editingEmp.designation = this.designation;
    this.editingEmp.dob = this.dob;
    this.editingEmp.doj = this.doj;
    this.editingEmp.manager = this.manager;

    console.log('Updated:', empDetails);

    this.router.transitionTo('');

    this.name = '';
    this.empId = '';
    this.designation = '';
    this.dob = '';
    this.doj = '';
    this.manager = '';
  }

  @action Back(){
    this.router.transitionTo('')
  }
}
