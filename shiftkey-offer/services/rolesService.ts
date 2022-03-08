import { Role } from "../types/Types";

const getRoles: Role[] = [
    { roleName: "fromSchool", description: "Straigh from the school bench", rate: 600 },
    { roleName: "junior", description: "1-2 years of relevant working experience", rate: 725 },
    { roleName: "medior", description: "3-5 years of relevant working experience", rate: 825 },
    { roleName: "senior", description: "6-8 years of relevant working experience", rate: 925 },
    { roleName: "expert 8+ years", description: "8+ years of relevant working experience", rate: 1100 },
];

export default getRoles;