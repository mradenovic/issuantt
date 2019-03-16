<template>
  <div id="elastic">
    <gantt-elastic :tasks="tasks" :options="options">
      <gantt-header slot="header"></gantt-header>
    </gantt-elastic>
  </div>
</template>

<script>
import GanttElastic from 'gantt-elastic/src/GanttElastic.vue'
import Header from 'gantt-elastic/dist/Header.umd'
import Issues from '../mixins/Issues'

export default {
  name: 'tasks',
  mixins: [Issues],
  components: {
    'gantt-header': Header,
    GanttElastic
  },
  data () {
    return {
      options: {
        title: {
          label: 'Tasks',
          html: false
        },
        taskList: {
          columns: [
            { id: 1, label: 'ID', value: 'id', width: 40 },
            { id: 2, label: 'Title', value: 'label', width: 200, expander: true, html: true },
            { id: 3, label: 'Assignees', value: 'assignees', width: 130, html: true },
            // { id: 3, label: 'Start', value: task => task.startDate.format('YYYY-MM-DD'), width: 78 },
            // { id: 4, label: 'Type', value: 'type', width: 68 },
            {
              id: 5,
              label: '%',
              value: 'progress',
              width: 35,
              style: {
                'task-list-header-label': {
                  'text-align': 'center',
                  width: '100%'
                },
                'task-list-item-value-container': {
                  'text-align': 'center'
                }
              }
            }
          ]
        },
        locale: {
          code: 'en',
          Now: 'Now',
          'X-Scale': 'Zoom-X',
          'Y-Scale': 'Zoom-Y',
          'Task list width': 'Task list',
          'Before/After': 'Expand',
          'Display task list': 'Task list'
          // from now on locale settings are same as those from dayjs - https://github.com/iamkun/dayjs/blob/master/docs/en/I18n.md
        }
      }
    }
  },
  computed: {
    tasks () {
      let tasks = []
      if (this.issues == null) {
        return tasks
      }
      this.issues.forEach(issue => {
        let task = {
          // id {string|int} - gantt-elastic will track changes in task array by this value
          id: this.getTaskId(issue),
          // parentid {string|int} - id of parent task for hiarachy display
          parentId: this.getTaskParentId(issue),
          // dependentOn {[string|int]} - array of ids of dependency tasks
          dependentOn: this.getTaskDependentOn(issue),
          // label {string} - label which will be displayed inside chart or task list
          label: this.getTaskLabel(issue),
          // custom filed for display
          assignees: this.getTaskAssignees(issue),
          // start {string|int|Date} - start property could be date string (ISO 8601) '2018-10-04T21:00:00', milisecond timestamp (int) or Date
          start: this.getTaskStart(issue),
          // duration {int} - how long will take to finish task in second - for one day = 24x60x60
          duration: this.getTaskDuration(issue),
          // custom field used for sorting
          end: this.getTaskEnd(issue),
          // progress {float|int} - value from 0 to 100 (percent)
          progress: this.getTaskProgress(issue),
          // type {string} - project, milestone or task
          type: 'task',
          // style {object} - optional, you can look at CSS page of this wiki and grab some styles
          style: this.getTaskStyle(issue)
          // collapsed {boolean} - optional, for task that have children, task will be collapsed after initialization
        }
        tasks.push(task)
      })
      return tasks.sort((a, b) => {
        return a.end - b.end
      })
    }
  },
  methods: {
    getTaskId (issue) {
      return '#' + this.getIssueId(issue)
    },
    getTaskParentId (issue) {
      return this.getIssueParentId(issue)
    },
    getTaskLabel (issue) {
      const title = this.getIssueTitle(issue) 
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      const label = `<a href="${this.getIssueLink(issue)}" target="_blank" style="color:#0077c0;">${title}</a>`
      return label
    },
    getTaskStart (issue) {
      return this.getIssueStartDate(issue)
    },
    getTaskDuration (issue) {
      let dueDate = new Date(this.getIssueDueDate(issue))
      let startDate = new Date(this.getIssueStartDate(issue))
      let duration =
        (dueDate.getTime() - startDate.getTime()) / 1000
      return duration
    },
    getTaskEnd (issue) {
      return new Date(this.getIssueDueDate(issue))
    },
    getTaskDependentOn (issue) {
      let dependentOn = []
      let dependencies = this.getIssueDependencies(issue)
      if (dependencies) {
        dependentOn = dependencies.replace(/\s/g, '').split(',')
      }
      return dependentOn
    },
    getTaskProgress (issue) {
      // TODO:
      let t = this.getIssueTaskCompletion(issue)
      if (t.complete === 0) {
        return 0
      }
      return t.complete / t.total * 100
    },
    getTaskStyle (issue) {
      let style = {}
      let today = new Date()
      let dueDate = new Date(this.getIssueDueDate(issue))
      if (today.getTime() < dueDate.getTime()) {
        style = {
          base: {
            fill: '#1EBC61',
            stroke: '#0EAC51'
          }
          /* 'tree-row-bar': {
            fill: '#1EBC61',
            stroke: '#0EAC51'
          },
          'tree-row-bar-polygon': {
            stroke: '#0EAC51'
          } */
        }
      }
      return style
    },
    getTaskAssignees (issue) {
      let assignees = []
      this.getIssueAssignees(issue).forEach(assignee => {
        let username = this.getAssigneeUsername(assignee)
        let url = this.getAssigneeLink(assignee)
        let link = `<a href="${url}" target="_blank" style="color:#0077c0;">${username}</a>`
        assignees.push(link)
      })
      return assignees.join(' ')
    }
  }
}
</script>
