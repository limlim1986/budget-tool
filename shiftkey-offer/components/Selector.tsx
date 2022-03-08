import React from 'react';
import { Role } from '../types/Types'

type SelectorProps = {
  roles: Role[],
  selectedRole: Role,
  setSelectedRole: any
}

const Selector = ({ roles, selectedRole, setSelectedRole }: SelectorProps) => {
  const setRole = (e: HTMLDivElement) => {
    console.log(e.id);
  }

  return (<div className='flex'>
    <div>{JSON.stringify(selectedRole)}</div>
    {roles.map((role, i) => (
      <div onClick={({ currentTarget }) => setRole(currentTarget)} className='flex-1 border' key={role.roleName} id={role.roleName}>{role.roleName}</div>
    ))}
  </div>)
}

export default Selector;