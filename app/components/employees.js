import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empDetails } from '../data/employeeData';

import Employee from '../models/employee';

export default class EmployeesComponent extends Component {
  @tracked employees = (empDetails ?? []).map((e) => new Employee(e));
  @tracked dialogOpen = false;
  @tracked search = '';
  @tracked selected = false;
  @tracked editingEmp = null;

  @tracked name = '';
  @tracked empId = '';
  @tracked designation = '';
  @tracked dob = '';
  @tracked doj = '';
  @tracked manager = '';

  get filteredEmployees() {
    if (!this.search) return this.employees;
    return this.employees.filter(
      (e) =>
        e.name.toLowerCase().includes(this.search.toLowerCase()) ||
        e.empId.toLowerCase().includes(this.search.toLowerCase()) ||
        e.designation.toLowerCase().includes(this.search.toLowerCase()) ||
        e.manager.toLowerCase().includes(this.search.toLowerCase()),
    );
  }
  formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  @action updateSearch(e) {
    this.search = e.target.value;
  }

  @action openEditDialog(emp) {
    this.editingEmp = emp;
    this.name = emp.name;
    this.empId = emp.empId;
    this.designation = emp.designation;
    this.dob = this.formatDate(emp.dob);
    this.doj = this.formatDate(emp.doj);
    this.manager = emp.manager;
    this.dialogOpen = true;
    console.log(emp);
  }

  @action closeDialog() {
    this.dialogOpen = false;
    this.resetForm();
    this.editingEmp = null;
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

  @action addEditEmployee(e) {
    e.preventDefault();

    if (this.editingEmp) {
      this.editingEmp.name = this.name;
      this.editingEmp.empId = this.empId;
      this.editingEmp.designation = this.designation;
      this.editingEmp.dob = this.dob;
      this.editingEmp.doj = this.doj;
      this.editingEmp.manager = this.manager;
      this.employees = [...this.employees];
    } else {
      this.employees = [
        ...this.employees,
        {
          name: this.name,
          empId: this.empId,
          designation: this.designation,
          dob: this.dob,
          doj: this.doj,
          manager: this.manager,
          selected: false,
        },
      ];
    }

    this.closeDialog();
  }

  @action toggleSelect(emp) {
    emp.selected = !emp.selected;
    console.log(emp.selected);
    this.employees = [...this.employees];
  }

  @action selectAll(e) {
    const checked = e.target.checked;
    console.log(checked);
    this.employees.forEach((emp) => {
      emp.selected = checked;
    });
    this.employees = [...this.employees];
  }

  @action deleteEmployees() {
    this.employees = this.employees.filter((e) => !e.selected);
  }

  resetForm() {
    this.name = '';
    this.empId = '';
    this.designation = '';
    this.dob = '';
    this.doj = '';
    this.manager = '';
  }
}
