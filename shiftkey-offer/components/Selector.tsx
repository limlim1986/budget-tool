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

  return (<div className='flex'>
    <div>{JSON.stringify(selectedRole)}</div>
    {roles.map((role, i) => (
      <button onClick={({ currentTarget }) => setRole(currentTarget)}
        className='flex-1 border'
        key={role.roleName}
        id={role.roleName}>{role.roleName}
      </button>
    ))}
  </div>)
}

export default Selector;