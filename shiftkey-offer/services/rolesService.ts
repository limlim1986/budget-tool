import { Role } from '../types/Types';

// Roles and their estimated hourly rates
const getRoles: Role[] = [
  {
    roleName: 'fromSchool',
    description:
      'Straigh from the school bench Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis eleifend libero. Sed sit amet feugiat turpis. In tincidunt justo ac tristique volutpat. Cras tempor, diam quis pellentesque auctor, est diam maximus leo, quis imperdiet tortor nunc in leo.',
    rate: 600,
  },
  {
    roleName: 'junior',
    description:
      '1-2 years of relevant working experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis eleifend libero. Sed sit amet feugiat turpis. In tincidunt justo ac tristique volutpat. Cras tempor, diam quis pellentesque auctor, est diam maximus leo, quis imperdiet tortor nunc in leo.',
    rate: 700,
  },
  {
    roleName: 'medior',
    description:
      '3-5 years of relevant working experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis eleifend libero. Sed sit amet feugiat turpis. In tincidunt justo ac tristique volutpat. Cras tempor, diam quis pellentesque auctor, est diam maximus leo, quis imperdiet tortor nunc in leo. ',
    rate: 800,
  },
  {
    roleName: 'senior',
    description:
      '6-8 years of relevant working experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis eleifend libero. Sed sit amet feugiat turpis. In tincidunt justo ac tristique volutpat. Cras tempor, diam quis pellentesque auctor, est diam maximus leo, quis imperdiet tortor nunc in leo.',
    rate: 900,
  },
  {
    roleName: 'expert',
    description:
      '8+ years of relevant working experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis eleifend libero. Sed sit amet feugiat turpis. In tincidunt justo ac tristique volutpat. Cras tempor, diam quis pellentesque auctor, est diam maximus leo, quis imperdiet tortor nunc in leo.',
    rate: 1000,
  },
];

export default getRoles;
