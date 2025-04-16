import Component from '@glimmer/component';
import { add } from 'ember-power-calendar/utils';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { runTask, cancelTask } from 'ember-lifeline';
import { inject as service } from '@ember/service';

export default class ApplyLeave extends Component {
  @tracked center = new Date();
  @tracked selected = null;
  @tracked selectedManager = null;
  @tracked selectedLeave = null;
  @tracked formattedDateRange = '';
  @tracked sendLoading = false;

  @service flashMessages;
  managers = [
    { name: 'James' },
    { name: 'Jonathan' },
    { name: 'Ruth' },
    { name: 'Tina' },
    { name: 'Eric' },
  ];

  leaveTypes = [
    { type: 'Casual Leave' },
    { type: 'Privilege Leave' },
    { type: 'Sick Leave' },
    { type: 'Maternity Leave' },
    { type: 'Paternity Leave' },
    { type: 'Bereavement Leave' },
    { type: 'Compensatory Off' },
    { type: 'Leave Without Pay (LOP)' },
  ];



  get nextMonthsCenter() {
    return add(this.center, 1, 'month');
  }

  @action prevent(e) {
    return e.stopImmediatePropagation();
  }

  @action selectManager(manager) {
    this.selectedManager = manager;
  }

  @action selectLeave(leave) {
    this.selectedLeave = leave;
  }
  @action
  showCustomFlash(type = 'success', message = 'Leave request sent successfully!') {
        this.flashMessages.add({
            message: message,
            type: type,
            timeout: 3000,
            showProgress: true
          }); 

  }

  @action 
  showInitialFlashMessage() {
    this.showCustomFlash('info',"Please apply leave within the month");
  }
  @action
  flashDouble() {
    this.showCustomFlash('warning', '⚠️ Please click only once. Request may be duplicated.')
  }

  @action 
  flashDanger() {
    this.showCustomFlash('danger', " ❌ Please avoid double-clicking. Request may be duplicated!")
  }

  @action
  async sendRequest() {
    this.sendLoading = true;
  
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('success');
        resolve(); 
      }, 2000);
      this.showCustomFlash('success', 'Leave request sent successfully!' );
    });
  
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  }
  

  @action
  onCenterChange(selected) {
    this.center = selected.date;
  }

  @action
  onSelect(selected) {
    this.selected = selected.date;
  
    if (this.selected?.start && this.selected?.end) {
      console.log('working');
  
      const format = (date) => {
        let d = new Date(date);
        let dd = String(d.getDate()).padStart(2, '0');
        let mm = String(d.getMonth() + 1).padStart(2, '0');
        let yyyy = d.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
      };
  
      const dayDiff =
        Math.floor((new Date(this.selected.end) - new Date(this.selected.start)) / (1000 * 60 * 60 * 24)) + 1;
  
      this.formattedDateRange = `${format(this.selected.start)} - ${format(this.selected.end)} (${dayDiff} days)`;
      console.log(this.formattedDateRange);
    } else {
      this.formattedDateRange = '';
    }
  }
  

   @action open(dropdown) {
      if (this.closeTimer) {
        cancelTask(this, this.closeTimer);
        this.closeTimer = null;
      } else {
        dropdown.actions.open();
      }
    }
    @action closeLater(dropdown) {
        this.closeTimer = runTask(
          this,
          () => {
            this.closeTimer = null;
            dropdown.actions.close();
          },
          200
        );
      }

      @action openLeave(dropdown) {
        if (this.closeTimer) {
          cancelTask(this, this.closeTimer);
          this.closeTimer = null;
        } else {
          dropdown.actions.open();
        }
      }
      @action closeLaterLeave(dropdown) {
          this.closeTimer = runTask(
            this,
            () => {
              this.closeTimer = null;
              dropdown.actions.close();
            },
            200
          );
        }
}
