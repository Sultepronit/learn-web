function calculateTeamFinanceReport(salaries, team) {
    const categories = { Team: 0 };

    for(const member of team) {
        const specialization = member.specialization;
        const salary = salaries[specialization];
        if(!salary) continue;
        const tax = Number.parseInt(salary.tax);
        const sum = salary.salary / (100 - tax) * 100;
        categories[specialization] = sum + (categories[specialization] || 0);
        categories.Team += sum;
    }

    const results = {};

    for(let name in categories) {
        results[`TotalBudget${name}`] = Math.floor(categories[name]);
    }
    
    return results;
}