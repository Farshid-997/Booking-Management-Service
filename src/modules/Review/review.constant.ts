export const reviewFilterableFields: string[] = ['rating'];

export const reviewSearchableFields: string[] = ['rating'];
// export const serviceRelationalFields: string[] = ['categoryId'];
// export const serviceRelationalFieldsMapper: { [key: string]: string } = {
//   categoryId: 'category',
// };
export type IReviewFilterRequest = {
  searchTerm?: string | undefined;
  rating?: number | undefined;
};
