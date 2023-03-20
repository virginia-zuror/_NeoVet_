import './StaffCard.css';

const StaffCard = ({ st }) => {
  return (
    <figure>
      <img src={st.avatar} alt={st.name} />
      <h2>{st.name}</h2>
      <h3>{st.position}</h3>
      <h3>{st.speciality}</h3>
    </figure>
  );
};

export default StaffCard;
