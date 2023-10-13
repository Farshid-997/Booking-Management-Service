export const serviceFilterableFields: string[] = [
  'searchTerm',
  'price',
  'name',
];

export const serviceSearchableFields: string[] = [
  'name',
  'location',
  'category',
];
// export const serviceRelationalFields: string[] = ['categoryId'];
// export const serviceRelationalFieldsMapper: { [key: string]: string } = {
//   categoryId: 'category',
// };
export type IServiceFilterRequest = {
  searchTerm?: string | undefined;
  search?: string | undefined;
  price?: number | undefined;
  name?: string | undefined;
};
