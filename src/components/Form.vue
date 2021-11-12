<template>
  <div class="form-wrapper">
    <form id="form" name="form" class="form" @submit.prevent="sendForm">
      <span class="required-example">Поле обязательное для заполнения</span>
      <fieldset class="personal-info">
        <legend>Личные данные</legend>
        <label class="surname required">
          Фамилия
          <input
            type="text"
            name="surname"
            placeholder="Иванов"
            required
            v-model="formData.surname"
          />
        </label>
        <label class="name required">
          Имя
          <input
            type="text"
            name="name"
            placeholder="Иван"
            required
            v-model="formData.name"
          />
        </label>
        <label class="patronym optional">
          Отчество
          <input
            type="text"
            name="patronym"
            placeholder="Иванович"
            v-model="formData.patronym"
          />
        </label>
        <label class="birthdate required">
          Дата рождения
          <input
            type="date"
            name="birthdate"
            required
            v-model="formData.birthdate"
          />
        </label>
        <label class="email optional">
          Email
          <input
            type="email"
            name="email"
            placeholder="ivanov@yandex.ru"
            v-model="formData.email"
          />
        </label>
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
      <!-- eslint хочет удалить кавычки в 'foreign'-->
      <!-- eslint-disable-next-line -->
      <fieldset :class="['pass', { 'foreign': isForeigner }]">
        <legend>Паспортные данные</legend>
        <div class="pass__citizenship-wrapper required">
          <span class="label">Гражданство</span>
          <!-- debounce = 250 by default -->
          <v-super-select
            class="pass__citizenship"
            :items="citizenships"
            value-field="nationality"
            text-field="nationality"
            :show-value="false"
            :value="formData.passCountry"
            placeholder="Выберите гражданство "
            none-found-text="Ничего не найдено"
            input-width="100%"
            input-height="45px"
            :debounceTime="500"
            @change="selectCitizenshipDropdown"
          />
        </div>
        <div class="pass__country-wrapper required" v-if="isForeigner">
          <span class="label">Страна выдачи</span>
          <v-super-select
            class="pass__country"
            :items="citizenships"
            value-field="nationality"
            text-field="nationality"
            :show-value="false"
            :value="formData.passCountry"
            placeholder="Выберите страну"
            none-found-text="Ничего не найдено"
            input-width="100%"
            input-height="45px"
            @change="selectPassCountryDropdown"
          />
        </div>
        <div class="pass__type-wrapper required" v-if="isForeigner">
          <span class="label">Тип паспорта</span>
          <v-super-select
            class="pass__type"
            :items="passTypes"
            value-field="type"
            text-field="type"
            :show-value="false"
            :value="formData.passType"
            placeholder="Выберите тип"
            none-found-text="Ничего не найдено"
            input-width="100%"
            input-height="45px"
            @change="selectPassTypeDropdown"
          />
        </div>
        <label class="foreign-surname required" v-if="isForeigner">
          Фамилия на латинице
          <input
            type="text"
            name="foreign-surname"
            placeholder="Ivanov"
            required
            v-model="formData.foreignSurname"
          />
        </label>
        <label class="foreign-name required" v-if="isForeigner">
          Имя на латинице
          <input
            type="text"
            name="foreign-name"
            placeholder="Ivan"
            required
            v-model="formData.foreignName"
          />
        </label>
        <span class="for-foreigners-info" v-if="isForeigner"
          >Иностранцы заполняют ланинскими буквами
        </span>
        <label class="pass__serie required" v-if="!isForeigner">
          Серия
          <input
            type="number"
            name="serie"
            placeholder="1234"
            v-model="formData.passSerie"
          />
        </label>
        <label class="pass__number required">
          Номер
          <input
            type="number"
            name="number"
            class="length6"
            placeholder="123456"
            v-model="formData.passNumber"
          />
        </label>
        <label class="pass__date optional" v-if="!isForeigner">
          Дата выдачи
          <input
            type="date"
            name="pass__date"
            placeholder="Дата выдачи"
            required
            v-model="formData.passDate"
          />
        </label>
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
        <label
          class="changed-initials__surname required"
          v-if="hasChangedInitials"
        >
          Прежняя фамилия
          <input
            type="text"
            name="former-surname"
            class="surname"
            required
            v-model="formData.formerSurname"
          />
        </label>
        <label
          class="changed-initials__name required"
          v-if="hasChangedInitials"
        >
          Прежнее имя
          <input
            type="text"
            name="former-name"
            class="name"
            required
            v-model="formData.formerName"
          />
        </label>
      </fieldset>
      <p class="success-sent" v-if="formSent">
        Ваши данные успешно отправлены!
      </p>
      <!-- <button type="submit" class="btn submit" :disabled="!formDone"> -->
      <button type="submit" class="btn submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passTypes from "@/assets/data/passport-types.json";
import VSuperSelect from "v-super-select";

export default {
  name: "Form",
  components: { VSuperSelect },
  data() {
    return {
      formData: {
        surname: "",
        name: "",
        patronym: "",
        birthdate: "",
        email: "",
        genderChosen: "male",
        changedInitials: "no",
        citizenship: "",
        foreignSurname: "",
        foreignName: "",
        passCountry: "",
        passType: "",
        passSerie: "",
        passNumber: "",
        passDate: "",
        formerSurname: "",
        formerName: "",
      },
      formSent: false,
      // formDone: false,
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
      return this.formData.citizenship !== "Russia";
    },
    hasChangedInitials() {
      return this.formData.changedInitials === "yes";
    },
  },
  methods: {
    // нужно для v-super-select, для его внутреннего key
    // key = пропса value + index + "item", извне не меняется
    // пропс value также отвечает за v-model, поэтому его нельзя изменить на уникальный id
    filterUniqueNationalities() {
      this.citizenships = this.citizenships.sort((a, b) =>
        a.nationality > b.nationality
          ? 1
          : b.nationality > a.nationality
          ? -1
          : 0
      );
      this.citizenships = this.citizenships.filter((value, index, array) => {
        if (array[index - 1]) {
          return array[index - 1].nationality !== value.nationality;
        }
      });
    },
    selectCitizenshipDropdown(value) {
      this.formData.citizenship = value;
    },
    selectPassTypeDropdown(value) {
      this.formData.passType = value;
    },
    selectPassCountryDropdown(value) {
      this.formData.passCountry = value;
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
