import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/beaches/beachesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  name: '',

  location: '',

  safety_status: 'safe',

  images: [],

  reviews: [],

  beach_authority: '',
};

const BeachesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/beaches/beaches-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
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
                  itemRef={'reviews'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <FormField label='BeachAuthority' labelFor='beach_authority'>
                <Field
                  name='beach_authority'
                  id='beach_authority'
                  component={SelectField}
                  options={[]}
                  itemRef={'beach_authorities'}
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

BeachesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_BEACHES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default BeachesNew;
