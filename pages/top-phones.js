import React, { useState } from 'react';
import Head from 'next/head';
import phonesData from '../constants/phones.json';

const PhoneCard = ({ phone, rank }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex items-start">
      <div className="w-1/4 pr-4">
        <img src={phone.image_url} alt={phone.title} className="w-full" />
      </div>
      <div className="w-3/4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-gray-500 font-semibold">{rank.toString().padStart(2, '0')}</span>
            <h2 className="text-xl font-bold">{phone.title}</h2>
            <p className="text-sm text-gray-600">{phone.brand}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{phone.product_score}</div>
            <div className="text-sm text-blue-600">Exceptional</div>
          </div>
        </div>
        <div className="mt-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{phone.discount}</span>
        </div>
        <ul className="mt-2 text-sm">
          {phone.features.map((feature, index) => (
            <li key={index} className="mb-1">• {feature}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-4 flex justify-between items-center">
      <div>
        <span className="text-2xl font-bold">{phone.price}</span>
        <span className="text-sm text-gray-500 line-through ml-2">{phone.original_price}</span>
        <span className="text-sm text-red-500 ml-2">{phone.discount}</span>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        View Deal
      </button>
    </div>
  </div>
);

export default function TopPhones() {
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
            <h1 className="text-3xl font-bold">Top 10 Phones under ₹{selectedPrice}</h1>
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
            {topPhones.map((phone, index) => (
              <PhoneCard key={index} phone={phone} rank={index + 1} />
            ))}
          </div>
        </main>
      </div>
    );
  }