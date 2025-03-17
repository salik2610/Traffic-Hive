import React, { useState, useEffect } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { analyzeTrafficImage } from '../utils/geminiAPI';
import TrafficAnalysisDisplay from './TrafficAnalysisDisplay';
import HomePage from './HomePage';

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-[100] contain-strict">
    <div className="relative">
      {/* Decorative gradient rings */}
      <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-2xl opacity-30 animate-spin-slow"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 blur-xl opacity-30 animate-spin-reverse-slow"></div>
      </div>

      {/* Main content card */}
      <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-12 w-[500px] border border-blue-50">
        {/* Loading spinner */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-blue-50"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-indigo-300 border-t-transparent animate-spin-slow"></div>
          </div>

          {/* Text content */}
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Analyzing Traffic Scene
          </h3>
          <p className="text-gray-500 text-center text-lg leading-relaxed max-w-sm">
            Our AI is processing the image to provide intelligent insights...
          </p>

          {/* Animated dots */}
          <div className="flex space-x-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TrafficManagementSystem = () => {
  const [showMonitoring, setShowMonitoring] = useState(() => {
    const saved = localStorage.getItem('showMonitoring');
    return saved ? JSON.parse(saved) : false;
  });
  const [cameraFeed, setCameraFeed] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('showMonitoring', JSON.stringify(showMonitoring));
  }, [showMonitoring]);

  const handleBackToOverview = () => {
    setShowMonitoring(false);
    setCameraFeed(null);
    setAnalysis(null);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      try {
        const imageData = reader.result;
        const img = new Image();
        img.src = imageData;
        
        img.onload = async () => {
          setCameraFeed(imageData);
          setImageLoading(false);
          setIsAnalyzing(true);
          
          try {
            const result = await analyzeTrafficImage(imageData);
            setAnalysis(result);
          } catch (error) {
            console.error("Error analyzing traffic:", error);
            alert('Error analyzing the image. Please try again.');
            setCameraFeed(null);
          } finally {
            setIsAnalyzing(false);
          }
        };
      } catch (error) {
        setImageLoading(false);
        console.error("Error loading image:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const renderImageSection = () => (
    <div className="relative group transition-all duration-300 ease-in-out">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="h-48 border-2 border-dashed border-blue-200 rounded-xl p-4 group-hover:border-blue-400 transition-colors">
        {imageLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : cameraFeed ? (
          <img
            src={cameraFeed}
            alt="Traffic Camera Feed"
            className="w-full h-full object-contain rounded-lg transition-opacity duration-300"
            loading="eager"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Upload className="w-12 h-12 text-blue-500 mb-2" />
            <p className="text-sm text-gray-500">Click or drag image to upload</p>
          </div>
        )}
      </div>
    </div>
  );

  if (!showMonitoring) {
    return <HomePage onStartMonitoring={() => setShowMonitoring(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      {isAnalyzing && <LoadingOverlay />}
      
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="relative z-10">
          <Button
            onClick={handleBackToOverview}
            className="mb-6 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Overview
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-xl text-gray-900">TrafficHive Live Monitoring</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {renderImageSection()}
          </CardContent>
        </Card>

        {cameraFeed && !isAnalyzing && analysis && (
          <TrafficAnalysisDisplay analysis={analysis} />
        )}
      </div>
    </div>
  );
};

export default TrafficManagementSystem;