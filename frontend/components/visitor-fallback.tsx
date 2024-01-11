import React from 'react';

const VisitorFallback = () => {
  return (
    <div>
      <h4 className="font-bold text-sm">Latest Visitor</h4>
      <div className="flex items-center space-x-3 mt-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="w-14 h-14 rounded-full object-cover bg-slate-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default VisitorFallback;
