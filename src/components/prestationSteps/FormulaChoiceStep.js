import {Col, Row} from "react-bootstrap";

const formulaTypes = [
  "existante",
  "perso"
]

const formulas = [
    {id: "id", label: "form1", description: "description de la formule", price: 100},
    {id: "id2", label: "nom de la formule", description: "description de la formule", price: 100},
    {id: "id3", label: "nom de la formule", description: "description de la formule", price: 100},
    {id: "id4", label: "nom de la formule", description: "description de la formule", price: 100},
    {id: "id5", label: "nom de la formule", description: "description de la formule", price: 100}
]

const FormulaChoiceStep = (props) => {
  return(
        props.formulaType===formulaTypes[0]?
          <Row>
              {
                  formulas.map(formula => {
                      return(
                          <Col
                              key={"formula-"+formula.id}
                              role={"button"}
                              className={""}
                              onClick={() => props.saveChoice("formula", formula.label)}
                          >
                              <h3>{formula.label}</h3>
                              <p>{formula.description}</p>
                              <p>{formula.price} €</p>
                          </Col>
                      )
                  })
              }
          </Row>
        :
          <div>Mettre les tasks</div>
  )
}

export default FormulaChoiceStep