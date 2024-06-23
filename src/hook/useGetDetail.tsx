import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMovieCredits,
  getMovieDetails,
  getMovieKeywords,
  getMovieReviews,
} from '../store/api';
import {clearDetail} from '../store/detail';
import {AppDispatch, RootState} from '../store/store';

export interface DetailHook {
  id?: number;
}

export const useGetDetail = (props: DetailHook) => {
  const detail = useSelector((state: RootState) => state.detail.movieDetail);
  const credits = useSelector((state: RootState) => state.detail.credits);
  const reviews = useSelector((state: RootState) => state.detail.reviews);
  const keywords = useSelector((state: RootState) => state.detail.keyword);

  const detailData = useMemo(() => {
    return {
      detail,
      credits,
      reviews,
      keywords,
    };
  }, [detail, credits, reviews, keywords]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!props?.id) {
      return;
    }
    dispatch(getMovieDetails(props.id));
    dispatch(getMovieCredits(props.id));
    dispatch(getMovieReviews(props.id));
    dispatch(getMovieKeywords(props.id));

    return () => {
      dispatch(clearDetail());
    };
  }, [props.id, dispatch]);

  return detailData;
};
