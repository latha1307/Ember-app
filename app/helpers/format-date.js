import { helper } from '@ember/component/helper';
import { DateTime } from 'luxon';

export default helper(function formatDate([date, format]) {
  if (!date) return '';
  const dt = DateTime.fromJSDate(new Date(date));
  return dt.isValid ? dt.toFormat(format || 'dd-LL-yyyy') : '';
});
