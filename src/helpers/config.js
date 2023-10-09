export const taskCategories = [
  { name: 'Work', icon: '#icon-briefcase' },
  { name: 'Study', icon: '#icon-book' },
  { name: 'Exercise', icon: '#icon-dumbell' },
  { name: 'Health', icon: '#icon-aid-kit' },
  { name: 'Wellness', icon: '#icon-lotus' },
  { name: 'Chores', icon: '#icon-broom' },
  { name: 'Completed', icon: '#icon-checkmark' },
  { name: 'Ongoing', icon: '#icon-hour-glass' },
  { name: 'Show All', icon: '#icon-list' },
];

export const numDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export let API_URL;
if (process.env.NODE_ENV === 'production')
  API_URL = 'https://pomodo-nyl3ht4q.b4a.run/api/v1';
else API_URL = 'http://127.0.0.1:4000/api/v1';
