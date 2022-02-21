const _ = require("lodash");

var calculatePensionCostPerMonth = (salary) => {
    const incomeBaseAmount = 71000;
    var monthlySalaryBreakpoint = (incomeBaseAmount * 7.5) / 12;

    var pension = 0;
    if (salary > monthlySalaryBreakpoint) {
        pension = (salary - monthlySalaryBreakpoint) * 0.3
    }

    pension += salary * 0.045;
    return pension;
}

var getTotalIncome = (debitedHours, rate) => {
    return debitedHours * rate;
};

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
    defaultBenchTime.push(...getDatesBetween(new Date(2022, 8, 1), new Date(2022, 8, 15)));
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

let debitableHoursPerDayRemoveNonWorkingDays = dhpd.filter((item) => {
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

var yearly = maximumDebitableHoursGrouped(debitableHoursPerDayRemoveNonWorkingDays, "Year");

// how to calculate salary and show what employees get
// list all costs/benefits
// education (fixed)
// office supplies & software licences (fixed)
// salary (calculated based on houerly rate)
// pension (calculated based on salary)
// vacation pay (statement)
// sick pay (statement)

let getFixedCosts = () => {
    let fixedCosts = [];
    fixedCosts.push(
        { name: "WellnessAllowance", amount: 5000 },
        { name: "ComputerAndPhone", amount: 30000 }, 
        { name: "Education", amount: 20000 },
        { name: "Conferences", amount: 20000 },
        { name: "SoftwareAndLicences", amount: 10000 },
        { name: "Bookkeeping", amount: 5000 },
        { name: "AWandParties", amount: 5000 },
        { name: "Office", amount: 5000 }
    );

    return fixedCosts;
}

let roundToThousands = (number) => {
    return Math.round(number / 1000)*1000;
};

let deductFixedCosts = (number, fixedCosts) => {
    return number - _.sumBy(fixedCosts, 'amount');
};

let deductCompanyMargin = (number, companyMarginPercentage) => {
    return Math.floor(number * (1 - (companyMarginPercentage/100)) / 1); 
};

let deductTaxesAndPension = (number, employeerContributionPercentage, pensionPercentage) => {
    return number / (1+(employeerContributionPercentage/100)+(pensionPercentage/100));
};
let deductBonusPercentage = (number, bonusPercentage) => {
    return (number / ((1 + (bonusPercentage/100)) * 100)) * 100;
};

let getBaseSalary = (employeerContributionPercentage, pensionPercentage, rate, debitedHours, fixedCosts, companyMarginPercentage, bonusPercentage) => {
    let income = getTotalIncome(debitedHours, rate);
    let incomeAfterFixedCosts = deductFixedCosts(income, fixedCosts)
    let incomeAfterMarginPerMonth = deductCompanyMargin(incomeAfterFixedCosts, companyMarginPercentage) / 12;
    let leftForSalary = deductTaxesAndPension(incomeAfterMarginPerMonth, employeerContributionPercentage, pensionPercentage);
    let salaryExcludingBonus = deductBonusPercentage(leftForSalary, bonusPercentage);

    return roundToThousands(salaryExcludingBonus)
};

let getSalaryIncludingBonus = (baseSalary, bonusPercentage) => {
    let salaryInclBonus = baseSalary + (baseSalary * (bonusPercentage/100));
    return roundToThousands(salaryInclBonus);
};

let rolesAndRates = [
    { role: "straighFromSchool", rate: 600 },
    { role: "junior", rate: 700 },
    { role: "medium", rate: 800 },
    { role: "senior", rate: 900 },
    { role: "expert", rate: 1000 },
];

const employerContributionPercentage = 31.42;
const pensionPercentage = 7.5;
const companyMarginPercentage = 12;
const bonusPercentage = 12;

rolesAndRates.forEach((item) => {
    let baseSalary = getBaseSalary(employerContributionPercentage, pensionPercentage, item.rate, yearly[0].totalHours, getFixedCosts(), companyMarginPercentage, bonusPercentage);
    let salaryInclBonus = getSalaryIncludingBonus(baseSalary, bonusPercentage);
    console.log("/////////////////////  Role: " + item.role + " /////////////////////////////");
    console.log("Rate: " + item.rate + "kr/h");
    console.log("Base Salary: " + baseSalary);
    console.log("Salary with bonus " + bonusPercentage + "% : " + salaryInclBonus);
    console.log("pension: " + Math.floor(calculatePensionCostPerMonth(salaryInclBonus)/100)*100);
    console.log("///////////////////////////////////////////////////////////////////////////");
    console.log("");
});
