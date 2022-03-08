import React from 'react'; 
import { Role } from '../types/Types'

type SelectorProps = {
  roles: Role[],
}

const Selector = ({ roles }: SelectorProps) => (
<div className='flex'>
    { roles.map((role, i) => (
        <div className='flex-1 border' key={role.roleName}>{role.roleName}</div>
    ))}
</div>)

export default Selector;