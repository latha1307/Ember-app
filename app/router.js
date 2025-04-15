import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}


Router.map(function () {
  this.route('addEmp');
  this.route('editEmp', { path: 'editEmployee/:empId'});
  this.route('catch-all', { path: '/*wildcard' });
  this.route('dashboard');
  this.route('employees');
  this.route('leaveRequests');
  this.route('applyLeave');
  this.route('attendance');
  this.route('projects');
  this.route('job-openings');
});
