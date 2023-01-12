<!-- eslint-disable prettier/prettier -->
<template>
  <form
    class="form"
    @submit.prevent="submit"
  >
    <div class="form__section">
      <FormFieldset
        legend="Общее"
        class="form__section"
      >
        <ValidationWrapper
          v-for="(key, i) in ['surname', 'name', 'patronymic']"
          :key="i"
          class="form__field"
          :vuelidateObj="$v"
          :inputData="formData[key]"
        >
          <FormGroup
            :vuelidateObj="$v"
            :inputData="formData[key]"
          />
        </ValidationWrapper>
        <DateFormField
          class="form__field"
          :legend="'Дата рождения'"
          :vuelidateObj="$v"
          :rootFormData="formData"
          :flattenedDataKeysBase="'birthDateParts'"
        />
        <ValidationWrapper
          class="form__field"
          :inputData="formData.phoneNumber"
          :vuelidateObj="$v"
        >
          <FormGroup
            :vuelidateObj="$v"
            :inputData="formData.phoneNumber"
          />
        </ValidationWrapper>
        <FormFieldset
          class="form__field"
          :inputData="formData.gender"
          :type="'radio'"
          legend="Пол"
          legendSize="sm"
          inline
          noFlexStretch
        >
          <FormGroup
            v-for="(data, i) in formData.genders"
            :key="i"
            :inputData="data"
            :type="'radio'"
            :selectedValueData="formData.gender"
            :selectedValueDataKey="'gender'"
            inline
          />
        </FormFieldset>
        <FormGroup
          class="form__field"
          :options="formData.attendingPhysicians"
          :inputData="formData.attendingPhysician"
          :type="'select'"
        />
        <ValidationWrapper
          class="form__field"
          :vuelidateObj="$v"
          :inputData="formData.clientGroupsData"
          :type="'select'"
        >
          <FormGroup
            :vuelidateObj="$v"
            :options="formData.clientGroupsOptions"
            :inputData="formData.clientGroupsData"
            :type="'select'"
            :tip="`
              ctrl + клик левой кнопкой мыши для множественного выбора,
              ctrl + клик по выбранному варианту для отмены выбора
            `"
            multiple
          />
        </ValidationWrapper>
        <FormGroup
          :inputData="formData.doNotSendSMS"
          :type="'checkbox'"
          inline
        />
      </FormFieldset>
      <FormFieldset
        legend="Адрес"
        class="form__section"
      >
        <ValidationWrapper
          v-for="(key, i) in [
            'postalCode',
            'country',
            'city',
            'region',
            'street',
            'house',
          ]"
          :key="i"
          :class="{ 'form__field': key !== 'house' }"
          :vuelidateObj="$v"
          :inputData="formData[key]"
        >
          <FormGroup
            :vuelidateObj="$v"
            :inputData="formData[key]"
          />
        </ValidationWrapper>
      </FormFieldset>
      <FormFieldset legend="Паспорт">
        <ValidationWrapper
          class="form__field"
          :inputData="formData.documentType"
          :vuelidateObj="$v"
          :type="'select'"
        >
          <FormGroup
            :vuelidateObj="$v"
            :options="formData.documentTypes"
            :inputData="formData.documentType"
            :type="'select'"
          />
        </ValidationWrapper>
        <div class="form__field form__inline-childs">
          <ValidationWrapper
            v-for="(key, i) in ['passportSeries', 'passportNumber']"
            :key="i"
            :inputData="formData[key]"
            :vuelidateObj="$v"
          >
            <FormGroup
              :vuelidateObj="$v"
              :inputData="formData[key]"
            />
          </ValidationWrapper>
        </div>
        <ValidationWrapper
          class="form__field"
          :inputData="formData.passportIssuedBy"
          :vuelidateObj="$v"
          :type="'textarea'"
        >
          <FormGroup
            :vuelidateObj="$v"
            :inputData="formData.passportIssuedBy"
            :type="'textarea'"
          />
        </ValidationWrapper>
        <DateFormField
          :legend="'Дата выдачи'"
          :vuelidateObj="$v"
          :rootFormData="formData"
          :flattenedDataKeysBase="'dateOfIssueParts'"
        />
      </FormFieldset>
    </div>
    <VButton
      class="form__button form__section"
      type="submit"
      :disabled="submitStatus === 'PENDING'"
    >
      Отправить
    </VButton>
    <p v-if="submitStatus">
      {{ submitStatusMessages[submitStatus] }}
    </p>
  </form>
</template>
<!-- eslint-enable -->

<script>
  import {
    required,
    numeric,
    maxLength,
    helpers,
  } from 'vuelidate/lib/validators';
  import {
    nameOfSomethingRu,
    length,
  } from '@/js/functions/libs/vuelidate/validators-custom';
  import {
    shapeAndPossiblyNormalizeInputsDataObj,
    flattenCombinedInputsDataForEachDataKey,
  } from '@/utils/helpers/libs/vuelidate';
  import { delay } from '@/utils/helpers';
  import { reset } from '@/mixins';
  import FormFieldset from './FormFieldset';
  import FormGroup from './FormGroup';
  import ValidationWrapper from './ValidationWrapper';
  import DateFormField, {
    dateFormFieldData,
    dateFormFieldValidations,
  } from './DateFormField';

  export default {
    components: {
      FormFieldset,
      FormGroup,
      ValidationWrapper,
      DateFormField,
    },
    mixins: [
      reset(() => ({
        submitStatus: '',
        formData: shapeAndPossiblyNormalizeInputsDataObj([], {
          ...flattenCombinedInputsDataForEachDataKey([
            {
              keys: ['birthDateParts', 'dateOfIssueParts'],
              value: dateFormFieldData,
            },
          ]),
          surname: {
            label: 'Фамилия',
            placeholder: 'Иванов',
          },
          birthDatePartsDay: {
            label: 'День',
            placeholder: '20',
          },
          birthDatePartsMonth: {
            label: 'Месяц',
            placeholder: '05',
          },
          birthDatePartsYear: {
            label: 'Год',
            placeholder: '1995',
          },
          name: {
            label: 'Имя',
            placeholder: 'Иван',
          },
          patronymic: {
            label: 'Отчество',
            placeholder: 'Иванович',
          },
          phoneNumber: {
            label: 'Телефон',
            placeholder: '79998887766',
          },
          gender: {},
          genders: [
            {
              id: 'man',
              labelAndValue: 'Мужской',
            },
            {
              id: 'woman',
              labelAndValue: 'Женский',
            },
          ],
          attendingPhysician: {
            label: 'Лечащий врач',
          },
          attendingPhysicians: ['Иванов', 'Захаров', 'Чернышева'],
          clientGroupsData: {
            value: [],
            label: 'Группа клиентов',
          },
          clientGroupsOptions: [
            {
              value: 'vip',
              text: 'VIP',
            },
            {
              value: 'problematic',
              text: 'Проблемные',
            },
            {
              value: 'chi',
              text: 'ОМС',
            },
          ],
          doNotSendSMS: {
            value: false,
            label: 'Не отправлять СМС',
          },
          postalCode: {
            label: 'Индекс',
            placeholder: '142780',
          },
          country: {
            label: 'Страна',
            placeholder: 'Россия',
          },
          city: {
            label: 'Город',
            placeholder: 'Москва',
          },
          region: {
            label: 'Область',
            placeholder: 'Московская',
          },
          street: {
            label: 'Улица/Бульвар/Проспект/Шоссе или подобное',
            placeholder: 'Ленина',
          },
          house: {
            label: 'Дом',
            placeholder: '5',
          },
          documentType: {
            label: 'Тип документа',
          },
          documentTypes: [
            {
              value: 'passport',
              text: 'Паспорт',
            },
            {
              value: 'birthCertificate',
              text: 'Свидетельство о рождении',
            },
            {
              value: 'driversLicense',
              text: 'Вод. удостоверение',
            },
          ],
          passportSeries: {
            label: 'Серия',
            placeholder: '99 99',
          },
          passportNumber: {
            label: 'Номер',
            placeholder: '999999',
          },
          passportIssuedBy: {
            label: 'Кем выдан',
            placeholder:
              'Отделом внутренних дел Одинцовского района города Москвы',
          },
        }),
      })),
    ],
    data() {
      return {
        submitStatusMessages: {
          ANY_ERROR: 'Пожалуйста, заполните форму правильно',
          ALL_REQUIRED_ERROR: `
            Пожалуйста, заполните все обязательные поля формы, они отмечены
            красной звёздочкой
          `,
          PENDING: 'Отправляем...',
          OK: 'Новый пользователь успешно создан',
        },
      };
    },
    mounted() {
      this.$evBus.$on('changed-value-or-values', ({ dataKey, newValue }) => {
        this.formData[dataKey] = {
          ...this.formData[dataKey],
          value: newValue,
        };
      });
    },
    validations: {
      formData: shapeAndPossiblyNormalizeInputsDataObj(
        [
          {
            keys: ['surname', 'patronymic', 'city'],
            value: {
              required,
              nameOfSomethingRu,
              maxLength: maxLength(2000),
            },
          },
          {
            keys: ['name', 'country', 'region', 'street'],
            value: {
              nameOfSomethingRu,
              maxLength: maxLength(2000),
            },
          },
          {
            keys: ['clientGroupsData', 'documentType'],
            value: {
              required,
            },
          },
        ],
        {
          ...flattenCombinedInputsDataForEachDataKey([
            {
              keys: ['birthDateParts', 'dateOfIssueParts'],
              value: dateFormFieldValidations,
            },
          ]),
          phoneNumber: {
            required,
            numeric,
            length: length(11),
            startsWith: ((char) => {
              return helpers.withParams(
                { type: 'startsWith', value: char },
                (value) => {
                  return value.startsWith(char);
                },
              );
            })('7'),
          },
          postalCode: {
            postalCode: helpers.regex(
              'postalCode',
              // https://stackoverflow.com/a/19844362
              // removed (?i) because `Invalid regular expression:
              // /(?i)^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/: Invalid group`
              // https://stackoverflow.com/a/3561287
              /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/,
            ),
            maxLength: maxLength(2000),
          },
          house: {
            house: helpers.regex(
              'house',
              // https://qna.habr.com/q/451633
              /^[1-9][0-9]*([a-z]|[а-яё]|(\/[1-9][0-9]*))?$/i,
            ),
            maxLength: maxLength(2000),
          },
          passportSeries: {
            passportSeries: helpers.regex(
              'passportSeries',
              // https://www.elma-bpm.ru/KB/article-6127.html
              /^[0-9]{2}(\s{1})?[0-9]{2}$/,
            ),
          },
          passportNumber: {
            numeric,
            length: length(6),
          },
          passportIssuedBy: {
            alphaRu: (value) => {
              const occurRegexesData = {
                anyLetter: /\p{L}/gu,
                letterRu: /[А-Яа-яёЁ]/g,
              };
              const occurNumbersData = Object.fromEntries(
                Object.entries(occurRegexesData).map(([key, regex]) => {
                  return [`${key}Num`, (value.match(regex) || []).length];
                }),
              );
              const { anyLetterNum, letterRuNum } = occurNumbersData;
              return anyLetterNum === letterRuNum;
            },
            maxLength: maxLength(2000),
          },
        },
        true,
      ),
    },
    methods: {
      async submit() {
        const vuelidateObj = this.$v;
        if (vuelidateObj.$anyError) {
          this.submitStatus = 'ANY_ERROR';
        } else if (this.checkAnyFieldReuiredValidationFailed()) {
          this.submitStatus = 'ALL_REQUIRED_ERROR';
        } else {
          this.submitStatus = 'PENDING';
          await delay(1000);
          this.submitStatus = 'OK';
          this.resetForm();
        }
      },
      resetForm() {
        this.$v.$reset();
        this.reset('formData');
      },
      checkAnyFieldReuiredValidationFailed() {
        const { formData } = this.$v;
        return Object.keys(formData).some((key) => {
          const value = formData[key];

          return (
            value &&
            typeof value === 'object' &&
            value.value &&
            'required' in value.value &&
            value.value.required === false
          );
        });
      },
    },
  };
</script>

<style lang="scss">
  .form {
    &__section {
      margin-bottom: 25px;
    }

    &__field {
      margin-bottom: 15px;
    }

    &__inline-childs {
      display: flex;

      > * {
        flex: 1 1 0;
      }

      > * + * {
        margin-left: 20px;
      }
    }
  }
</style>
