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
            Year: date.getYear()
        });
    });

    return debitableHoursPerDay;
};

var maximumDebitableHoursGrouped = (debitableHoursPerDay, groupedBy) => {
    var groupedByMonth = _(debitableHoursPerDay)
        .groupBy(groupedBy)
        .map((item, Month) => ({
            month: Month,
            totalHours: _.sumBy(item, "Hours")
        }))
        .value();

    return groupedByMonth;
}

var pension = calculatePensionCostPerMonth(60000);

let defaultHolidays = () => {
    let defaultHolidays = [];
    defaultHolidays.push(...getDatesBetween(new Date(2022, 5, 1), new Date(2022, 6, 16)));
    defaultHolidays.push(...getDatesBetween(new Date(2022, 11, 15), new Date(2022, 11, 31)));
    return defaultHolidays;
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
    return defaultEducation;
}

var dhpd = debitableHoursPerDay(new Date(2022, 0, 1), new Date(2022, 11, 31));

let containsDate = (arrayOfDates, item) => {
    return arrayOfDates.some(date => 
        date.getDate() === item.getDate() 
        && date.getMonth() === item.getMonth()
        && date.getYear() === item.getYear()) 
};

var debitableHoursPerDayWithRemovedHolidays = dhpd.filter((item) => {
    let nonDebitableDays = defaultHolidays().concat(defaultSickness(), defaultEducation());
    
    if(containsDate(nonDebitableDays, item.Day)){
        return false;
    }else{
        return true;
    }
})

var maximumDebitableHoursPerMonth = maximumDebitableHoursGrouped(debitableHoursPerDayWithRemovedHolidays, "Month");
var yearly = maximumDebitableHoursGrouped(debitableHoursPerDayWithRemovedHolidays, "Year");
let employee = new Employee(25, new Date(2022, 1, 1), new Date(2025, 1, 1), 800, 90, [6,12], 0, 55000); 

// // income from employee
// console.log("////////////////// Income ///////////////////");
// maximumDebitableHoursPerMonth.forEach((item) =>{
//     console.log("Monthly income: " + calculateMonthlyIncome(item.totalHours, employee.salary));
// });
// console.log("////////////////////////////////////////////");

// console.log("");

// // costs for employee
// console.log("////////////////// Costs ///////////////////");
// console.log(calculatePensionCostPerMonth(employee.salary))
// console.log("////////////////////////////////////////////");


// how to calculate 