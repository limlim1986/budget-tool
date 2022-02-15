const _ = require("lodash");

var employerContribution = 31.42;
var wellnessAllowance = 5000;
var delayInMonthsForInvoiceToBePaid = 3;
var incomeBaseAmount = 71000;
var incomeTaxPercentage = 30;
var employeOfficeSuppliesPerYear = 30000;

class Employee {
    constructor(age,
        startDate,
        endDate,
        rate,
        expectedDebitedPercentage,
        bonusPercentages,
        recruitmentCost,
        salary) {
        this.salary = salary;
        this.recruitmentCost = recruitmentCost;
        this.bonusPercentages = bonusPercentages;
        this.expectedDebitedPercentage = expectedDebitedPercentage;
        this.rate = rate;
        this.age = age;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

var calculatePensionCostPerMonth = (salary) => {
    var monthlySalaryBreakpoint = (incomeBaseAmount * 7.5) / 12;

    var pension = 0;
    if (salary > monthlySalaryBreakpoint) {
        pension = (salary - monthlySalaryBreakpoint) * 0.3
    }

    pension += salary * 0.045;
    return pension;
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

var getDatesBetween = (startDate, endDate) => {
    let dates = [];
    let loop = new Date(startDate);
    while (loop <= endDate) {
        dates.push(loop);

        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }

    return dates;
}

var montlyMaximumDebitableHours = (startDate, endDate) => {
    let loop = new Date(startDate);
    let debitableHoursPerDay = [];

    while (loop <= endDate) {
        var dayOfWeek = loop.getDay();
        var isWeekend = (dayOfWeek === 5) || (dayOfWeek === 6);

        debitableHoursPerDay.push({
            Day: loop,
            Hours: isWeekend ? 0 : 8,
            Month: loop.getMonth() + 1
        });

        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }

    var groupedByMonth = _(debitableHoursPerDay)
        .groupBy("Month")
        .map((item, Month) => ({
            month: Month,
            totalHours: _.sumBy(item, "Hours")
        }))
        .value();

    return groupedByMonth;
};

var employee1 = new Employee(12,
    new Date("2022-01-01",),
    new Date("2022-10-01"),
    800,
    90,
    12,
    0,
    60000
);

var pension = calculatePensionCostPerMonth(employee1.salary);

let monthlyMaximumDebitableHours = montlyMaximumDebitableHours(new Date(2022, 0, 1), new Date(2022, 11, 31));

let defaultHolidays = () => {

    let dates = getDatesBetween(new Date(2022, 5, 1), new Date(2022, 6, 16));
    dates.push(...getDatesBetween(new Date(2022, 11, 15), new Date(2022, 11, 31)));

    return dates;
};

console.log(defaultHolidays());