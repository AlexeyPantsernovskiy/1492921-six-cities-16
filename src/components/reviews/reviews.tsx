import { Review } from '@src/types/types';
import { RatingType } from '@src/const';
import { Rating, Loading } from '@components';
import { loadComments } from '@store/api-actions';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import { useEffect } from 'react';
import { offerSelectors } from '@store/offer-slice/offer-slice';
import { getRatingInPercents } from '@src/utils/utils';

type ReviewProps = {
  item: Review;
};
function ReviewItem({ item }: ReviewProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={item.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{item.user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating
          valuePercent={getRatingInPercents(item.rating)}
          viewType={RatingType.Review}
        />
        <p className="reviews__text">{item.comment}</p>
        <time className="reviews__time" dateTime={item.date}>
          {new Date(item.date).toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </li>
  );
}

type ReviewsProps = {
  offerId: string;
};
export default function Reviews({ offerId }: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoadingComments = useAppSelector(offerSelectors.isLoadingComments);
  const comments = useAppSelector(offerSelectors.commentsView);
  const commentsCount = useAppSelector(offerSelectors.commentsCount);

  useEffect(() => {
    if (offerId) {
      dispatch(loadComments(offerId));
    }
  }, [dispatch, offerId]);
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{commentsCount}</span>
      </h2>
      {isLoadingComments ? (
        <Loading />
      ) : (
        <ul className="reviews__list">
          {comments.map((item) => (
            <ReviewItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </>
  );
}
