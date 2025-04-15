import Component from '@glimmer/component';
import { leaveRequestsData } from '../data/leaveRequestData';
import { tracked } from '@glimmer/tracking';

export default class LeaveRequests extends Component {
    @tracked leaveRequests = leaveRequestsData;
}
