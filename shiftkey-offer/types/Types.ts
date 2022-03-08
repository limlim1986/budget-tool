export type Role = {
    roleName: string;
    description: string;
    rate: number;
};

export type FixedCost = {
    name: string;
    amount: number;
};

export type CalculationResult = {
    baseSalary: number;
    salaryInclBonus: number;
    pension: number;
    fixedCosts: FixedCost[];
    shiftkeyShare: number;
    totalDebited: number;
};