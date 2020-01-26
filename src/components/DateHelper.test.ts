import { DateHelper } from './DatePickerField';
import moment from 'moment';

it('converts from date to ms for API', () => {
  const now = moment();
  expect(DateHelper.toApiFormat(now)).toEqual(now.valueOf());
});

it('converts from ms to date from API', () => {
  const now = moment().valueOf();
  expect(DateHelper.fromApiFormat(now.toString()).valueOf()).toEqual(now);
});
