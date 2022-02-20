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
    return debitedHours * rate
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

var debitableHoursPerDay = (startDate, endDate) => {
    let debitableHoursPerDay = [];
    var dates = getDatesBetween(startDate, endDate);

    dates.forEach(date => {
        var dayOfWeek = date.getDay();
        var isWeekend = (dayOfWeek === 5) || (dayOfWeek === 6);

        debitableHoursPerDay.push({
            Day: date,
            Hours: isWeekend ? 0 : 8,
            Month: date.getMonth() + 1,
            Year: date.getFullYear()
        });
    });

    return debitableHoursPerDay;
};

var maximumDebitableHoursGrouped = (debitableHoursPerDay, groupedBy) => {
    var groupedByMonth = _(debitableHoursPerDay)
        .groupBy(groupedBy)
        .map((item, timeFrame) => ({
            timeFrame: timeFrame,
            totalHours: _.sumBy(item, "Hours")
        }))
        .value();

    return groupedByMonth;
}

let defaultHolidays = () => {
    let defaultHolidays = [];
    defaultHolidays.push(...getDatesBetween(new Date(2022, 5, 1), new Date(2022, 6, 16)));
    defaultHolidays.push(...getDatesBetween(new Date(2022, 11, 15), new Date(2022, 11, 31)));
    return defaultHolidays;
};

let defaultBenchTime = () => {
    let defaultBenchTime = [];
    //defaultBenchTime.push(...getDatesBetween(new Date(2022, 8, 1), new Date(2022, 8, 15)));
    return defaultBenchTime;
};

let defaultSickness = () => {
    let defaultSickness = [];
    defaultSickness.push(...getDatesBetween(new Date(2022, 2, 1), new Date(2022, 2, 6)));
    defaultSickness.push(...getDatesBetween(new Date(2022, 9, 15), new Date(2022, 9, 22)));
    return defaultSickness;
}

let defaultEducation = () => {
    let defaultEducation = [];
    defaultEducation.push(...getDatesBetween(new Date(2022, 1, 15), new Date(2022, 1, 17)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 3, 15), new Date(2022, 3, 16)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 4, 15), new Date(2022, 4, 16)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 9, 15), new Date(2022, 9, 16)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 10, 14), new Date(2022, 9, 16)));
    return defaultEducation;
}

let dhpd = debitableHoursPerDay(new Date(2022, 0, 1), new Date(2022, 11, 31));

let containsDate = (arrayOfDates, item) => {
    return arrayOfDates.some(date =>
        date.getDate() === item.getDate()
        && date.getMonth() === item.getMonth()
        && date.getYear() === item.getYear())
};

let debitableHoursPerDayWithRemovedHolidays = dhpd.filter((item) => {
    let nonDebitableDays = defaultHolidays().concat(
        defaultSickness(),
        defaultEducation(),
        defaultBenchTime()
    );

    if (containsDate(nonDebitableDays, item.Day)) {
        return false;
    } else {
        return true;
    }
})

var maximumDebitableHoursPerMonth = maximumDebitableHoursGrouped(debitableHoursPerDayWithRemovedHolidays, "Month");
var yearly = maximumDebitableHoursGrouped(debitableHoursPerDayWithRemovedHolidays, "Year");
let employee = new Employee(25, new Date(2022, 1, 1), new Date(2025, 1, 1), 800, 90, [6, 12], 0, 55000);

// how to calculate salary and show what employees get
// list all costs/benefits
// education (fixed)
// office supplies & software licences (fixed)
// salary (calculated based on houerly rate)
// pension (calculated based on salary)
// vacation pay (statement)
// sick pay (statement)

let salary = (employeerContribution, pension, rate, debitedHours, fixedCosts, shiftkeyMargin, bonus) => {
    let income = rate * debitedHours;
    let incomeAfterFixedCosts = income - fixedCosts;
    let incomeAfterMarginPerMonth = (incomeAfterFixedCosts * (1 - shiftkeyMargin)) / 12;
    let leftForSalary = incomeAfterMarginPerMonth / (1 + employeerContribution + pension);
    let onePart = leftForSalary / ((1 + bonus) * 100);
    let salaryExcludingBonus = onePart * 100;
    let salaryIncludingBonus = salaryExcludingBonus + (salaryExcludingBonus * bonus);

    return {
        baseSalary: Math.round(salaryExcludingBonus / 1000) * 1000,
        salaryWithBonus: Math.round(salaryIncludingBonus / 1000) * 1000
    };
};

let rates = [
    { role: "straighFromSchool", rate: 600 },
    { role: "junior", rate: 700 },
    { role: "medium", rate: 800 },
    { role: "senior", rate: 900 },
    { role: "expert", rate: 1000 },
];

let employeerContribution = 0.32;
let pension1 = 0.075;
let shiftkeyMargin = 0.15;
let fixedCosts = 120000;
let bonus = 0.12;

rates.forEach((item) => {
    let salarys = salary(employeerContribution, pension1, item.rate, yearly[0].totalHours, fixedCosts, shiftkeyMargin, bonus);
    console.log("/////////////////////  Role: " + item.role + " /////////////////////////////");
    console.log("Rate: " + item.rate + "kr/h");
    console.log("Base Salary: " + salarys.baseSalary);
    console.log("Salary with bonus " + bonus * 100 + "% : " + salarys.salaryWithBonus);
    console.log("pension: " + calculatePensionCostPerMonth(salarys.baseSalary));
    console.log("///////////////////////////////////////////////////////////////////////////");
    console.log("");
});
