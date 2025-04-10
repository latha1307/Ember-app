import Route from '@ember/routing/route';
import { empDetails } from '../data/employeeData';

export default class EditEmpRoute extends Route {
    model(params) {
        const empId = params.empId;
        return empDetails.find(emp => emp.empId === empId);
      }
}
