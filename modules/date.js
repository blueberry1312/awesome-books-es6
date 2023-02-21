import { DateTime } from './luxon-es6/luxon.js';

export const displayTime = () => {
  const dt = DateTime.now();
  document.getElementById('date').textContent = dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  setTimeout(displayTime, 1000);
};

export default displayTime;