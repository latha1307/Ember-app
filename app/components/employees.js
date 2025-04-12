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
  @tracked jobPosts = [
    { id: 1, skills:[ {label: 'ReactJS', labelColor: '#EEEFFB', textColor: '#493196'}, {label: 'ExpressJS', labelColor: 'rgb(181, 243, 181)', textColor: 'green'} ], work: 'Part Time', salary: '$100-$200k', location: 'Remote', title: 'Full Stack Developer', description: 'Proficient in both front-end (client-side) and back-end (server-side) development. '},
    { id: 2, skills:[ {label: 'React Native', labelColor: 'rgb(196, 220, 240)', textColor: 'rgb(5, 80, 142)'}],  work: 'Part Time', location: 'Hybrid', salary: '$60-$120k', title: 'Frontend Developer',  description: 'Responsible for building the user-facing portion of websites and web applications, focusing on the visual and interactive aspects.'},
    { id: 3, skills:[ {label: 'MSSQL', labelColor: 'rgb(252, 255, 179)', textColor: 'rgb(116, 100, 28)'}],  work: 'Part Time', location: 'In Office', salary: '$80-$140k', title: 'Backend Developer', description: 'Responsible for the server-side logic, databases, and infrastructure that powers web applications and software.  '}
  ];

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
