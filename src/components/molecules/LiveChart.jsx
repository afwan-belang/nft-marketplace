import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

// Data awal simulasi
const generateData = () => Array.from({ length: 20 }, (_, i) => ({
  time: i,
  price: 2.0 + Math.random() * 0.5
}));

const LiveChart = ({ color = "#8A2BE2" }) => {
  const [data, setData] = useState(generateData());

  // Simulasi update data real-time setiap 2 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const newData = [...currentData.slice(1)]; // Hapus data paling lama
        const lastPrice = newData[newData.length - 1].price;
        // Buat harga baru berfluktuasi dari harga terakhir
        const newPrice = lastPrice + (Math.random() - 0.5) * 0.2; 
        newData.push({ time: Date.now(), price: Math.max(0.1, newPrice) });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            isAnimationActive={false} // Dimatikan agar update interval terlihat instan/smooth
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;