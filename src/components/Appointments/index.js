import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    dateInput: '',
    titleInput: '',
    isFilterActive: false,
  }

  toggledStarredItem = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilteredContent = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointments = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), `dd MMMM yyyy, EEEE`)
      : ''
    const newAppointments = {
      id: v4(),
      isStarred: false,
      title: titleInput,
      date: formattedDate,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointments],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointment = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTranscation => eachTranscation.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {isFilterActive, titleInput, dateInput} = this.state
    const filteredClassName = isFilterActive
      ? 'filtered-filled'
      : 'filtered-empty'
    const filteredAppointmentList = this.getFilteredAppointment()
    return (
      <div className="app-container">
        <div className="appointment-app-container">
          <div className="appointment-details-container">
            <div className="appointment-add">
              <form className="form" onSubmit={this.onAddAppointments}>
                <h1 className="add-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  className="input"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="appointment-img"
              />
            </div>
            <hr className="line" />
            <div className="filtered-container">
              <h1 className="header">Appointments</h1>
              <button
                type="button"
                className={`filtered-style ${filteredClassName}`}
                onClick={this.onFilteredContent}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggledStarredItem={this.toggledStarredItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
