export const adminFilterableFields: string[] = ['searchTerm', 'name'];

export const adminSearchableFields: string[] = ['name'];
// export const serviceRelationalFields: string[] = ['categoryId'];
// export const serviceRelationalFieldsMapper: { [key: string]: string } = {
//   categoryId: 'category',
// };
export type IAdminFilterRequest = {
  searchTerm?: string | undefined;
  search?: string | undefined;

  name?: string | undefined;
};
