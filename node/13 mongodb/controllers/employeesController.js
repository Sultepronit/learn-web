const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({ message: 'No employees found.'});
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if(!req?.body?.firstName || !req.body.lastName) {
        return res.status(400).json({ message: 'Frist and last names are required'});
    }

    try {
        const result = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        res.status(201).json(result);
    } catch(err) {
        console.error(err);
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id) {
        return res.status(400).json({ message: 'ID is required!' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if(!employee) {
        return res.status(204).json({ message: `No employee matches ID ${req.body.id}.` });
    }
    if(req.body?.firstName) employee.firstName = req.body.firstName;
    if(req.body?.lastName) employee.lastName = req.body.lastName;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ message: 'Epmployee ID required'});

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if(!employee) {
        return res.status(204).json({ message: `No employee matches ID ${req.body.id}.` });
    }

    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ message: 'Employee ID required' });
    //console.log(req.params.id);

    // need to be done in other places to escape error
    // in case of incorrect ID
    try {
        const employee = await Employee.findOne({ _id: req.params.id }).exec();
        if(!employee) {
            console.log(`No employee matches ID ${req.params.id}.`);
            return res.status(204).json({ message: `No employee matches ID ${req.params.id}.`});
        }
        res.json(employee);
    } catch(err) {
        console.log(err);
        res.status(204).json({ message: `Error happend while searching for entry with ID ${req.params.id}.` });
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}