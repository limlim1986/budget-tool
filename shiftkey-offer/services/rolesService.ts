import { Role } from "../types/Types";

const getRoles: Role[] = [
    { roleName: "fromSchool", description: "Straigh from the school bench", rate: 600 },
    { roleName: "junior", description: "1-2 years of relevant working experience", rate: 700 },
    { roleName: "medior", description: "3-5 years of relevant working experience", rate: 800 },
    { roleName: "senior", description: "6-8 years of relevant working experience", rate: 900 },
    { roleName: "expert", description: "8+ years of relevant working experience", rate: 1000 },
];

export default getRoles;