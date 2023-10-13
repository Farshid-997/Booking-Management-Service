export const bookingFilterableFields: string[] = ['date', 'status'];

export const bookingSearchableFields: string[] = ['date', 'status'];
// export const serviceRelationalFields: string[] = ['categoryId'];
// export const serviceRelationalFieldsMapper: { [key: string]: string } = {
//   categoryId: 'category',
// };
export type IBookingFilterRequest = {
  searchTerm?: string | undefined;
  date?: Date | undefined;
  status?: string | undefined;
};
