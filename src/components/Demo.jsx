import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const timeSlots = [
  "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00",
  "11:00 - 12:00", "12:00 - 01:00", "01:00 - 02:00",
  "02:00 - 03:00", "03:00 - 04:00", "04:00 - 05:00"
];

function Demo() {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState({}); // { "2025-05-06": [slotIds] }
  const [loading, setLoading] = useState(false);

  // Dummy fetchSlots simulating API call
  const fetchSlots = () => {
    setLoading(true);

    setTimeout(() => {
      const bookedForDate = bookings[date] || [];

      const dummyData = timeSlots.map((slot, idx) => ({
        id: idx + 1,
        timeSlot: slot,
        booked: bookedForDate.includes(idx + 1)
      }));

      setSlots(dummyData);
      setLoading(false);
    }, 500); // simulate network delay
  };

  useEffect(() => {
    fetchSlots();
  }, [date]);

  // Dummy booking function
  const handleBooking = async (slotId) => {
    setTimeout(() => {
      setBookings(prev => {
        const updated = { ...prev };
        updated[date] = [...(updated[date] || []), slotId];
        return updated;
      });
      toast.success("Slot booked!");
      fetchSlots();
    }, 300); // simulate API delay
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Select Date</h3>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <h3>Slots for {date}</h3>
      {loading ? <p>Loading...</p> :
        <div className="slots-container">
          {timeSlots.map((slotTime, index) => {
            const slot = slots.find(s => s.timeSlot === slotTime);
            const isBooked = slot?.booked;
            return (
              <button
                key={index}
                disabled={isBooked}
                onClick={() => handleBooking(slot.id)}
                className={isBooked ? "booked-slot" : "available-slot"}
              >
                {slotTime} {isBooked ? "(Booked)" : "(Available)"}
              </button>
            );
          })}
        </div>
      }
    </div>
  );
}

export default Demo;
