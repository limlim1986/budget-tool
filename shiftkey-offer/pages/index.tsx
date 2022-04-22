import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getCalculationResults } from '../services/calculationService';
import getRoles from '../services/rolesService';
import Selector, { SelectorItem } from '../components/Selector';
import { Role } from '../types/Types';
import { IoIosArrowDown } from 'react-icons/io';

const Home: NextPage = () => {
  const [calculationResult, setCalculationResult] = useState(
    getCalculationResults(600)
  );
  const [roles, setRoles] = useState(getRoles);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  useEffect(() => {
    let calculation = getCalculationResults(selectedRole.rate);
    setCalculationResult(calculation);
  }, [selectedRole]);

  const getSelectableItem = (r: Role) => {
    return {
      id: r.roleName,
      displayText: r.roleName,
    };
  };

  const setSelectedItem = (item: SelectorItem) => {
    let role = roles.find((r) => r.roleName == item.id);

    if (role == undefined) {
      console.log('no such item');
    } else {
      setSelectedRole(role);
    }
  };

  return (
    <div className="m-3">
      <Head>
        <title>Shiftkey Offer Example</title>
        <meta
          name="description"
          content="Example of employee offer at shiftkey"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-screen-xl">
        <div className="flex items-center">
          <Image
            src="https://via.placeholder.com/88"
            alt="logo"
            width="52"
            height="52"
          />
          <div className="flex-1 p-2 my-4">
            <h2 className="text-4xl">Shiftkey Offer</h2>
          </div>
        </div>
        <div>
          <Selector
            selectableItems={roles.map(getSelectableItem)}
            selectedItem={{
              id: selectedRole.roleName,
              displayText: selectedRole.roleName,
            }}
            setSelectedItem={setSelectedItem}
          />
          <div className="flex mt-2 p-4 items-center">
            <span className="basis-full overflow-hidden">
              {selectedRole.description}
            </span>
          </div>
          <div className="flex gap-6 flex-wrap flex-row justify-center">
            <div className="flex basis-[400px] md:basis-[360px] shadow-md rounded-md overflow-hidden">
              <div className="flex flex-wrap flex-1">
                <div className="flex justify-center basis-full">
                  <div className="w-full">
                    <Image
                      layout="responsive"
                      src="https://via.placeholder.com/384x160"
                      alt="mentor image"
                      width="384"
                      height="160"
                    />
                  </div>
                </div>
                <div className="flex items-center p-4 flex-wrap flex-col w-full">
                  <h2 className="text-2xl w-full">Mentor</h2>
                  <span className="w-full mt-2">
                    some tagline for this mentor describing something
                  </span>
                  <div className="flex mt-4 justify-center items-center self-end w-12 h-12 hover:bg-gray-200 rounded-full">
                    <IoIosArrowDown
                      style={{ color: 'grey', fontSize: '24px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-[400px] md:basis-[360px] shadow-md rounded-md overflow-hidden p-4">
              <h2 className="text-2xl w-full">Compensation</h2>
              <div className="flex mt-2">
                <h2 className="flex-1 text-xl">Base Salary:</h2>
                <h2 className="flex-1 text-xl">
                  {calculationResult.baseSalary} SEK/Month
                </h2>
              </div>
              <div className="flex mt-2">
                <h2 className="flex-1 text-xl">Salary Incl. Bonus:</h2>
                <h2 className="flex-1 text-xl">
                  {calculationResult.salaryInclBonus} SEK/Month
                </h2>
              </div>
              <div className="flex mt-2">
                <h2 className="flex-1 text-xl">Pension</h2>
                <h2 className="flex-1 text-xl">
                  {calculationResult.pension} SEK/Month
                </h2>
              </div>
            </div>
            <div className="flex basis-[400px] md:basis-[360px] shadow-md rounded-md overflow-hidden flex-col p-4">
              <h2 className="text-2xl w-full">Academy</h2>
              <ul className="mt-2 p-2 list-disc">
                <li>Digital learning tools</li>
                <li>Workshops and seminars</li>
                <li>Open source projects and blogging</li>
              </ul>
              <div className="flex mt-4 justify-center items-center self-end w-12 h-12 hover:bg-gray-200 rounded-full">
                <IoIosArrowDown style={{ color: 'grey', fontSize: '24px' }} />
              </div>
            </div>
            <div className="flex basis-[400px] md:basis-[360px] shadow-md rounded-md overflow-hidden flex-col p-4">
              <h2 className="text-2xl w-full">Mentorship</h2>
              <ul className="mt-2 p-2 list-disc">
                <li>Create a development plan and concrete goals</li>
                <li>Close at hand sounding board</li>
                <li>Guidance and support in assignments</li>
              </ul>
              <div className="flex mt-4 justify-center items-center self-end w-12 h-12 hover:bg-gray-200 rounded-full">
                <IoIosArrowDown style={{ color: 'grey', fontSize: '24px' }} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
