import './PetCard.css';

const PetCard = ({ pet }) => {
  return (
    <figure className="pet_card">
      <img src={pet.photo} alt={pet.name} />
      <div className="info-pet">
        <h2>{pet.name.toUpperCase()}</h2>
        <h3>Especie: {pet.specie}</h3>
        <h3>Raza: {pet.breed}</h3>
      </div>
    </figure>
  );
};

export default PetCard;
