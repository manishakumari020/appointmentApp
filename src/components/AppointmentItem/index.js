import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggledStarredItem} = props
  const {id, date, title, isStarred} = appointmentDetails

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggledStarredItem(id)
  }
  return (
    <li className="list-item-container">
      <div className="filtered-details-container">
        <p className="description">{title}</p>
        <button
          type="button"
          className="star-button"
          testid="star"
          onClick={onClickStar}
        >
          <img src={starImageUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date-para">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
