import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empDetails } from '../data/employeeData';
import { inject as service } from '@ember/service';
import { runTask, cancelTask } from 'ember-lifeline';

export default class EditEmpComponent extends Component {
    managers = [
        { name: 'James' },
        { name: 'Jonathan' },
        { name: 'Ruth'},
        { name: 'Tina' },
        { name: 'Eric' },
      ];
    @tracked selectedManager = null;

  @service router;

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

  

  constructor() {
    super(...arguments);
    this.editingEmp = this.args.editingEmp;

    if (this.editingEmp) {
      this.name = this.editingEmp.name;
      this.empId = this.editingEmp.empId;
      this.designation = this.editingEmp.designation;
      this.dob = this.editingEmp.dob;
      this.doj = this.editingEmp.doj;
      this.selectedManager = this.managers.find(
        (m) => m.name === this.editingEmp.manager
      );
      console.log(this.editingEmp.manager)

    }

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


  @action setHello(e){
    console.log('changed')
  }

  @action EditEmployee(e) {
    e.preventDefault();

    this.editingEmp.name = this.name;
    this.editingEmp.empId = this.empId;
    this.editingEmp.designation = this.designation;
    this.editingEmp.dob = this.dob;
    this.editingEmp.doj = this.doj;
    this.editingEmp.manager = this.selectedManager?.name || this.manager;


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
