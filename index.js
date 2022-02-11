var employerContribution = 31.42;
var wellnessAllowance = 5000;
var delayInMonthsForInvoiceToBePaid = 3;
var incomeBaseAmount = 71000;

class Employee {
    constructor(age, startDate, endDate, rate,) {
        this.rate = rate;
        this.age = age;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

var calculatePensionCost = (salary) => {
    // 30% eligable = salary*12 - (incombaseAmount*7,5) / 12 
}

var calculateMonthlyIncome = (debitedHours, rate) => {
    // for each month get debited hours
    debitedHours * rate

    // return income for each month
};

var calculateDebitedHours = (startDate, endDate, employee) => {
    // for each day
        // if its a working day && employee is not sick && employee is not on holiday && employee is not in education
            // add 8h
        
}

var montlyMaximumDebitableHours = (startYear, endYear) => {
    // for each year
        // for each month
            // if is working day add 8

};

var employee1 = new Employee(12, 
    new Date("2022-01-01"), 
    new Date("2022-10-01"),
    800,

    );

console.log(employee1.age + " " + employee1.startDate + " " + employee1.endDate);
