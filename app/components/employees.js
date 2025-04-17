import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empDetails } from '../data/employeeData';
import { jobPostsData } from '../data/jobPostData';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

import Employee from '../models/employee';

export default class EmployeesComponent extends Component {
  @tracked employees = (empDetails ?? []).map((e) => new Employee(e));
  @tracked dialogOpen = false;
  @tracked search = '';
  @tracked selected = false;
  @tracked editingEmp = null;
  @service router;
  @tracked showCustomize = false;


  @tracked jobPosts = jobPostsData;
  @tracked show = false;

  @tracked columns = [
    { column: 'Employee ID', valuePath: 'empId', isVisible: true},
    { column: 'Employee Name', valuePath: 'name', isVisible: true},
    { column: 'Designation', valuePath: 'designation', isVisible: true},
    { column: 'Key Skills', valuePath: 'skills', isVisible: true},
    { column: 'DOB', valuePath: 'dob', isVisible: true},
    { column: 'Date of Joining', valuePath: 'doj', isVisible: true},
    { column: 'Manager', valuePath: 'manager', isVisible: true},
  ]

  constructor() {
    super(...arguments);
    this.showResult.perform();
  }

  @task
  *showResult() {
    yield timeout(3000);
    console.log('finished')
    this.show = true;
    console.log(this.show);
  }



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

  @action 
  add(e) {
    e.preventDefault()
    this.router.transitionTo('addEmp')
  }

  @action 
  edit(e) {
    e.preventDefault()
    this.router.transitionTo('editEmp')
  }

  @action 
  loadMore() {
    let currentLength = this.jobPosts.length;
    const repeatJobs = this.jobPosts.map((jobPost, index) => {
      return {
        ...jobPost,
        id : currentLength + index + 1
      };
    });

    this.jobPosts = [...this.jobPosts, ...repeatJobs];
  }

    @action 
    loadAbove() {
      let minId = Math.min(...this.jobPosts.map(job => job.id));
      console.log(minId)
      const repeatAboveJobs = this.jobPosts.map((jobPost, index) => {
        return {
          ...jobPost,
          id : minId - (index + 1)
        }
      })
      console.log(repeatAboveJobs)
      this.jobPosts = [...repeatAboveJobs, ...this.jobPosts]
    }

  
  @action
  toggleCustomize() {
    this.showCustomize = !this.showCustomize;
  }

  @action
  closeCustomize() {
    if (this.showCustomize) {
      this.showCustomize = false;
    }
  }

  @action
  toggleColumn(index) {
    let newColumns = this.columns.slice();
    newColumns[index] = {
      ...newColumns[index],
      isVisible: !newColumns[index].isVisible,
    };
    this.columns = newColumns;
  }

  @action
  updateColumns() {
    console.log('Updated Columns: ', this.columns)
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


}
