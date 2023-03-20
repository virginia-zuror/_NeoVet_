import './PetCard.css';
import Button from "../../UI/Button"

const PetCard = ({ pet }) => {
  return (
    <figure>
      <img src={pet.photo} alt={pet.name} />
      <div className='info-pet'>
      <h2>Nombre: {pet.name}</h2>
      <h3>Especie: {pet.specie}</h3>
      <h3>Raza: {pet.breed}</h3>
      </div>
      <div className='pet-buttons'>
      <Button text="Consulta" padding="lg"/>
      <Button text="Ver Perfil" padding="lg"/>
      </div>
    </figure>
  );
};

export default PetCard;
