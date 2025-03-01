import { useEffect, useState } from "react";
import { differenceInMonths } from "date-fns";

interface CountdownProps {
  target: Date;
  title: string;
}

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ target, title }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Calcular meses exactos
    const months = differenceInMonths(target, now);
    const adjustedDate = new Date(now);
    adjustedDate.setMonth(now.getMonth() + months);

    // Calcular diferencia restante después de los meses
    const remainingDiff = target.getTime() - adjustedDate.getTime();
    const secondsTotal = Math.floor(remainingDiff / 1000);

    const days = Math.floor(secondsTotal / (3600 * 24));
    const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = secondsTotal % 60;

    return {
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = calculateTimeLeft();
        // Actualizar solo si hay cambios
        return JSON.stringify(prev) !== JSON.stringify(newTime) ? newTime : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [target]); // <- Importante: target como dependencia

  return (
    <div className="card bg-neutral text-neutral-content shadow-xl mb-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl mb-4 text-primary">{title}</h2>
        
        <div className="grid grid-flow-col gap-2 md:gap-4 text-center auto-cols-max">
          <TimeUnit value={timeLeft.months} label="Meses" />
          <TimeUnit value={timeLeft.days} label="Días" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>

        {timeLeft.months === 0 && timeLeft.days === 0 && (
          <div className="mt-2 text-sm text-success animate-pulse">
            ⏰ ¡Tiempo cumplido!
          </div>
        )}
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col p-2 bg-base-200 rounded-box">
      <span className="countdown font-mono text-2xl md:text-3xl">
        <span style={{ "--value": value } as React.CSSProperties}></span>
      </span>
      <span className="text-xs md:text-sm mt-1 text-neutral-content/80">
        {label}
      </span>
    </div>
  );
}