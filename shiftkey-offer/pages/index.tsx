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
      <main className='max-w-screen-xl'>
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
          <div className='h-16 flex items-center'>
            <span className='basis-full'>{selectedRole.description}</span>
          </div>
          <div className='flex gap-4 flex-wrap flex-row'>
            <div className='flex w-96 my-4 shadow-md rounded-md overflow-hidden'>
              <div className='flex flex-wrap flex-1'>
                <div className='flex justify-center basis-full'>
                  <div className='w-full'>
                    <Image
                      layout='responsive'
                      src="https://via.placeholder.com/384x160"
                      alt="mentor image"
                      width="384"
                      height="160"
                    />
                  </div>
                </div>
                <div className='flex justify-center m-4 flex-wrap'>
                  <h2 className='text-2xl w-full'>Mentor</h2>
                  <span className='w-full'>some tagline for this mentor describing something</span>
                  <div className='w-24 text-center'>I</div>
                </div>
              </div>
            </div>
            <div className='flex-1 my-4 border-black shadow-md rounded'>
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
            <div className='flex-1 my-4 border-black shadow-md rounded'>
              <h2 className='basis-full'>Academy description</h2>
              <div className='basis-full'>
                <ul>
                  <li>ups 1</li>
                  <li>usp 2</li>
                  <li>usp 3</li>
                </ul>
              </div>
            </div>
            <div className='flex-1 my-4 border-black shadow-md rounded'>
              <h2>Mentorship description</h2>
              <ul>
                <li>ups 1</li>
                <li>usp 2</li>
                <li>usp 3</li>
              </ul>
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
