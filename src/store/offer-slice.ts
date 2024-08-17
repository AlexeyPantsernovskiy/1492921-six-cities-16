import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loadComments,
  loadNearPlaces,
  loadOffer,
  uploadComment,
} from './api-actions';
import { Offer, Place, Review, Location } from '../types/types';
import { MAX_NEAR_PLACES_ON_MAP, MAX_REVIEWS } from '../const';
import { EMPTY_PLACES } from './places-slice';

const EMPTY_OFFER = null;
const EMPTY_COMMENTS = [] as Review[];
const EMPTY_POINTS = [] as Location[];

export enum SavingStatus {
  Idle = 'IDLE',
  Saving = 'SAVING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

type OfferState = {
  offer: Offer | null;
  isLoadingOffer: boolean;
  nearPlaces: Place[];
  isLoadingNearPlaces: boolean;
  comments: Review[];
  isLoadingComments: boolean;
  savingCommentStatus: SavingStatus;
};

const initialState: OfferState = {
  offer: EMPTY_OFFER,
  isLoadingOffer: false,
  nearPlaces: EMPTY_PLACES,
  isLoadingNearPlaces: false,
  comments: EMPTY_COMMENTS,
  isLoadingComments: false,
  savingCommentStatus: SavingStatus.Idle,
};

const loadingOfferWait = (state: OfferState) => {
  state.offer = EMPTY_OFFER;
  state.isLoadingOffer = true;
};
const loadingOfferError = (state: OfferState) => {
  state.offer = EMPTY_OFFER;
  state.isLoadingOffer = false;
};
const loadingOfferEnd = (state: OfferState, action: PayloadAction<Offer>) => {
  state.offer = action.payload;
  state.isLoadingOffer = false;
};

const loadingNearPlacesWait = (state: OfferState) => {
  state.nearPlaces = EMPTY_PLACES;
  state.isLoadingNearPlaces = true;
};
const loadingNearPlacesError = (state: OfferState) => {
  state.nearPlaces = EMPTY_PLACES;
  state.isLoadingNearPlaces = false;
};
const loadingNearPlacesEnd = (
  state: OfferState,
  action: PayloadAction<Place[]>
) => {
  state.nearPlaces = action.payload;
  state.isLoadingNearPlaces = false;
};

const loadingCommentsWait = (state: OfferState) => {
  state.comments = EMPTY_COMMENTS;
  state.isLoadingComments = true;
};
const loadingCommentsError = (state: OfferState) => {
  state.comments = EMPTY_COMMENTS;
  state.isLoadingComments = false;
};
const loadingCommentsEnd = (
  state: OfferState,
  action: PayloadAction<Review[]>
) => {
  state.comments = action.payload;
  state.isLoadingComments = false;
};

const savingCommentWait = (state: OfferState) => {
  state.savingCommentStatus = SavingStatus.Saving;
};
const savingCommentError = (state: OfferState) => {
  state.savingCommentStatus = SavingStatus.Error;
};
const savingCommentEnd = (
  state: OfferState,
  action: PayloadAction<Review>
): void => {
  state.comments = [...state.comments, action.payload];
  state.savingCommentStatus = SavingStatus.Success;
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOffer.pending, loadingOfferWait)
      .addCase(loadOffer.fulfilled, loadingOfferEnd)
      .addCase(loadOffer.rejected, loadingOfferError)
      .addCase(loadNearPlaces.pending, loadingNearPlacesWait)
      .addCase(loadNearPlaces.fulfilled, loadingNearPlacesEnd)
      .addCase(loadNearPlaces.rejected, loadingNearPlacesError)
      .addCase(loadComments.pending, loadingCommentsWait)
      .addCase(loadComments.fulfilled, loadingCommentsEnd)
      .addCase(loadComments.rejected, loadingCommentsError)
      .addCase(uploadComment.pending, savingCommentWait)
      .addCase(uploadComment.rejected, savingCommentError)
      .addCase(uploadComment.fulfilled, savingCommentEnd);
  },
  selectors: {
    offer: (state) => state.offer,
    isLoadingOffer: (state) => state.isLoadingOffer,
    nearPlaces: (state) => state.nearPlaces,
    isLoadingNearPlaces: (state) => state.isLoadingNearPlaces,
    comments: (state) => state.comments,
    isLoadingComments: (state) => state.isLoadingComments,
    commentsCount: (state) => state.comments.length,
    savingCommentStatus: (state) => state.savingCommentStatus,
  },
});

const offerSelectors = {
  ...offerSlice.selectors,
  commentsView: createSelector(offerSlice.selectors.comments, (comments) => {
    comments
      ?.sort((item1, item2) => {
        const date1 = new Date(item1.date);
        const date2 = new Date(item2.date);
        return +date2 - +date1;
      })
      .slice(0, MAX_REVIEWS);
  }),
  pointsInMap: createSelector(
    offerSlice.selectors.offer,
    offerSlice.selectors.nearPlaces,
    (offer, nearPlaces) => {
      if (!offer) {
        return EMPTY_POINTS;
      }
      const nearPoints = nearPlaces.map((place) => place.location);
      return nearPoints
        .slice(0, MAX_NEAR_PLACES_ON_MAP)
        .concat([offer.location]);
    }
  ),
};

export { offerSelectors };
export default offerSlice.reducer;
