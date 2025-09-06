// components/Timeline.tsx
'use client';

import { CheckCircle, Clock, Truck, MapPin, Package, Sparkles, Calendar } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: string;
  title: string;
  message?: string;
  createdAt: string;
  metadata?: any;
}

interface TimelineProps {
  events: TimelineEvent[];
  currentStatus: string;
}

export function Timeline({ events, currentStatus }: TimelineProps) {
  const getStatusIcon = (type: string, isCompleted: boolean, isCurrent: boolean) => {
    const iconProps = { className: "w-6 h-6" };
    
    if (type === 'CREATED') return <Package {...iconProps} />;
    if (type === 'SCHEDULED') return <Calendar {...iconProps} />;
    if (type === 'PICKED_UP') return <Truck {...iconProps} />;
    if (type === 'VERIFIED') return <CheckCircle {...iconProps} />;
    if (type === 'COMPLETED') return <Sparkles {...iconProps} />;
    
    return <Clock {...iconProps} />;
  };

  const getStatusStyle = (type: string, isCompleted: boolean, isCurrent: boolean) => {
    if (isCurrent) {
      return {
        container: 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-300 shadow-lg shadow-blue-200',
        icon: 'text-white',
        pulse: 'animate-pulse'
      };
    }
    
    if (isCompleted) {
      return {
        container: 'bg-gradient-to-br from-eco-500 to-eco-600 border-eco-300 shadow-lg shadow-eco-200',
        icon: 'text-white',
        pulse: ''
      };
    }
    
    return {
      container: 'bg-gray-100 border-gray-300',
      icon: 'text-gray-400',
      pulse: ''
    };
  };

  const getLineColor = (isCompleted: boolean) => {
    return isCompleted ? 'bg-green-500' : 'bg-gray-300';
  };

  const statusOrder = ['CREATED', 'SCHEDULED', 'PICKED_UP', 'VERIFIED', 'MINTING', 'COMPLETED'];
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-eco-500 to-eco-600 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Collection Timeline</h3>
      </div>
      
      <div className="relative space-y-8">
        {events.map((event, index) => {
          const eventIndex = statusOrder.indexOf(event.type);
          const currentIndex = statusOrder.indexOf(currentStatus);
          const isCompleted = eventIndex < currentIndex;
          const isCurrent = eventIndex === currentIndex;
          const isLast = index === events.length - 1;
          const style = getStatusStyle(event.type, isCompleted, isCurrent);

          return (
            <div key={event.id} className="relative">
              {!isLast && (
                <div className="absolute left-8 top-20 w-1 h-16 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`w-full bg-gradient-to-b from-eco-500 to-eco-600 transition-all duration-1000 ease-out`}
                    style={{ 
                      height: isCompleted ? '100%' : isCurrent ? '50%' : '0%'
                    }}
                  />
                </div>
              )}
              
              <div className="flex items-start space-x-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 transform hover:scale-105 ${
                  style.container
                } ${style.pulse}`}>
                  <div className={style.icon}>
                    {getStatusIcon(event.type, isCompleted, isCurrent)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0 pt-2">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className={`text-lg font-bold ${
                        isCurrent ? 'text-blue-700' : isCompleted ? 'text-eco-700' : 'text-gray-600'
                      }`}>
                        {event.title}
                      </h4>
                      <div className="flex flex-col items-end">
                        <time className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-lg">
                          {new Date(event.createdAt).toLocaleDateString()}
                        </time>
                        <time className="text-xs text-gray-400 mt-1">
                          {new Date(event.createdAt).toLocaleTimeString()}
                        </time>
                      </div>
                    </div>
                    
                    {event.message && (
                      <p className="text-gray-700 leading-relaxed mb-3">{event.message}</p>
                    )}
                    
                    {isCurrent && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                        <p className="text-blue-700 text-sm font-medium flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>Currently in progress...</span>
                        </p>
                      </div>
                    )}
                    
                    {event.metadata && (
                      <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                        {event.metadata.actualWeight && (
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4 text-eco-600" />
                            <span className="text-sm font-medium text-gray-700">
                              Weight: {event.metadata.actualWeight}kg
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
