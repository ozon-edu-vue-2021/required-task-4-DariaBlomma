<template>
  <div class="form-wrapper">
    <form id="form" name="form" class="form" @submit.prevent="sendForm">
      <span class="required-example">Поле обязательное для заполнения</span>
      <fieldset class="personal-info">
        <legend>Личные данные</legend>
        <Input
          block-class="surname"
          label="Фамилия"
          is-required
          placeholder="Иванов"
          error-message="Введите русские буквы"
          validator="ruLetters"
          @send-field-info="collectFormData"
        />
        <Input
          block-class="name"
          label="Имя"
          is-required
          placeholder="Иван"
          error-message="Введите русские буквы"
          validator="ruLetters"
          @send-field-info="collectFormData"
        />
        <Input
          block-class="patronym"
          label="Отчество"
          placeholder="Иванович"
          error-message="Введите русские буквы"
          validator="ruLetters"
          @send-field-info="collectFormData"
        />
        <Input
          block-class="birthdate"
          input-type="date"
          label="Дата рождения"
          is-required
          error-message="Введите валидную дату"
          validator="date"
          @send-field-info="collectFormData"
        />
        <Input
          block-class="email"
          input-type="email"
          label="Email"
          placeholder="ivanov@yandex.ru"
          error-message="Введите валидный email"
          validator="email"
          @send-field-info="collectFormData"
        />
        <div class="gender">
          <div class="gender__title">Пол</div>
          <div class="gender__body">
            <label class="gender__line">
              <input
                type="radio"
                name="gender"
                class="male"
                value="male"
                v-model="formData.genderChosen"
              />
              Мужской
            </label>
            <label class="form__gender-line">
              <input
                type="radio"
                name="gender"
                class="female"
                value="female"
                v-model="formData.genderChosen"
              />
              Женский
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset :class="['pass', { foreign: isForeigner }]">
        <legend>Паспортные данные</legend>
        <div class="pass__citizenship-wrapper required">
          <span class="label">Гражданство</span>
          <!-- debounce = 250 by default -->
          <v-super-select
            :class="{
              invalid: formData.citizenship.value && !selectCitizenshipValid,
              valid: selectCitizenshipValid,
            }"
            class="pass__citizenship"
            :items="citizenships"
            value-field="nationality"
            text-field="nationality"
            :show-value="false"
            :value="formData.citizenship.value"
            placeholder="Выберите гражданство "
            none-found-text="Ничего не найдено"
            input-width="100%"
            input-height="45px"
            :debounceTime="500"
            @change="selectCitizenshipDropdown"
            @opened="citizenshipSelectOpened"
          />
          <span
            v-if="formData.citizenship.value && !selectCitizenshipValid"
            class="error-message"
          >
            Выберите гражданство
          </span>
        </div>
        <div class="pass__country-wrapper required" v-if="isForeigner">
          <span class="label">Страна выдачи</span>
          <v-super-select
            :class="{
              invalid: formData.passCountry.value && !selectPassCountryValid,
              valid: selectPassCountryValid,
            }"
            class="pass__country"
            :items="citizenships"
            value-field="nationality"
            text-field="nationality"
            :show-value="false"
            :value="formData.passCountry.value"
            placeholder="Выберите страну"
            none-found-text="Ничего не найдено"
            input-width="100%"
            input-height="45px"
            @change="selectPassCountryDropdown"
            @opened="passCountrySelectOpened"
          />
          <span
            v-if="formData.passCountry.value && !selectPassCountryValid"
            class="error-message"
          >
            Выберите страну
          </span>
        </div>
        <div class="pass__type-wrapper required" v-if="isForeigner">
          <span class="label">Тип паспорта</span>
          <v-super-select
            :class="{
              invalid: formData.passType.value && !selectPassTypeValid,
              valid: selectPassTypeValid,
            }"
            class="pass__type"
            :items="passTypes"
            value-field="type"
            text-field="type"
            :show-value="false"
            :value="formData.passType.value"
            placeholder="Выберите тип"
            none-found-text="Ничего не найдено"
            input-width="100%"
            input-height="45px"
            @change="selectPassTypeDropdown"
            @opened="passTypeSelectOpened"
          />
          <span
            v-if="formData.passType.value && !selectPassTypeValid"
            class="error-message"
          >
            Выберите тип
          </span>
        </div>
        <Input
          v-if="isForeigner"
          block-class="foreign-surname"
          label="Фамилия на латинице"
          is-required
          placeholder="Ivanov"
          error-message="Введите фвмилию на латинице"
          validator="enLetters"
          @send-field-info="collectFormData"
        />
        <Input
          v-if="isForeigner"
          block-class="foreign-name"
          label="Имя на латинице"
          is-required
          placeholder="Ivan"
          error-message="Введите имя на латинице"
          validator="enLetters"
          @send-field-info="collectFormData"
        />
        <span v-if="isForeigner" class="for-foreigners-info"
          >Иностранцы заполняют ланинскими буквами
        </span>
        <Input
          v-if="!isForeigner"
          block-class="pass__serie"
          input-type="number"
          label="Серия"
          is-required
          placeholder="1234"
          error-message="Введите 4 цифры"
          validator="length4"
          @send-field-info="collectFormData"
        />
        <Input
          block-class="pass__number"
          input-type="number"
          label="Номер"
          is-required
          placeholder="123456"
          error-message="Введите 6 цифр"
          :validator="passNumberValidator"
          @send-field-info="collectFormData"
        />
        <Input
          v-if="!isForeigner"
          block-class="pass__date"
          input-type="date"
          label="Дата выдачи"
          error-message="Введите валидную дату"
          validator="date"
          @send-field-info="collectFormData"
        />
        <div class="changed-initials">
          Меняли ли фамилию или имя?
          <div class="changed-initials__body">
            <label>
              <input
                type="radio"
                name="changedInitials"
                value="no"
                id="no"
                v-model="formData.changedInitials"
              />
              Нет
            </label>
            <label>
              <input
                type="radio"
                name="changedInitials"
                value="yes"
                id="yes"
                v-model="formData.changedInitials"
              />
              Да
            </label>
          </div>
        </div>
        <Input
          v-if="hasChangedInitials"
          block-class="changed-initials__surname"
          label="Прежняя фамилия"
          placeholder="Иванов"
          error-message="Введите русские буквы"
          validator="ruLetters"
          is-required
          @send-field-info="collectFormData"
        />
        <Input
          v-if="hasChangedInitials"
          block-class="changed-initials__name"
          label="Прежнее имя"
          placeholder="Иван"
          error-message="Введите русские буквы"
          validator="ruLetters"
          is-required
          @send-field-info="collectFormData"
        />
      </fieldset>
      <p class="success-sent" v-if="formSent">
        Ваши данные успешно отправлены!
      </p>
      <button type="submit" class="btn submit" :disabled="!formDone">
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passTypes from "@/assets/data/passport-types.json";
import VSuperSelect from "v-super-select";
import Input from "@/components/Input.vue";

