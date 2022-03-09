import React from 'react';
import { Role } from '../types/Types'

type SelectorProps = {
  roles: Role[],
  selectedRole: Role,
  setSelectedRole: any
}

const Selector = ({ roles, selectedRole, setSelectedRole }: SelectorProps) => {
  const setRole = (e: HTMLButtonElement) => {
    var role = roles.find(r => {
      return r.roleName === e.id
    });

    setSelectedRole(role);
  }

  return (<div className='flex flex-col sm:flex-row'>
    {roles.map((role, i) => (

      <button onClick={({ currentTarget }) => setRole(currentTarget)}
        className={`text-center border-blue-300 border-2 text-white rounded-full flex-1 ${selectedRole.roleName === role.roleName ? "bg-blue-800 " : "bg-blue-500"}`}
        key={role.roleName}
        id={role.roleName}>{role.roleName}
      </button>

    ))}
  </div>)
}

export default Selector;