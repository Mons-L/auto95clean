const formulasTasksDB = require('../../../database/formulasTasks.db.service');

const FORMULA_TYPE_READY_ID = 1

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'GET': return handleGet(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}

const handleGet = async (req, res) => {
    try {
        const formulasJoinTasks = await formulasTasksDB.getFormulasJoinTasksByFormulaTypeId(FORMULA_TYPE_READY_ID);
        let formulasFullInformations = []

        formulasJoinTasks.forEach(formulaJoinTask => {
            if(!formulasFullInformations.find(formula => formula.id === formulaJoinTask.formula_id)){
                formulasFullInformations.push({
                    id: formulaJoinTask.formula_id,
                    label: formulaJoinTask.formulaLabel,
                    tasks: [
                        {id: formulaJoinTask.task_id, label: formulaJoinTask.taskLabel, type: formulaJoinTask.taskType, price: formulaJoinTask.taskPrice}
                    ]
                })
            }
            else{
                let formula = formulasFullInformations
                    .find(formulaFullInformations => formulaFullInformations.id === formulaJoinTask.formula_id)
                formula.tasks.push({id: formulaJoinTask.task_id, label: formulaJoinTask.taskLabel, type: formulaJoinTask.taskType, price: formulaJoinTask.taskPrice})
            }
        })

        return res.status(200).json({
            data: { formulas: formulasFullInformations },
            error: null
        });
    }
    catch(err){
        const message = '[formulas] ' + err;
        console.error(message);
        res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}