import React, { useState } from 'react'

const SubtaskExtraDetails = ({ subtask, handleUpdateSubtask }) => {
//   console.log(subtask)
//   const [scheduled, setScheduled] = useState(subtask.scheduled)
//   const [priority, setPriority] = useState(subtask.priority)
  const [note, setNote] = useState(subtask.note)

  return (
    <div className='subTaskExpand'>
      <span id='notesLabel'>Notes:</span>
      <textarea
        id='note' value={note}
        onChange={(event) => {
          setNote(event.target.value)
        //   handleUpdateSubtask(event, subtask._id, event.target.value)
        }}
        onBlur={(event) => handleUpdateSubtask(event, subtask._id, note)}
      />

      <select
        id='priority' value={subtask.priority} onChange={(event) => {
        //   setPriority(event.target.value)
          handleUpdateSubtask(event, subtask._id, event.target.value)
        }}
      >
        <option value='3'>High</option>
        <option value='2'>Medium</option>
        <option value='1'>Low</option>
        <option value='0'>None</option>
      </select>

      <input
        id='scheduled' type='date' value={subtask.scheduled === 'null' ? '' : subtask.scheduled}
        onChange={(event) => {
        //   setScheduled(scheduled)
        //   console.log(event.target.value, scheduled)
          if (event.target.value === '') {
            handleUpdateSubtask(event, subtask._id, 'null')
          } else {
            handleUpdateSubtask(event, subtask._id, event.target.value)
          }
        }}
      />
    </div>
  )
}

export default SubtaskExtraDetails
