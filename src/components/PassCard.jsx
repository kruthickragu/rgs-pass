import React from 'react';

const PassCard = ({ passData }) => {
  return (
    <div 
      id="visitor-pass" 
      className="w-full max-w-[400px] h-auto sm:h-[250px] bg-gradient-to-br from-black via-gray-900 to-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden relative border border-white/20"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
      </div>

      {/* Header */}
      <div className="relative px-3 sm:px-5 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/logo.png" 
              alt="RGShireworld Logo" 
              className="h-8 sm:h-10 w-auto drop-shadow-lg"
            />
            <div>
              <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider">RGSHIREWORLD</h3>
              <p className="text-gray-300 text-[9px] sm:text-[10px] font-medium">VISITOR ACCESS PASS</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/10 px-2 sm:px-3 py-1 pb-1.5 sm:pb-2 rounded-lg backdrop-blur-sm border border-white/20">
              <p className="text-[9px] sm:text-[10px] text-gray-300 font-semibold">ID</p>
              <p className="text-white font-bold text-[10px] sm:text-xs">{passData.id || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Left side - Details */}
        <div className="flex-1 space-y-1.5 sm:space-y-2">
          <div className="space-y-1 sm:space-y-1.5">
            <InfoRow label="Name" value={passData.name || '-'} />
            <InfoRow label="Organization" value="RGShireworld Pvt Ltd" />
            <InfoRow label="Building" value="Main Office" />
            <InfoRow label="To Meet" value="Admin" />
          </div>
          
          {/* Footer */}
          <div className="pt-1.5 sm:pt-2 mt-1.5 sm:mt-2 border-t border-white/10">
            <p className="text-gray-400 text-[8px] sm:text-[9px] font-medium">
              Powered by RGShireworld Technologies
            </p>
          </div>
        </div>

        {/* Right side - Photo & DateTime */}
        <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/30 shadow-lg bg-gray-800 flex-shrink-0">
            {passData.photo ? (
              <img 
                src={passData.photo} 
                alt="Visitor" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1 sm:w-full bg-gray-800/80 px-2 sm:px-3 py-1.5 pb-2 sm:pb-2.5 rounded-lg border border-white/20">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
              <div>
                <p className="text-[8px] sm:text-[9px] text-gray-300 font-semibold">DATE</p>
                <p className="text-white text-[10px] sm:text-[11px] font-bold">{passData.date || '-'}</p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[9px] text-gray-300 font-semibold">TIME</p>
                <p className="text-white text-[10px] sm:text-[11px] font-bold">{passData.time || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/5 pointer-events-none"></div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-baseline gap-1.5 sm:gap-2">
    <span className="text-gray-300 text-[9px] sm:text-[10px] font-semibold min-w-[60px] sm:min-w-[70px]">{label}:</span>
    <span className="text-white text-[10px] sm:text-xs font-medium break-words">{value}</span>
  </div>
);

export default PassCard;
