import {
    Col,
    Row
} from "react-bootstrap";

import {useState} from "react";

const formulaTypes = [
  "existante",
  "perso"
]

const formulas = [
    {id: "silverFormula", label: "SILVER", descriptionInterieur: "Aspirateur", descriptionExterieur:"Jantes, shampoing, séchage, vitres", price: 30},
    {id: "goldFormula", label: "GOLD", descriptionInterieur: "Aspirateur, plastiques, vitres, tapis/moquettes", descriptionExterieur: "Jantes, shampoing, cire de finition, séchage, vitres", price: 40},
    {id: "platiniumFormula", label: "PLATINIUM", descriptionInterieur: "Aspirateur, plastiques, vitres, tapis, moquettes, shampouigneuse de tissus", descriptionExterieur: "Extérieur : Jantes, shampoing, cire de finition, séchage, vitres, tapis, moquettes", price: 50},
]

const taches = [
    {id: "aspirateur", label: "Aspirateur", place:"Intérieur", price: 20},
    {id: "aspirateur", label: "Nettoyage de plastique", place:"Intérieur", price: 10},
    {id: "aspirateur", label: "Rénovateur de plastique", place:"Intérieur", price: 5},
    {id: "aspirateur", label: "Shampouinage du plafond", place:"Intérieur", price: 15},
    {id: "aspirateur", label: "Shampouinage des sièges", place:"Intérieur", price: 5},
    {id: "aspirateur", label: "Vitres", place:"Intérieur", price: 5},
    {id: "aspirateur", label: "Nettoyage des siège", place:"Intérieur", price: 10},
    {id: "aspirateur", label: "Nettoyage du coffre", place:"Intérieur", price: 20},
    {id: "aspirateur", label: "Aspirateur", place:"Intérieur", price: 5},
    {id: "aspirateur", label: "Aspirateur", place:"Intérieur", price: 20},
    {id: "aspirateur", label: "Aspirateur", place:"Extérieur", price: 5},
    {id: "aspirateur", label: "Aspirateur", place:"Extérieur", price: 10},
    {id: "aspirateur", label: "Aspirateur", place:"Extérieur", price: 15},
    {id: "aspirateur", label: "Aspirateur", place:"Extérieur", price: 10},
    {id: "aspirateur", label: "Aspirateur", place:"Extérieur", price: 5},
    {id: "aspirateur", label: "Aspirateur", place:"Extérieur", price: 15}
]

const FormulaChoiceStep = (props) => {
    const [currentState, setCurrentState] = useState('Unchecked')

    const handleClick = (event) => {
        if (event.target.checked === true) {
            setCurrentState('Checked')
        } else {
            setCurrentState('Unchecked')
        }
    }

  return(
        props.formulaType===formulaTypes[0]?
            <Row className={"stepBackground mb-5"}>
                <h3 className={"mt-3"}>Quelle formule souhaitez-vous ?</h3>
                <Row className={"justify-content-center"}>
                    {
                        formulas.map(formula => {
                            return(
                                <Col
                                    key={"formula-"+formula.id}
                                    xl={3}
                                    role={"button"}
                                    className={"border rounded-3 border-3 m-5 p-3 text-center choiceBackground"}
                                    onClick={() => props.saveChoice("formula", formula.label)}
                                >
                                    <h3>{formula.label}</h3>
                                    <p className={"fw-bold"}>{formula.price}€</p>
                                    <p className={"font-size-14 fst-italic"}>Intérieur : {formula.descriptionInterieur}</p>
                                    <p className={"font-size-14 fst-italic"}>Extérieur : {formula.descriptionExterieur}</p>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Row>
        :
            <Row className={"stepBackground mb-5"}>
                <h3 className={"mt-3"}>Composez votre formule</h3>
                <Row className={"justify-content-center"}>
                    {
                        taches.map(tache => {
                            return(
                                <Row xl={12} className={"border rounded-3 border-3 d-flex text-center"}>
                                    <label>{tache.label + tache.price} </label>
                                    <input
                                        type="checkbox"
                                        id={"task-"+tache.id}
                                        onClick={(event) => handleClick(event)}
                                    />
                                </Row>
                            )
                        })
                    }
                </Row>
            </Row>
  )
}

export default FormulaChoiceStep