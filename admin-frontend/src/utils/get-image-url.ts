export const getImageUrl = (type: 'product' | 'profile', imageName: string) =>
  `http://localhost:4000/images/${type}-images/${imageName}`
