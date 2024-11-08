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
} from '../../stores/beach_authorities/beach_authoritiesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditBeach_authoritiesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    contact_info: '',

    beach_authority: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { beach_authorities } = useAppSelector(
    (state) => state.beach_authorities,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof beach_authorities === 'object') {
      setInitialValues(beach_authorities);
    }
  }, [beach_authorities]);

  useEffect(() => {
    if (typeof beach_authorities === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = beach_authorities[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [beach_authorities]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/beach_authorities/beach_authorities-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit beach_authorities')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit beach_authorities'}
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
              <FormField label='AuthorityName'>
                <Field name='name' placeholder='AuthorityName' />
              </FormField>

              <FormField label='ContactInformation'>
                <Field name='contact_info' placeholder='ContactInformation' />
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
                  onClick={() =>
                    router.push('/beach_authorities/beach_authorities-list')
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

EditBeach_authoritiesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_BEACH_AUTHORITIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditBeach_authoritiesPage;
