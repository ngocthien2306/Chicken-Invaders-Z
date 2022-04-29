export class ItemModel {
  speed!: number;
  size!: number;
  image!: string;
  type!: CategoryModel;
}

export class CategoryModel {
  Id!: number;
  Name!: string;
  Type!: string;
}