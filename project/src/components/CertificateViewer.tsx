import React, { useState } from 'react';
import { Award, Download, Share2, Calendar, User, CheckCircle } from 'lucide-react';

const CertificateViewer = ({ certificate, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    
    // In a real app, this would generate and download a PDF
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${certificate.title}-certificate.pdf`;
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.title} Certificate`,
        text: `I just earned a certificate in ${certificate.title} from SkillConnect-AI!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I just earned a certificate in ${certificate.title} from SkillConnect-AI! 🎉`
      );
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Certificate of Completion</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Certificate Design */}
        <div className="p-8">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-200 rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-green-200/30 rounded-full"></div>
            <div className="absolute top-8 right-8 w-12 h-12 bg-blue-200/30 rounded-full"></div>
            <div className="absolute bottom-4 left-8 w-20 h-20 bg-green-300/20 rounded-full"></div>
            <div className="absolute bottom-8 right-4 w-14 h-14 bg-blue-300/20 rounded-full"></div>

            {/* Certificate Content */}
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="h-12 w-12 text-white" />
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-2">Certificate of Completion</h1>
              <p className="text-gray-600 mb-8">This is to certify that</p>

              <h2 className="text-3xl font-bold text-green-600 mb-8">{certificate.studentName}</h2>

              <p className="text-gray-600 mb-4">has successfully completed the course</p>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">{certificate.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/50 rounded-lg p-4">
                  <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Completion Date</p>
                  <p className="font-semibold">{certificate.completionDate}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="font-semibold">{certificate.score}%</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <User className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Instructor</p>
                  <p className="font-semibold">{certificate.instructor}</p>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-6">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">SkillConnect-AI</p>
                    <p className="text-sm text-gray-600">Sustainable Career Platform</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Certificate ID</p>
                    <p className="font-mono text-sm font-semibold">{certificate.certificateId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Achievement</span>
            </button>
          </div>

          {/* Verification Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              This certificate can be verified at{' '}
              <span className="font-mono text-green-600">skillconnect-ai.com/verify/{certificate.certificateId}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;