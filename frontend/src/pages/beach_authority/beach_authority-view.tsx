import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/beach_authority/beach_authoritySlice';
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

const Beach_authorityView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { beach_authority } = useAppSelector((state) => state.beach_authority);

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
        <title>{getPageTitle('View beach_authority')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View beach_authority')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{beach_authority?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Beach_authority</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beach_authority.users_beach_authority &&
                      Array.isArray(beach_authority.users_beach_authority) &&
                      beach_authority.users_beach_authority.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!beach_authority?.users_beach_authority?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Beach_authorities beach_authority
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AuthorityName</th>

                      <th>ContactInformation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beach_authority.beach_authorities_beach_authority &&
                      Array.isArray(
                        beach_authority.beach_authorities_beach_authority,
                      ) &&
                      beach_authority.beach_authorities_beach_authority.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/beach_authorities/beach_authorities-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>

                            <td data-label='contact_info'>
                              {item.contact_info}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!beach_authority?.beach_authorities_beach_authority?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Notifications beach_authority
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>NotificationMessage</th>

                      <th>SentAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beach_authority.notifications_beach_authority &&
                      Array.isArray(
                        beach_authority.notifications_beach_authority,
                      ) &&
                      beach_authority.notifications_beach_authority.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/notifications/notifications-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='message'>{item.message}</td>

                            <td data-label='sent_at'>
                              {dataFormatter.dateTimeFormatter(item.sent_at)}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!beach_authority?.notifications_beach_authority?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Reviews beach_authority</p>
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
                    {beach_authority.reviews_beach_authority &&
                      Array.isArray(beach_authority.reviews_beach_authority) &&
                      beach_authority.reviews_beach_authority.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/reviews/reviews-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='content'>{item.content}</td>

                            <td data-label='rating'>{item.rating}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!beach_authority?.reviews_beach_authority?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/beach_authority/beach_authority-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Beach_authorityView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_BEACH_AUTHORITY'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Beach_authorityView;
