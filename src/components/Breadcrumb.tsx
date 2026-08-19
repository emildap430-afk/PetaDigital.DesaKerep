import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem, RouteState } from '../types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (route: RouteState) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav className="px-4 sm:px-6 lg:px-8 py-2.5 bg-slate-100/80 border-b border-slate-200 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0 mx-0.5" />}
              {item.target && !isLast ? (
                <button
                  onClick={() => onNavigate(item.target!)}
                  className="hover:text-emerald-800 hover:underline font-medium text-slate-600 transition-colors shrink-0"
                >
                  {item.label}
                </button>
              ) : (
                <span className={`shrink-0 ${isLast ? 'font-semibold text-emerald-900' : ''}`}>
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
