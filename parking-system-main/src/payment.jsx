import React, { useState } from 'react';
import { CheckCircle, Loader2, CreditCard, Smartphone, IndianRupee } from 'lucide-react';

const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, labelColor: 'black' },
  { id: 'upi', label: 'UPI', icon: Smartphone, labelColor: 'black' },
  { id: 'cash', label: 'Cash at Location', icon: IndianRupee, labelColor: 'black' }
].map(method => ({ ...method, label: <span style={{ color: method.labelColor }}>{method.label}</span> }));

const PaymentPage = ({ booking, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleConfirmPayment = () => {
    const paymentDetails = {
      amount: booking.duration * booking.slot.rate,
      method: paymentMethod,
      transactionId: Math.random().toString(36).substr(2, 9).toUpperCase(),
    };
    onConfirm(paymentDetails);
  };

  const renderPaymentForm = () => {
    if (paymentMethod === 'card') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-950 text-sm font-medium mb-1 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full  bg-white p-2 border rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-950 text-sm font-medium mb-1">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full  bg-white p-2 border rounded-lg"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block  text-gray-950 text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full  bg-white p-2 border rounded-lg"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              />
            </div>
            <div>
              <label className="block  text-gray-950 text-sm font-medium mb-1">CVV</label>
              <input
                type="password"
                placeholder="123"
                className="w-full bg-white p-2 border rounded-lg"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
              />
            </div>
          </div>
        </div>
      );
    } else if (paymentMethod === 'upi') {
      return (
        <div className="space-y-4">
          <label className="block  text-gray-950 text-sm font-medium mb-1">UPI ID</label>
          <input
            type="text"
            placeholder="yourname@upi"
            className="w-full  bg-white p-2 border rounded-lg"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      );
    } else if (paymentMethod === 'cash') {
      return (
        <div className="p-4 bg-yellow-50 text-gray-950 rounded-lg">
          <p>Please pay at the parking location. Keep your booking ID handy.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
      
      <div className="space-y-6">
        {/* Payment Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map(method => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <method.icon className="w-6 text-gray-950 h-6 mb-2" />
              <p className="font-medium">{method.label}</p>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        {renderPaymentForm()}

        {/* Confirm Payment Button */}
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 flex items-center justify-center"
          onClick={handleConfirmPayment}
          disabled={isProcessing || !paymentMethod}
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            'Confirm Payment'
          )}
        </button>
      </div>

      {/* Booking Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-500 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your payment. Your parking spot has been reserved.
            </p>
            <p>
              <strong>Booking ID:</strong> TH-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;