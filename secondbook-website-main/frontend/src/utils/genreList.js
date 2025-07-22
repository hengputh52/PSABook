// Genre constants for frontend use
export const BOOK_GENRES = [
  { value: 'fiction', label: 'Fiction' },
  { value: 'non-fiction', label: 'Non-Fiction' },
  { value: 'science-fiction', label: 'Science Fiction' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'horror', label: 'Horror' },
  { value: 'biography', label: 'Biography' },
  { value: 'history', label: 'History' },
  { value: 'self-help', label: 'Self Help' },
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health & Fitness' },
  { value: 'travel', label: 'Travel' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'art', label: 'Art & Design' },
  { value: 'religion', label: 'Religion & Spirituality' },
  { value: 'philosophy', label: 'Philosophy' },
  { value: 'poetry', label: 'Poetry' },
  { value: 'drama', label: 'Drama' },
  { value: 'children', label: 'Children\'s Books' },
  { value: 'young-adult', label: 'Young Adult' },
  { value: 'textbook', label: 'Textbook' },
  { value: 'reference', label: 'Reference' }
];

// Export function to get label by value
export const getGenreLabel = (value) => {
  const genre = BOOK_GENRES.find(g => g.value === value);
  return genre ? genre.label : value;
};
