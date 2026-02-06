import React, { useState, useEffect, useRef } from 'react';

const PassForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    phone: '',
    photo: null
  });
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    setFormData(prev => ({
      ...prev,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5)
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const photoData = canvas.toDataURL('image/png');
      setFormData(prev => ({ ...prev, photo: photoData }));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.photo) {
      alert('Please upload or capture a photo!');
      return;
    }
    
    const id = 'RGS' + Math.floor(100000 + Math.random() * 900000);
    const timeObj = new Date(`${formData.date}T${formData.time}`);
    const formattedTime = timeObj.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });

    onGenerate({
      ...formData,
      id,
      time: formattedTime
    });
  };

  return (
    <div className="w-full max-w-md bg-black/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Visitor Pass Generator</h2>
        <p className="text-xs sm:text-sm text-gray-400">Fill in the details to generate a pass</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5">
            Visitor Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition text-white placeholder-gray-500 text-sm sm:text-base"
            placeholder="Enter visitor name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-2 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition text-white text-xs sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5">
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-2 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition text-white text-xs sm:text-base"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition text-white placeholder-gray-500 text-sm sm:text-base"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5">
            Photo
          </label>
          
          {!showCamera ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition text-white text-xs sm:text-sm font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="hidden sm:inline">Take Photo</span>
                  <span className="sm:hidden">Camera</span>
                </button>
                
                <label className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition text-white text-xs sm:text-sm font-semibold cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="hidden sm:inline">Upload</span>
                  <span className="sm:hidden">Upload</span>
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-48 sm:h-64 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-3 sm:px-4 py-2 bg-white hover:bg-gray-200 text-black rounded-lg transition text-xs sm:text-sm font-semibold"
                >
                  Capture
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition text-xs sm:text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {formData.photo && !showCamera && (
            <div className="mt-3 flex items-center gap-3 p-2 sm:p-3 bg-white/10 border border-white/20 rounded-lg">
              <img src={formData.photo} alt="Preview" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">Photo ready</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, photo: null })}
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <button
          type="submit"
          className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-2.5 sm:py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base"
        >
          Generate Pass
        </button>
      </form>
    </div>
  );
};

export default PassForm;
