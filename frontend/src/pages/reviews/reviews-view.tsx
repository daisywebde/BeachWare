import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/reviews/reviewsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const ReviewsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { reviews } = useAppSelector((state) => state.reviews);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View reviews')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View reviews')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='Multi Text' hasTextareaHeight>
            <textarea className={'w-full'} disabled value={reviews?.content} />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Rating</p>
            <p>{reviews?.rating || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{reviews?.user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Beach</p>

            <p>{reviews?.beach?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>beach_authority</p>

            <p>{reviews?.beach_authority?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/reviews/reviews-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ReviewsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_REVIEWS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ReviewsView;
