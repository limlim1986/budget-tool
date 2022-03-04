import _ from "lodash";

const calculatePensionCostPerMonth = (salary: number) => {
    const incomeBaseAmount = 71000;
    var monthlySalaryBreakpoint = (incomeBaseAmount * 7.5) / 12;

    var pension = 0;
    if (salary > monthlySalaryBreakpoint) {
        pension = (salary - monthlySalaryBreakpoint) * 0.3
    }

    pension += salary * 0.045;
    return Math.floor(pension/100)*100;
}

const getTotalIncome = (debitedHours: number, rate: number) => {
    return debitedHours * rate;
};

const getDatesBetween = (startDate: string | number | Date, endDate: number | Date) => {
    let dates = [];
    let loop = new Date(startDate);
    while (loop <= endDate) {
        dates.push(loop);

        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }

    return dates;
}

const debitableHoursPerDay = (startDate: Date, endDate: Date) => {
    let debitableHoursPerDay: { Day: Date; Hours: number; Month: number; Year: number; }[] = [];
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

const maximumDebitableHoursGrouped = (debitableHoursPerDay: any[], groupedBy: string) => {
    var groupedByMonth = _(debitableHoursPerDay)
        .groupBy(groupedBy)
        .map((item: any, timeFrame: any) => ({
            timeFrame: timeFrame,
            totalHours: _.sumBy(item, "Hours")
        }))
        .value();

    return groupedByMonth;
}

const defaultHolidays = () => {
    let defaultHolidays = [];
    defaultHolidays.push(...getDatesBetween(new Date(2022, 5, 1), new Date(2022, 6, 16)));
    defaultHolidays.push(...getDatesBetween(new Date(2022, 11, 15), new Date(2022, 11, 31)));
    return defaultHolidays;
};

const defaultBenchTime = () => {
    let defaultBenchTime = [];
    defaultBenchTime.push(...getDatesBetween(new Date(2022, 8, 1), new Date(2022, 8, 15)));
    return defaultBenchTime;
};

const defaultSickness = () => {
    let defaultSickness = [];
    defaultSickness.push(...getDatesBetween(new Date(2022, 2, 1), new Date(2022, 2, 6)));
    defaultSickness.push(...getDatesBetween(new Date(2022, 9, 15), new Date(2022, 9, 22)));
    return defaultSickness;
}

const defaultEducation = () => {
    let defaultEducation = [];
    defaultEducation.push(...getDatesBetween(new Date(2022, 1, 15), new Date(2022, 1, 17)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 3, 15), new Date(2022, 3, 16)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 4, 15), new Date(2022, 4, 16)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 9, 15), new Date(2022, 9, 16)));
    defaultEducation.push(...getDatesBetween(new Date(2022, 10, 14), new Date(2022, 9, 16)));
    return defaultEducation;
}

let dhpd = debitableHoursPerDay(new Date(2022, 0, 1), new Date(2022, 11, 31));

const containsDate = (arrayOfDates: any[], item: Date) => {
    return arrayOfDates.some((date: Date) =>
        date.getDate() === item.getDate()
        && date.getMonth() === item.getMonth()
        && date.getFullYear() === item.getFullYear())
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

let yearly = maximumDebitableHoursGrouped(debitableHoursPerDayRemoveNonWorkingDays, "Year");

let getFixedCosts = () => {
    let fixedCosts = [];
    fixedCosts.push(
        { name: "WellnessAllowance", amount: 5000 },
        { name: "ComputerAndPhone", amount: 30000 }, 
        { name: "Education", amount: 30000 },
        { name: "Conferences", amount: 20000 },
        { name: "SoftwareAndLicences", amount: 10000 },
        { name: "Bookkeeping", amount: 5000 },
        { name: "AWandParties", amount: 5000 },
        { name: "Office", amount: 5000 }
    );

    return fixedCosts;
}

let roundToThousands = (number: number) => {
    return Math.round(number / 1000)*1000;
};

let deductFixedCosts = (number: number, fixedCosts: any) => {
    return number - _.sumBy(fixedCosts, 'amount');
};

let deductCompanyMargin = (number: number, companyMarginPercentage: number) => {
    return Math.floor(number * (1 - (companyMarginPercentage/100)) / 1); 
};

let deductTaxesAndPension = (number: number, employeerContributionPercentage: number, pensionPercentage: number) => {
    return number / (1+(employeerContributionPercentage/100)+(pensionPercentage/100));
};
let deductBonusPercentage = (number: number, bonusPercentage: number) => {
    return (number / ((1 + (bonusPercentage/100)) * 100)) * 100;
};

let getBaseSalary = (employeerContributionPercentage: number, pensionPercentage: number, rate: number, debitedHours: any, companyMarginPercentage: number, bonusPercentage: number) => {
    let income = getTotalIncome(debitedHours, rate);
    let incomeAfterMarginPerMonth = deductCompanyMargin(income, companyMarginPercentage) / 12;
    let leftForSalary = deductTaxesAndPension(incomeAfterMarginPerMonth, employeerContributionPercentage, pensionPercentage);
    let salaryExcludingBonus = deductBonusPercentage(leftForSalary, bonusPercentage);

    return roundToThousands(salaryExcludingBonus)
};

let getSalaryIncludingBonus = (baseSalary: number, bonusPercentage: number) => {
    let salaryInclBonus = baseSalary + (baseSalary * (bonusPercentage/100));
    return roundToThousands(salaryInclBonus);
};

let rolesAndRates = [
    { role: "straighFromSchool", rate: 600 },
    { role: "junior 1-2 years", rate: 700 },
    { role: "medium 3-5 years", rate: 800 },
    { role: "senior 6-8 years", rate: 900 },
    { role: "expert 8+ years", rate: 1150 },
];

const employerContributionPercentage = 31.42;
const pensionPercentage = 7.5;
const companyMarginPercentage = 22;
const bonusPercentage = 12;

rolesAndRates.forEach((item) => {
    let baseSalary = getBaseSalary(employerContributionPercentage, pensionPercentage, item.rate, yearly[0].totalHours, companyMarginPercentage, bonusPercentage);
    let salaryInclBonus = getSalaryIncludingBonus(baseSalary, bonusPercentage);
    console.log("/////////////////////  Role: " + item.role + " /////////////////////////////");
    console.log("Rate: " + item.rate + "kr/h");
    console.log("Base Salary: " + baseSalary);
    console.log("Salary with bonus " + bonusPercentage + "% : " + salaryInclBonus);
    console.log("pension: " + calculatePensionCostPerMonth(salaryInclBonus));
    console.log("///////////////////////////////////////////////////////////////////////////");
    console.log("");
});

export const getInfo = () => {
    const info: { baseSalary: number; salaryInclBonus: number; pension: number; }[] = [];
    rolesAndRates.forEach((item) => {
        let baseSalary = getBaseSalary(employerContributionPercentage, pensionPercentage, item.rate, yearly[0].totalHours, companyMarginPercentage, bonusPercentage);
        let salaryInclBonus = getSalaryIncludingBonus(baseSalary, bonusPercentage);
        let pension = calculatePensionCostPerMonth(salaryInclBonus);

        info.push({
            baseSalary,
            salaryInclBonus,
            pension
        });
    });

    return info;
}