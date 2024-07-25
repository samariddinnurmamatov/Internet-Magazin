import React, { useRef, useState, useEffect } from 'react';


const Timer = ({ time }) => {
  const [timeDay, settimeDay] = useState('00');
  const [timerHours, settimerHours] = useState('00');
  const [timerMinutes, settimerMinutes] = useState('00');
  const [timerSeconds, settimerSeconds] = useState('00');

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    const countdownDate = new Date(time).getTime();

    intervalRef.current = window.setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        settimeDay(`${days}`);
        settimerHours(`${hours}`);
        settimerMinutes(`${minutes}`);
        settimerSeconds(`${seconds}`);
      }
    }, 1000);
  };

  return (
    <div className="">
      <div className="flex items-end gap-2">
        <div className="flex flex-col items-center">
          <div className="text-lg font-[poppins]">Days</div>
          <div className="text-2xl  font-[poppins] text-[32px] font-semibold">{timeDay}</div>
        </div>
        <div className="text-2xl font-semibold">:</div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-[poppins]">Hours</div>
          <div className="text-2xl font-semibold font-[poppins] text-[32px] ">{timerHours}</div>
        </div>
        <div className="text-2xl font-semibold">:</div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-[poppins] ">Minutes</div>
          <div className="text-2xl font-semibold text-[32px] font-[poppins]">{timerMinutes}</div>
        </div>
        <div className="text-2xl font-semibold">:</div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-[poppins]">Seconds</div>
          <div className="text-2xl font-semibold font-[poppins] text-[32px]">{timerSeconds}</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
