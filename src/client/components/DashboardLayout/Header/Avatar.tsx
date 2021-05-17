import React from 'react';

import useUser from '../../../hooks/use-user';

const INITIALS_BACKGROUND_COLORS = [
  '6B7280',
  'EF4444',
  'F59E0B',
  '10B981',
  '3B82F6',
  '6366F1',
  '8B5CF6',
  'EC4899',
];

export default function Avatar(): JSX.Element {
  const { user } = useUser();

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 relative flex justify-center items-center">
        <div className="shadow-inner absolute inset-0 rounded-full overflow-hidden">
          <figure
            className="text-white p-0 m-0 overflow-hidden flex justify-center items-center"
            style={{
              backgroundColor: '#' + INITIALS_BACKGROUND_COLORS[4],
              height: '100%',
              width: '100%',
            }}
          >
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </figure>
        </div>
      </div>
      <div className="ml-2 flex justify-center items-center text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
        </svg>
      </div>
    </div>
  );
}
