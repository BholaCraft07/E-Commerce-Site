// /pages/about.js
'use client'
import Image from 'next/image'
import Link from 'next/link'

const Contact = () => {
  return (
    <div className="container mx-auto py-16 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Contact us <span className="text-indigo-600">Us</span></h1>
        <p className="text-gray-600 mt-4 text-lg">We are dedicated to bringing you the best shopping experience.</p>
      </div>

      <div className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="lg:mb-0 mb-10">

              <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                <h2 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">Send Us A Message</h2>
                <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Name" />
                <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Email" />
                <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Phone" />
                <div className="mb-10">
                  <h4 className="text-gray-500 text-lg font-normal leading-7 mb-4">Preferred method of communication</h4>
                  <div className="flex">
                    <div className="flex items-center mr-11">
                      <input id="radio-group-1" type="radio" name="radio-group" className="hidden checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" />
                      <label htmlFor="radio-group-1" className="flex items-center cursor-pointer text-gray-500 text-base font-normal leading-6">
                        <span className="border border-gray-300 rounded-full mr-2 w-4 h-4 ml-2"></span> Email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="radio-group-2" type="radio" name="radio-group" className="hidden checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100" />
                      <label htmlFor="radio-group-2" className="flex items-center cursor-pointer text-gray-500 text-base font-normal leading-6">
                        <span className="border border-gray-300 rounded-full mr-2 w-4 h-4 ml-2"></span> Phone
                      </label>
                    </div>
                  </div>
                </div>
                <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Message" />
                <button className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;