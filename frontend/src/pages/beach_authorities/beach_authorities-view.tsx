import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/beach_authorities/beach_authoritiesSlice';
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

const Beach_authoritiesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { beach_authorities } = useAppSelector(
    (state) => state.beach_authorities,
  );

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
        <title>{getPageTitle('View beach_authorities')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View beach_authorities')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>AuthorityName</p>
            <p>{beach_authorities?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ContactInformation</p>
            <p>{beach_authorities?.contact_info}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>beach_authority</p>

            <p>{beach_authorities?.beach_authority?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Beaches BeachAuthority</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>BeachName</th>

                      <th>Location</th>

                      <th>SafetyStatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beach_authorities.beaches_beach_authority &&
                      Array.isArray(
                        beach_authorities.beaches_beach_authority,
                      ) &&
                      beach_authorities.beaches_beach_authority.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/beaches/beaches-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>

                            <td data-label='location'>{item.location}</td>

                            <td data-label='safety_status'>
                              {item.safety_status}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!beach_authorities?.beaches_beach_authority?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/beach_authorities/beach_authorities-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Beach_authoritiesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_BEACH_AUTHORITIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Beach_authoritiesView;
