import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const ProjectSummary = (props) => {
  const {project} = props;
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{project.title}</span>
        <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default ProjectSummary
