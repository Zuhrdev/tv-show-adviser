import s from "./style.module.css";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons"

export function FiveStarRating({rating}) {
    // declaration d'un tableau d'étoiles vides
    const starList = []
    // stockage du nb d'étoiles pleines ( = au nombre de chiffre entier dans le rating)
    const starFillCount = Math.floor(rating); 
    // stockage de demi etoile si il y en a une 
    const hasStarHalf = rating - starFillCount >= 0.5;
    // stocker le nbr d'etoiles vides
    const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);
    // envoyer les etoile pleines dans le tableau
    for(let i = 1; i <= starFillCount; i++) {
        starList.push(<StarFill key={"star-fill" + i} />)
    }
    // pareil pour les demi etoiles
    if(hasStarHalf) {
        starList.push(<StarHalf key={"star-half"} />)

    }
    // etoiles vides
    for(let i = 1; i <= emptyStarCount; i++) {
        starList.push(<StarEmpty key={"star-empty" + i} />)
    }

    return (
    <div>{starList}</div>
    );
}