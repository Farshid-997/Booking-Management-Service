export const userFilterableFields: string[] = [
  'searchTerm',
  'username',
  'name',
  'email',
  'role',
];

export const userSearchableFields: string[] = [
  'username',
  'name',
  'email',
  'role',
];
// export const serviceRelationalFields: string[] = ['categoryId'];
// export const serviceRelationalFieldsMapper: { [key: string]: string } = {
//   categoryId: 'category',
// };
export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  search?: string | undefined;

  name?: string | undefined;
  username?: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
};
