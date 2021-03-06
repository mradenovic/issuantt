export default {
  props: {
    startString: {
      type: String,
      default: 'StartDate:'
    },
    dueString: {
      type: String,
      default: 'DueDate:'
    },
    dependsOnString: {
      type: String,
      default: 'DependsOn:'
    },
    parentIdString: {
      type: String,
      default: 'ParentId:'
    },
    issues: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    getIssueId (issue) {
      return issue.iid || issue.number || issue.id
    },
    getIssueParentId (issue) {
      let description = this.getIssueDescription(issue)
      let re = new RegExp(`${this.parentIdString}\\s*(#.*\\d)`)
      let parentId = description.match(re)
      return parentId ? parentId[1] : null
    },
    getIssueDependencies (issue) {
      let description = this.getIssueDescription(issue)
      let re = new RegExp(`${this.dependsOnString}\\s*(#.*\\d)`)
      let dependencies = description.match(re)
      return dependencies ? dependencies[1] : null
    },
    getIssueTitle (issue) {
      return issue.title
    },
    getIssueDescription (issue) {
      return issue.body || issue.description || ''
    },
    getIssueTaskCompletion (issue) {
      const text = this.getIssueDescription(issue)
      const incomplete = (text.match(/^\s*[-*]\s+\[ \]\s+[^\s]/img) || []).length
      const complete = (text.match(/^\s*[-*]\s+\[x\]\s+[^\s]/img) || []).length

      return {
        complete,
        incomplete,
        total: incomplete + complete
      }
    },
    getIssueLink (issue) {
      return issue.web_url || issue.html_url
    },
    getIssueStartDate (issue) {
      return (
        this.getIssueCustomStartDate(issue) ||
        this.getIssueMilestoneStartDate(issue) ||
        issue.created_at
      )
    },
    getIssueDueDate (issue) {
      let dueDate = (
        this.getIssueCustomDueDate(issue) ||
        this.getIssueOriginalDueDate(issue) ||
        this.getIssueMilestoneDueDate(issue) ||
        this.getIssueMockDueDate(issue)
      )
      let startDate = this.getIssueStartDate(issue)

      // check if due date is earlier than start date
      return (new Date(dueDate) - new Date(startDate)) < 0
        ? this.getIssueMockDueDate(issue)
        : dueDate
    },
    getIssueOriginalDueDate (issue) {
      return issue.due_date || null
    },
    getIssueMilestoneDueDate (issue) {
      return (issue.milestone || null) && (
        issue.milestone.due_date || issue.milestone.due_on || null
      )
    },
    getIssueMilestoneStartDate (issue) {
      return (issue.milestone || null) && (
        // github doesn't really have start_on date for milestone
        issue.milestone.start_date || issue.milestone.start_on || null
      )
    },
    getIssueMockDueDate (issue) {
      let dueDate = new Date(this.getIssueStartDate(issue))
      dueDate.setDate(dueDate.getDate() + 1)
      return dueDate.toISOString()
    },
    getIssueCustomDate (issue, dateString) {
      let description = this.getIssueDescription(issue)
      let re = new RegExp(`${dateString}\\s*(\\S*)`)
      let ganttDate = description.match(re)

      // check if result is valid date
      return ganttDate && !isNaN(new Date(ganttDate[1]))
        ? ganttDate[1]
        : null
    },
    getIssueCustomStartDate (issue) {
      return this.getIssueCustomDate(issue, this.startString)
    },
    getIssueCustomDueDate (issue) {
      return this.getIssueCustomDate(issue, this.dueString)
    },
    getIssueAssignees (issue) {
      return issue.assignees
    },
    getAssigneeUsername (assignee) {
      return assignee.username || assignee.login
    },
    getAssigneeLink (assignee) {
      return assignee.web_url || assignee.html_url
    }
  }
}
