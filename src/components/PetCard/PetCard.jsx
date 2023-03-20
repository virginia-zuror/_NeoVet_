import './PetCard.css';

const PetCard = ({ pet }) => {
  return (
    <figure>
      <img src={pet.photo} alt={pet.name} />
      <h2>{pet.name}</h2>
      <h3>{pet.specie}</h3>
      <h3>{pet.breed}</h3>
      <h3>{pet.birth}</h3>
      <div>
        <button>Historial médico</button>
        <button>Solicitar cita</button>
      </div>
    </figure>
  );
};

export default PetCard;
