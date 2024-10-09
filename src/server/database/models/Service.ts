interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
}

export type { Category, Service };
