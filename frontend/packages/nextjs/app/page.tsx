// @formatter:off
"use client";

// @formatter:on
import { WalletInfo } from '../components/crypto-utils/WalletInfo';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Scaffold-ETH 2 FORK</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{' '}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/pages/index.tsx
            </code>
          </p>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2">
          <WalletInfo />
        </div>
      </div>
    </>
  );
};

export default Home;