export default {
  name: "Form",
  components: { VSuperSelect, Input },
  data() {
    return {
      formData: {
        changedInitials: "no",
        genderChosen: "male",
        citizenship: {
          required: true,
          value: "",
          selected: false,
          opened: false,
        },
        passType: {
          required: this.isForeigner ? true : false,
          value: "",
          selected: false,
          opened: false,
        },
        passCountry: {
          required: this.isForeigner ? true : false,
          value: "",
          selected: false,
          opened: false,
        },
      },
      requiredLength: 0,
      requiredFilledLength: 0,
      invalidLength: 0,
      ruLettersCheck: true,
      formSent: false,
      // json files
      citizenships,
      passTypes,
    };
  },
  created() {
    this.filterUniqueNationalities();
  },
  computed: {
    isForeigner() {
      return (
        this.formData.citizenship.value !== "Russia" &&
        this.formData.citizenship.value !== ""
      );
    },
    hasChangedInitials() {
      return this.formData.changedInitials === "yes";
    },
    formDone() {
      return (
        this.requiredLength === this.requiredFilledLength &&
        this.invalidLength === 0
      );
    },
    selectCitizenshipValid() {
      return (
        this.formData.citizenship.value &&
        this.formData.citizenship.opened === true &&
        this.formData.citizenship.selected === true
      );
    },
    selectPassCountryValid() {
      return (
        this.formData.passCountry.value &&
        this.formData.passCountry.opened === true &&
        this.formData.passCountry.selected === true
      );
    },
    selectPassTypeValid() {
      return (
        this.formData.passType.value &&
        this.formData.passType.opened === true &&
        this.formData.passType.selected === true
      );
    },
    passNumberValidator() {
      return this.isForeigner ? "" : "length6";
    },
  },
  methods: {
    // нужно для v-super-select, для его внутреннего key
    // key = пропса value + index + "item", извне не меняется
    // пропс value также отвечает за v-model, поэтому его нельзя изменить на уникальный id
    filterUniqueNationalities() {
      this.citizenships = this.citizenships.sort((a, b) => {
        if (a.nationality > b.nationality) {
          return 1;
        } else if (b.nationality > a.nationality) {
          return -1;
        } else {
          return 0;
        }
      });
      this.citizenships = this.citizenships.filter((value, index, array) => {
        if (array[index - 1]) {
          return array[index - 1].nationality !== value.nationality;
        }
      });
    },
    selectCitizenshipDropdown(value) {
      this.formData.citizenship.value = value;
      this.formData.citizenship.selected = true;
    },
    selectPassTypeDropdown(value) {
      this.formData.passType.value = value;
      this.formData.passType.selected = true;
    },
    selectPassCountryDropdown(value) {
      this.formData.passCountry.value = value;
      this.formData.passCountry.selected = true;
    },
    citizenshipSelectOpened() {
      this.formData.citizenship.opened = true;
      this.formData.citizenship.selected = false;
    },
    passCountrySelectOpened() {
      this.formData.passCountry.opened = true;
      this.formData.passCountry.selected = false;
    },
    passTypeSelectOpened() {
      this.formData.passType.opened = true;
      this.formData.passType.selected = false;
    },
    collectFormData(field) {
      this.formData[field.name] = field;
      this.updateFormDoneStatus();
    },
    updateFormDoneStatus() {
      let requiredLength = 0;
      let requiredFilledLength = 0;
      let invalidLength = 0;
      Object.values(this.formData).forEach((item) => {
        if (item.required === true) {
          requiredLength++;
          if (item.value !== "") {
            requiredFilledLength++;
          }
        }

        if (item.valid === false) {
          invalidLength++;
        }
      });

      this.requiredLength = requiredLength;
      this.requiredFilledLength = requiredFilledLength;
      this.invalidLength = invalidLength;
    },
    sendForm() {
      this.formSent = true;
      console.log("formData", JSON.stringify(this.formData));
      setTimeout(() => {
        this.formSent = false;
      }, 3000);
    },
  },
};
</script>
