import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/beaches/beachesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditBeaches = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    location: '',

    safety_status: '',

    images: [],

    reviews: [],

    beach_authority: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { beaches } = useAppSelector((state) => state.beaches);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { beachesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: beachesId }));
  }, [beachesId]);

  useEffect(() => {
    if (typeof beaches === 'object') {
      setInitialValues(beaches);
    }
  }, [beaches]);

  useEffect(() => {
    if (typeof beaches === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = beaches[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [beaches]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: beachesId, data }));
    await router.push('/beaches/beaches-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit beaches')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit beaches'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='BeachName'>
                <Field name='name' placeholder='BeachName' />
              </FormField>

              <FormField label='Location'>
                <Field name='location' placeholder='Location' />
              </FormField>

              <FormField label='SafetyStatus' labelFor='safety_status'>
                <Field
                  name='safety_status'
                  id='safety_status'
                  component='select'
                >
                  <option value='safe'>safe</option>

                  <option value='caution'>caution</option>

                  <option value='unsafe'>unsafe</option>
                </Field>
              </FormField>

              <FormField>
                <Field
                  label='BeachImages'
                  color='info'
                  icon={mdiUpload}
                  path={'beaches/images'}
                  name='images'
                  id='images'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField label='Reviews' labelFor='reviews'>
                <Field
                  name='reviews'
                  id='reviews'
                  component={SelectFieldMany}
                  options={initialValues.reviews}
                  itemRef={'reviews'}
                  showField={'content'}
                ></Field>
              </FormField>

              <FormField label='BeachAuthority' labelFor='beach_authority'>
                <Field
                  name='beach_authority'
                  id='beach_authority'
                  component={SelectField}
                  options={initialValues.beach_authority}
                  itemRef={'beach_authorities'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/beaches/beaches-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditBeaches.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_BEACHES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditBeaches;
