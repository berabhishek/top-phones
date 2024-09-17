import React, { useState } from 'react';
import Head from 'next/head';
import phonesData from '../constants/smartprice.json';

const PhoneCard = ({ phone, rank }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-[278px] h-[278px] flex-shrink-0 md:mr-4 mb-4 md:mb-0">
          <img 
            src={phone.imageUrl} 
            alt={phone.productName} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-grow w-full">
          <div className="flex justify-between items-start">
            <div>
            <span className="text-2xl font-bold">{phone.price}</span>
              <h2 className="text-xl font-bold">{phone.productName}</h2>
            </div>
          </div>
          <div className="mt-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Release: {phone.releaseDate}</span>
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {phone.specifications.slice(0, 6).map((spec, index) => (
              <div key={index} className="text-sm">• {spec}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
      </div>
    </div>
  );
export default function SmartPhones() {
    const priceRanges = Object.keys(phonesData).sort((a, b) => parseInt(a) - parseInt(b));
    const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  
    const topPhones = phonesData[selectedPrice].slice(0, 10);
    
    const handlePriceChange = (e) => {
      setSelectedPrice(e.target.value);
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Top 10 Phones</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Top Phones under ₹{selectedPrice}</h1>
            <select 
              value={selectedPrice} 
              onChange={handlePriceChange}
              className="p-2 border rounded-md"
            >
              {priceRanges.map((price) => (
                <option key={price} value={price}>
                  Under ₹{price}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-6">
            {topPhones.map((phone, index) => {
              return (
              <PhoneCard key={index} phone={phone} rank={index + 1} />)
            })}
          </div>
        </main>
      </div>
    );
  }