import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/beaches/beachesSlice';
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

const BeachesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { beaches } = useAppSelector((state) => state.beaches);

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
        <title>{getPageTitle('View beaches')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View beaches')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>BeachName</p>
            <p>{beaches?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Location</p>
            <p>{beaches?.location}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>SafetyStatus</p>
            <p>{beaches?.safety_status ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>BeachImages</p>
            {beaches?.images?.length ? (
              <ImageField
                name={'images'}
                image={beaches?.images}
                className='w-20 h-20'
              />
            ) : (
              <p>No BeachImages</p>
            )}
          </div>

          <>
            <p className={'block font-bold mb-2'}>Reviews</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ReviewContent</th>

                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beaches.reviews &&
                      Array.isArray(beaches.reviews) &&
                      beaches.reviews.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reviews/reviews-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='content'>{item.content}</td>

                          <td data-label='rating'>{item.rating}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!beaches?.reviews?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>BeachAuthority</p>

            <p>{beaches?.beach_authority?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Reviews Beach</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ReviewContent</th>

                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beaches.reviews_beach &&
                      Array.isArray(beaches.reviews_beach) &&
                      beaches.reviews_beach.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reviews/reviews-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='content'>{item.content}</td>

                          <td data-label='rating'>{item.rating}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!beaches?.reviews_beach?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/beaches/beaches-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

BeachesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_BEACHES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default BeachesView;
