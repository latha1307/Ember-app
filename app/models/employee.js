import { tracked } from '@glimmer/tracking';

export default class Employee {
  @tracked name;
  @tracked empId;
  @tracked designation;
  @tracked dob;
  @tracked doj;
  @tracked manager;
  @tracked selected = false;

  constructor(data) {
    Object.assign(this, data);
  }
}
