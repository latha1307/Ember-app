import Component from '@glimmer/component';
import { leaveRequestsData } from '../data/leaveRequestData';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

export default class LeaveRequests extends Component {
    @tracked leaveRequests = leaveRequestsData;
    @tracked show = false;

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
    
}
