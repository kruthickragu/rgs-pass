import { useState } from 'react';
import html2canvas from 'html2canvas';
import PassForm from './components/PassForm';
import PassCard from './components/PassCard';

function App() {
  const [passData, setPassData] = useState(null);

  const handleGenerate = (data) => {
    setPassData(data);
  };

  const handleDownload = async () => {
    const passElement = document.getElementById('visitor-pass');
    if (!passElement) return;

    try {
      const canvas = await html2canvas(passElement, {
        scale: 3,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `RGShireworld_Pass_${passData.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating pass:', error);
      alert('Failed to download pass. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-6 sm:py-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <img src="/logo.png" alt="RGShireworld" className="h-12 sm:h-16 w-auto drop-shadow-2xl" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            RGShireworld
          </h1>
        </div>
        <p className="text-gray-300 text-base sm:text-lg font-medium">
          Professional Visitor Pass Management System
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Form Section */}
          <div className="flex justify-center order-2 lg:order-1">
            <PassForm onGenerate={handleGenerate} />
          </div>

          {/* Pass Preview Section */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 order-1 lg:order-2">
            <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
                Pass Preview
              </h3>
              <div className="flex justify-center">
                <PassCard passData={passData || {}} />
              </div>
            </div>

            {passData && (
              <button
                onClick={handleDownload}
                className="w-full max-w-md bg-white hover:bg-gray-100 text-black font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Pass
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 sm:mt-16 text-center">
        <p className="text-gray-500 text-xs sm:text-sm">
          © 2026 RGShireworld Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
