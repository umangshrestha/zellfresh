import { convert_date_to_string, get_date_time_string } from './get-date-time';

describe('get_date_time_string', () => {
  it('should return a valid ISO string', () => {
    const dateTimeString = get_date_time_string();
    expect(new Date(dateTimeString).toISOString()).toBe(dateTimeString);
  });
});

describe('convert_date_to_string', () => {
  it('should convert a given date to an ISO string', () => {
    const date = new Date('2023-01-01T00:00:00.000Z');
    const dateString = convert_date_to_string(date);
    expect(dateString).toBe('2023-01-01T00:00:00.000Z');
  });
});
