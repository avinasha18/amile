import React from 'react';

const Footer = () => {
  const h1Style = {
    background: 'linear-gradient(to right, #FF00CC, #333399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2rem',
    fontWeight: 'bold',
  };

  return (
    <footer className="font-sans tracking-wide bg-black px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
        <div>
          <a href='javascript:void(0)'>
            <h1 style={h1Style} className='w-44'>AMILE</h1>
          </a>
          <p className='w-44'>Add your quote here</p>
          <ul className="mt-10 flex space-x-5">
            {/* Social media icons */}
            <li className="transition-transform transform hover:scale-110">
              <a href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-300 hover:fill-white w-7 h-7 transition-colors" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
            <li className="transition-transform transform hover:scale-110">
              <a href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-300 hover:fill-white w-7 h-7 transition-colors" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
            <li className="transition-transform transform hover:scale-110">
              <a href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-300 hover:fill-white w-7 h-7 transition-colors" viewBox="0 0 24 24">
                  <path d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z" />
                </svg>
              </a>
            </li>
            <li className="transition-transform transform hover:scale-110">
              <a href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-300 hover:fill-white w-7 h-7 transition-colors" viewBox="0 0 24 24">
                  <path d="M22.92 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.83 4.5 17.72 4 16.5 4c-2.42 0-4.38 2.14-4.38 4.76 0 .37.04.72.12 1.07-3.64-.2-6.86-2.04-9.01-4.84-.39.7-.62 1.5-.62 2.36 0 1.63.78 3.07 1.97 3.92-.7-.03-1.37-.22-1.94-.54v.05c0 2.28 1.48 4.18 3.44 4.61-.37.1-.75.14-1.15.14-.28 0-.55-.03-.82-.08.56 1.84 2.17 3.19 4.08 3.22-1.5 1.26-3.38 2-5.43 2-.35 0-.7-.02-1.05-.07 1.94 1.34 4.25 2.13 6.74 2.13 8.08 0 12.51-7.1 12.51-13.25 0-.2-.01-.4-.02-.61.85-.66 1.58-1.48 2.16-2.41Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* About Us section */}
        <div>
          <h2 className="text-gray-300 text-lg font-bold">About Us</h2>
          <ul className="mt-4 space-y-4 text-gray-400">
            <li>
              <a href="javascript:void(0)">About Us</a>
            </li>
            <li>
              <a href="javascript:void(0)">Careers</a>
            </li>
            <li>
              <a href="javascript:void(0)">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Quick Links section */}
        <div>
          <h2 className="text-gray-300 text-lg font-bold">Quick Links</h2>
          <ul className="mt-4 space-y-4 text-gray-400">
            <li>
              <a href="javascript:void(0)">Privacy Policy</a>
            </li>
            <li>
              <a href="javascript:void(0)">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Support section */}
        <div>
          <h2 className="text-gray-300 text-lg font-bold">Support</h2>
          <ul className="mt-4 space-y-4 text-gray-400">
            <li>
              <a href="javascript:void(0)">FAQs</a>
            </li>
            <li>
              <a href="javascript:void(0)">Help Center</a>
            </li>
          </ul>
        </div>

        {/* Newsletter section */}
        <div>
          <h2 className="text-gray-300 text-lg font-bold">Newsletter</h2>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-2 rounded bg-gray-800 text-gray-200 focus:outline-none"
            />
            <button className="mt-4 w-full py-2 px-4 rounded bg-pink-500 hover:bg-pink-600 text-white font-bold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500">
        <p>&copy; 2024 AMILE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;