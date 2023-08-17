const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.Find();
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

const updateEmployee = (req, res) => {
    if(!req.body.id || !(req.body.firstName || req.body.lastName)) {
        return res.status(400).json({ messgae: 'Wrong input!' });
    }
    const nl = [...data.employees];
    for(let i = 0; i <= nl.length; i++) {
        if(i === nl.length) {
            return res.status(400).json({ message: `Employee ID ${req.body.id} not found!` });
        }
        if(nl[i].id === parseInt(req.body.id)) {
            if(req.body.firstName) nl[i].firstName = req.body.firstName;
            if(req.body.lastName) nl[i].lastName = req.body.lastName;
            break;
        }
    }
    data.setEmployees(nl);
    res.status(201).json(data.employees);
}

const deleteEmployee = (req, res) => {
    if(!req.body.id) return res.status(400).json({ message: 'Wrong input!' });
    const nl = [...data.employees];
    for(let i = 0; i <= nl.length; i++) {
        if(i === nl.length) {
            return res.status(400).json({ message: `Employee ID ${req.body.id} not found!` });
        }
        if(nl[i].id === parseInt(req.body.id)) {
            nl.splice(i, 1);
            break;
        }
    }
    data.setEmployees(nl);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    if(!req.params.id) return res.status(400).json({ message: 'Wrong input!' });
    const employee = data.employees.find(e => e.id === parseInt(req.params.id));
    if(!employee) {
        return res.status(400).json({ message: `Employee ID ${req.params.id} not found!` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}