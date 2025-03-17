import React, { useState } from 'react';
import { Car, Clock, MapPin, CheckCircle, ParkingCircle } from 'lucide-react';

const ParkingSystem = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    location: '',
    vehicleType: '',
    duration: '',
    slot: '',
    payment: null,
    vehicleNumber: '',
    ownerName: '',
    bookingId: '',
    amount: 0
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const generateBookingId = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000); // Generates 5 digit number
    return `TH-${randomNum}`;
  };

  const storeBookingData = async () => {
    const bookingId = generateBookingId();
    setBooking(prev => ({...prev, bookingId}));
    
    console.log('Attempting to store data:', booking);
    
    const requestBody = JSON.stringify({
      data: [
        {
          'NAME': booking.ownerName,
          'DURATION(HOUR)': booking.duration,
          'VEHICLE_NUMBER': booking.vehicleNumber,
          'VEHICLE_TYPE': booking.vehicleType,
          'LOCATION': booking.location,
          'PAYMENT_METHOD': booking.payment?.method || '',
          'BOOKING_ID': bookingId,
          'AMOUNT': booking.amount
        }
      ]
    });

    try {
      const response = await fetch('https://sheetdb.io/api/v1/govminw43mz4m', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: requestBody
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data stored successfully:', data);
    } catch (error) {
      console.error('Error storing data:', error);
      alert('Failed to store booking data. Please try again.');
    }
  };

  const handlePayment = (paymentDetails) => {
    setBooking((prev) => ({
      ...prev,
      payment: paymentDetails,
      amount: paymentDetails.amount
    }));
    setStep(5);
  };

  const locations = [
    { id: 1, name: 'Lajpat Nagar', slots: 45, rate: 50 },
    { id: 2, name: 'Karkarduma', slots: 30, rate: 40 },
    { id: 3, name: 'Karol Bagh', slots: 25, rate: 32 },
    { id: 4, name: 'Connaught place', slots: 50, rate: 30 },
    { id: 5, name: 'Sarojni Nagar', slots: 40, rate: 45 },
    { id: 6, name: 'Supreme Court', slots: 25, rate: 25 },
  ];

  const vehicleTypes = [
    { id: 1, type: 'Sedan', rate: 1 },
    { id: 2, type: 'SUV', rate: 1.5 },
    { id: 3, type: 'EV', rate: 0.75 },
    { id: 4, type: 'Two-Wheeler', rate: 0.5 },
  ];

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      <div className="bg-blue-600 text-white p-3 w-full">
        <div className="mx-auto flex items-center justify-between p-6">
          <div className="flex justify-left space-x-2">
            <ParkingCircle size={32} />
            <h1 className="text-2xl font-bold">Traffic Hive Parking</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Car />
            <span>Parking made easy</span>
          </div>
        </div>
      </div>

      <div className="w-full h-48 relative overflow-hidden">
        <img
          src="https://png.pngtree.com/background/20230427/original/pngtree-parking-garage-full-of-cars-at-night-at-urban-city-environment-picture-image_2495427.jpg"
          alt="Parking garage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">Smart Parking Solutions</h2>
        </div>
      </div>

      {!showConfirmation ? (
        <div className="w-full max-w-6xl px-4 mx-auto py-6">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            {/* Step indicators */}
            <div className="mb-8 flex justify-between w-full">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`flex items-center ${s <= step ? 'text-blue-600' : 'text-gray-400'} w-1/5`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {s}
                  </div>
                  <div className="ml-2">
                    {s === 1 && 'Location'}
                    {s === 2 && 'Vehicle'}
                    {s === 3 && 'Duration'}
                    {s === 4 && 'Payment'}
                  </div>
                </div>
              ))}
            </div>

            {/* Step content */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Select Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 bg-white ${
                        booking.location === loc.name ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        setBooking({ ...booking, location: loc.name });
                        setStep(2);
                      }}
                    >
                      <h4>{loc.name}</h4>
                      <p>Available spots: {loc.slots}</p>
                      <p>Rate per hour: ₹{loc.rate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Select Vehicle Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {vehicleTypes.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 bg-white ${
                        booking.vehicleType === vehicle.type ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setBooking({ ...booking, vehicleType: vehicle.type })}
                    >
                      <h4>{vehicle.type}</h4>
                      <p>Rate multiplier x{vehicle.rate}</p>
                    </div>
                  ))}
                </div>

                {/* Vehicle Number and Owner Name */}
                <input
                  type="text"
                  placeholder="Vehicle Number"
                  value={booking.vehicleNumber}
                  onChange={(e) => setBooking({ ...booking, vehicleNumber: e.target.value })}
                  className="w-full p-2 border rounded mt-2 bg-white"
                />
                <input
                  type="text"
                  placeholder="Owner Name"
                  value={booking.ownerName}
                  onChange={(e) => setBooking({ ...booking, ownerName: e.target.value })}
                  className="w-full p-2 border rounded mt-2 bg-white"
                />

                <button
                  onClick={() => setStep(3)}
                  className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
                >
                  Next
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Select Duration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 4, 8].map((duration) => (
                    <div
                      key={duration}
                      onClick={() => {
                        setBooking({ ...booking, duration });
                        setStep(4);
                      }}
                      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 bg-white ${
                        booking.duration === duration ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                    >
                      {duration} hour{duration > 1 ? "s" : ""}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Step */}
            {step === 4 && (
              <PaymentPage booking={booking} locations={locations} vehicleTypes={vehicleTypes} onConfirm={handlePayment} />
            )}

            {/* Confirmation Step */}
            {step === 5 && (
              <>
                <h3 className="text-xl font-semibold mb-4">Confirm Booking</h3>
                {/* Booking details */}
                <p><strong>Location:</strong> {booking.location}</p>
                <p><strong>Vehicle Type:</strong> {booking.vehicleType}</p>
                <p><strong>Duration:</strong> {booking.duration} hour{booking.duration > 1 ? "s" : ""}</p>
                <p><strong>Vehicle Number:</strong> {booking.vehicleNumber}</p>
                <p><strong>Owner Name:</strong> {booking.ownerName}</p>
                <p><strong>Amount:</strong> ₹{booking.amount}</p>

                {/* Confirm button */}
                <button
                  onClick={() => {
                    storeBookingData(); // Call the storeBookingData function to store the data
                    setShowConfirmation(true);
                  }}
                  className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
                >
                  Confirm Booking
                </button>
              </>
            )}
          </div>

        </div>
      ) : (
        // Confirmation message after successful booking
        <div className="w-full max-w-md mx-auto py-6 text-center bg-white">
          <div className="flex justify-center">
            <CheckCircle size={48} color="#28a745" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
          <p>Your parking spot has been reserved. Thank you for using our service.</p>
          <p className="mt-2">Booking ID: {booking.bookingId}</p>

          {/* Button to book another spot */}
          <button
            onClick={() => {
              setShowConfirmation(false);
              setStep(1); // Reset to step one for a new booking
              setBooking({
                location: '',
                vehicleType: '',
                duration: '',
                slot: '',
                payment: null,
                vehicleNumber: '',
                ownerName: '',
                bookingId: '',
                amount: 0
              });
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Book Another Spot
          </button>
        </div>
      )}
    </div>
  );
};

