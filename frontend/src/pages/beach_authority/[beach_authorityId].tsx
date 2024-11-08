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

import {
  update,
  fetch,
} from '../../stores/beach_authority/beach_authoritySlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditBeach_authority = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { beach_authority } = useAppSelector((state) => state.beach_authority);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { beach_authorityId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: beach_authorityId }));
  }, [beach_authorityId]);

  useEffect(() => {
    if (typeof beach_authority === 'object') {
      setInitialValues(beach_authority);
    }
  }, [beach_authority]);

  useEffect(() => {
    if (typeof beach_authority === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = beach_authority[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [beach_authority]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: beach_authorityId, data }));
    await router.push('/beach_authority/beach_authority-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit beach_authority')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit beach_authority'}
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
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
                  onClick={() =>
                    router.push('/beach_authority/beach_authority-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditBeach_authority.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_BEACH_AUTHORITY'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditBeach_authority;
