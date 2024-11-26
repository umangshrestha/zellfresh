export interface RatingDialogProps {
  lastRating?: number,
  loading: boolean;
  currentRating: number;
  comment?: string;
  submitFeedback: (rating: number, comment: string) => void;
}