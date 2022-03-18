import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import { getCalculationResults } from '../services/calculationService';
import getRoles from '../services/rolesService';
import Selector, { SelectorItem } from '../components/Selector';
import { Role } from '../types/Types';

const Home: NextPage = () => {
  const [calculationResult, setCalculationResult] = useState(getCalculationResults(600));
  const [roles, setRoles] = useState(getRoles);
  const [selectedRole, setSelectedRole] = useState(roles[0])

  useEffect(() => {
    setCalculationResult(getCalculationResults(selectedRole.rate));
  }, [selectedRole]);

  const getSelectableItem = (r: Role) => {
    return {
      id: r.roleName,
      displayText: r.roleName
    }
  }

  const setSelectedItem = (item: SelectorItem) => {
    let role = roles.find((r) => r.roleName == item.id)

    if (role == undefined) {
      console.log("no such item");
    }
    else {
      setSelectedRole(role);
    }
  }

  return (
    <div className='m-3'>
      <Head>
        <title>Shiftkey Offer Example</title>
        <meta name="description" content="Example of employee offer at shiftkey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <div className='flex items-center'>
          <Image
            src="https://via.placeholder.com/88"
            alt="logo"
            width="52"
            height="52"
          />
          <div className='flex-1 p-2'>
            <h2 className='text-4xl'>Shiftkey Offer</h2>
          </div>
        </div>
        <div>
          <Selector selectableItems={roles.map(getSelectableItem)} selectedItem={{ id: selectedRole.roleName, displayText: selectedRole.roleName }} setSelectedItem={setSelectedItem} />
          <div className='border h-12 flex items-center px-2'>
            <span>{selectedRole.description}</span>
          </div>
          <div className='flex flex-col shadow border-2'>
            <div className='flex'>
              <div className='flex flex-wrap flex-1 border border-gray-300'>
                <h2 className='text-center basis-full'>Mentor</h2>
                <div className='flex justify-center basis-full'>
                  <div className='w-28 sm:w-28 md:w-40 lg:w-52 xl:w-64 2xl:w-72'>
                    <Image
                      layout='responsive'
                      src="https://via.placeholder.com/100"
                      alt="mentor image"
                      width="100"
                      height="100"
                    />
                  </div>
                </div>
                <h2 className='basis-full text-center'>Mentor Mentorsson</h2>
              </div>
              <div className='flex-1 border border-gray-300'>
                <h2>Academy</h2>
              </div>
            </div>
            <div className='flex'>
              <h2 className='flex-1 text-xl'>Base Salary:</h2>
              <h2 className='flex-1 text-xl'>{calculationResult.baseSalary} SEK/Month</h2>
            </div>
            <div className='flex'>
              <h2 className='flex-1 text-xl'>Salary Incl. Bonus:</h2>
              <h2 className='flex-1 text-xl'>{calculationResult.salaryInclBonus} SEK/Month</h2>
            </div>
            <div className='flex'>
              <h2 className='flex-1 text-xl'>Pension</h2>
              <h2 className='flex-1 text-xl'>{calculationResult.pension} SEK/Month</h2>
            </div>
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default Home