const PaymentPage = ({ booking, locations, vehicleTypes, onConfirm }) => {
   const [paymentMethod, setPaymentMethod] = useState('card');
   const [upiId, setUpiId] = useState('');
   const [cardDetails, setCardDetails] = useState({
     holderName: '',
     cardNumber: '',
     cvv: '',
     expiryDate: ''
   });

   // Calculate amount based on location rate and vehicle type multiplier
   const locationRate = locations.find(loc => loc.name === booking.location)?.rate || 0;
   const vehicleMultiplier = vehicleTypes.find(v => v.type === booking.vehicleType)?.rate || 1;
   const amountToPay = booking.duration * locationRate * vehicleMultiplier;

   return (
     <div className="space-y-4 bg-white">
       <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>

       <select 
         value={paymentMethod}
         onChange={(e) => setPaymentMethod(e.target.value)}
         className="w-full p-2 border rounded bg-white"
       >
         <option value="card">Credit/Debit Card</option>
         <option value="upi">UPI</option>
         <option value="cash">Cash</option>
       </select>

       {paymentMethod === 'card' && (
         <div className="space-y-2">
           <input
             type="text"
             placeholder="Card Holder Name"
             value={cardDetails.holderName}
             onChange={(e) => setCardDetails({...cardDetails, holderName: e.target.value})}
             className="w-full p-2 border rounded bg-white"
           />
           <input
             type="text"
             placeholder="Card Number"
             value={cardDetails.cardNumber}
             onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
             maxLength="16"
             className="w-full p-2 border rounded bg-white"
           />
           <div className="flex space-x-2">
             <input
               type="text"
               placeholder="CVV"
               value={cardDetails.cvv}
               onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
               maxLength="3"
               className="w-1/3 p-2 border rounded bg-white"
             />
             <input
               type="text"
               placeholder="MM/YY"
               value={cardDetails.expiryDate}
               onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
               maxLength="5"
               className="w-2/3 p-2 border rounded bg-white"
             />
           </div>
         </div>
       )}

       {paymentMethod === 'upi' && (
         <input
           type="text"
           placeholder="Enter UPI ID"
           value={upiId}
           onChange={(e) => setUpiId(e.target.value)}
           className="w-full p-2 border rounded bg-white"
         />
       )}

       <button 
         onClick={() => onConfirm({ 
           method: paymentMethod,
           amount: amountToPay,
           upiId: paymentMethod === 'upi' ? upiId : undefined,
           cardDetails: paymentMethod === 'card' ? cardDetails : undefined
         })}
         className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
       >
         Confirm Payment of ₹{amountToPay}
       </button>
     </div>
   );
};

export default ParkingSystem;
