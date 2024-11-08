import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.firstName;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.firstName };
    });
  },
  usersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.firstName, id: val.id };
  },

  beach_authoritiesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  beach_authoritiesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  beach_authoritiesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  beach_authoritiesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  beachesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  beachesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  beachesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  beachesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  reviewsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.content);
  },
  reviewsOneListFormatter(val) {
    if (!val) return '';
    return val.content;
  },
  reviewsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.content };
    });
  },
  reviewsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.content, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  beach_authorityManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  beach_authorityOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  beach_authorityManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  beach_authorityOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
