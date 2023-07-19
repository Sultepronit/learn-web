const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const lei = data.employees.length - 1;
    const newEmployee = {
        id: lei < 0 ? 1 : data.employees[lei].id + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    if(!newEmployee.firstName || !newEmployee.lastName) {
        return res.status(400).json({message: 'First and last names are required!'});
    }

    data.setEmployees([...data.employees, newEmployee]);

    // here we can save results

    res.status(201).json(data.employees);
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