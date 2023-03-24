import './StaffCard.css';

const StaffCard = ({ st }) => {
  return (
    <figure className="staff_card">
      <div className="staff_img">
        <img src={st.avatar} alt={st.name} />
      </div>
      <h2>{st.name}</h2>
      <h3>{st.position}</h3>
      <h3>{st.speciality}</h3>
    </figure>
  );
};

export default StaffCard;
