import Component from '@glimmer/component';
import { jobPostsData } from '../data/jobPostData';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';


export default class JobOpening extends Component {
    @tracked jobPosts = jobPostsData;
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
}
