import './PetCard.css';

const PetCard = ({ pet }) => {
  return (
    <>
      <img src={pet.photo} alt={pet.name} />
      <div className="info-pet">
        <h2>Nombre: {pet.name}</h2>
        <h3>Especie: {pet.specie}</h3>
        <h3>Raza: {pet.breed}</h3>
      </div>
  );
};

export default PetCard;
