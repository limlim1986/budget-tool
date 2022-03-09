import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';
import { getCalculationResults } from '../services/calculationService';
import getRoles from '../services/rolesService';
import Selector from '../components/Selector';

const Home: NextPage = () => {
  const [calculationResult, setCalculationResult] = useState(getCalculationResults(600));
  const [roles, setRoles] = useState(getRoles);
  const [selectedRole, setSelectedRole] = useState(roles[0]) 

  return (
    <div className='container mx-auto'>
      <Head>
        <title>Shiftkey Offer Example</title>
        <meta name="description" content="Example of employee offer at shiftkey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Selector roles={roles} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
        <div>{JSON.stringify(roles)}</div>
        <div className='grid grid-cols-12'>
            <div className='shadow px-4 py-8 border mx-4 my-4 col-span-6 sm:col-span-4 md:col-span-2 overflow-hidden'>
              <div>{calculationResult.baseSalary}</div>
              <div>{calculationResult.salaryInclBonus}</div>
              <div>{calculationResult.pension}</div>
              <div>{calculationResult.shiftkeyShare}</div>
              <div>{calculationResult.shiftkeyShare / calculationResult.totalDebited}</div>
            </div>
        </div>
      </main>
      <footer>
        <a
          href="https://shiftkey.se"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home