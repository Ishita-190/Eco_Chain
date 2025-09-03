// components/Timeline.tsx
'use client';

import { CheckCircle, Clock, AlertCircle, Loader } from 'lucide-react';

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
    if (isCurrent && !isCompleted) {
      return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
    }
    
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (type: string, isCompleted: boolean, isCurrent: boolean) => {
    if (isCurrent && !isCompleted) return 'border-blue-500 bg-blue-50';
    if (isCompleted) return 'border-green-500 bg-green-50';
    return 'border-gray-300 bg-gray-50';
  };

  const getLineColor = (isCompleted: boolean) => {
    return isCompleted ? 'bg-green-500' : 'bg-gray-300';
  };

  const statusOrder = ['CREATED', 'SCHEDULED', 'PICKED_UP', 'VERIFIED', 'MINTING', 'COMPLETED'];
  
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Timeline</h3>
      
      <div className="relative">
        {events.map((event, index) => {
          const eventIndex = statusOrder.indexOf(event.type);
          const currentIndex = statusOrder.indexOf(currentStatus);
          const isCompleted = eventIndex < currentIndex;
          const isCurrent = eventIndex === currentIndex;
          const isLast = index === events.length - 1;

          return (
            <div key={event.id} className="relative pb-8">
              {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200">
                  <div 
                    className={`w-full transition-all duration-500 ${getLineColor(isCompleted)}`}
                    style={{ height: isCompleted ? '100%' : '0%' }}
                  />
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  getStatusColor(event.type, isCompleted, isCurrent)
                }`}>
                  {getStatusIcon(event.type, isCompleted, isCurrent)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {event.title}
                    </h4>
                    <time className="text-xs text-gray-500">
                      {new Date(event.createdAt).toLocaleString()}
                    </time>
                  </div>
                  
                  {event.message && (
                    <p className="text-sm text-gray-600 mt-1">{event.message}</p>
                  )}
                  
                  {event.metadata && (
                    <div className="mt-2 text-xs text-gray-500">
                      {event.metadata.actualWeight && (
                        <span>Weight: {event.metadata.actualWeight}kg</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
