import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Navbar extends Component {
    @tracked isArrowDown = false;
    navItems = [
        { label: 'Employees', icon: 'groups', path: 'employees'},
        { label: 'Job Openings', icon: 'work', path: 'job-openings' },
        { label: 'Leave Management', icon: 'calendar_month', 
            subLabels: [
                { label: 'Leave Requests', icon: 'mail', path: 'leaveRequests'},
                { label: 'Apply Leave',icon: 'send', path: 'applyLeave'},
            ]
        },
        { label: 'Attendance', icon: 'free_cancellation', path: 'attendance'},
        { label: 'Projects', icon: 'work_history', path: 'projects'}
    ]

    @action 
    toggleArrowDown() {
        this.isArrowDown = !this.isArrowDown;
    }
}
