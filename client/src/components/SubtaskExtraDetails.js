import React, { useState } from 'react'

const SubtaskExtraDetails = ({ subtask, handleUpdateSubtask, handleError }) => {
  const [notes, setNotes] = useState(subtask.note)
  const [scheduled, setScheduled] = useState(subtask.scheduled)
  const [priority, setPriority] = useState(subtask.priority)
  return (
    <div className='subTaskExpand'>
      <span id='notesLabel'>Notes:</span>
      <textarea
        id='note' value={notes}
        onChange={(event) => {
          setNotes(event.target.value)
          handleUpdateSubtask(event, subtask._id, notes)
        }}
      />

      <select
        id='priority' value={priority} onChange={(event) => {
          setPriority(event.target.value)
          console.log(event.target.value)
          handleUpdateSubtask(event, subtask._id, priority)
        }}
      >
        <option value='3'>High</option>
        <option value='2'>Medium</option>
        <option value='1'>Low</option>
        <option value='0'>None</option>
      </select>

      <input
        id='scheduled' type='date'
        onChange={(event) => {
          setScheduled(scheduled)
          handleUpdateSubtask(event, subtask._id, scheduled)
        }}
      />
    </div>
  )
}

export default SubtaskExtraDetails
