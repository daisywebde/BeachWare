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

import { update, fetch } from '../../stores/reviews/reviewsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditReviewsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    content: '',

    rating: '',

    user: '',

    beach: '',

    beach_authority: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { reviews } = useAppSelector((state) => state.reviews);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof reviews === 'object') {
      setInitialValues(reviews);
    }
  }, [reviews]);

  useEffect(() => {
    if (typeof reviews === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = reviews[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [reviews]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/reviews/reviews-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit reviews')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit reviews'}
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
              <FormField label='ReviewContent' hasTextareaHeight>
                <Field
                  name='content'
                  as='textarea'
                  placeholder='ReviewContent'
                />
              </FormField>

              <FormField label='Rating'>
                <Field type='number' name='rating' placeholder='Rating' />
              </FormField>

              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Beach' labelFor='beach'>
                <Field
                  name='beach'
                  id='beach'
                  component={SelectField}
                  options={initialValues.beach}
                  itemRef={'beaches'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='beach_authority' labelFor='beach_authority'>
                <Field
                  name='beach_authority'
                  id='beach_authority'
                  component={SelectField}
                  options={initialValues.beach_authority}
                  itemRef={'beach_authority'}
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
                  onClick={() => router.push('/reviews/reviews-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditReviewsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_REVIEWS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditReviewsPage;
