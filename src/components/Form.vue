<template>
  <div class="form-wrapper">
    <form id="form" name="form" class="form">
      <p>
        <span class="form__must-mark"> * </span>
        <i>Поле обязательное для заполнения</i>
      </p>
      <fieldset class="form__personal-info">
        <legend>Личные данные</legend>
        <label class="surname-elem required">
          Фамилия
          <input type="text" name="surname" class="surname" required />
        </label>
        <label class="name-elem required">
          Имя
          <input type="text" name="name" class="name" required />
        </label>
        <label class="patronym-elem optional">
          Отчество
          <input type="text" name="patronym" class="patronym" />
        </label>
        <label class="birthdate-elem required birthdate">
          Дата рождения
          <input type="date" name="birthdate" class="birthdate" required />
          <!-- <input
            type="text"
            name="birthdate"
            class="birthdate"
            placeholder="Дата рождения"
            required
          /> -->
        </label>
        <label class="email-elem optional">
          Email
          <input type="email" name="email" class="email" placeholder="Email" />
        </label>
        <div class="gender-wrapper">
          <h3>Пол</h3>
          <span>
            <input
              type="radio"
              name="gender"
              class="male"
              value="male"
              checked
            />
            Мужской
          </span>
          <span>
            <input type="radio" name="gender" class="female" value="female" />
            Женский
          </span>
        </div>
      </fieldset>
      <fieldset class="pass-group">
        <legend>Паспортные данные</legend>
        <div class="document-wrapper">
          <h3 class="required">Гражданство</h3>
          <select class="document-type" name="document-type" required>
            <option selected>Россия</option>
            <option>Свидетельство о рождении</option>
            <option>Вод. удостоверение</option>
          </select>
        </div>
        <label class="optional">
          <input
            type="number"
            name="pass-serie"
            class="pass-serie"
            placeholder="Серия"
          />
        </label>
        <label class="optional">
          <input
            type="number"
            name="pass-number"
            class="pass-number length6"
            placeholder="Номер"
          />
        </label>
        <label class="required pass-date-label">
          Дата выдачи
          <!-- <input type='date' name='pass-date' class='pass-date' placeholder='Дата выдачи' required> -->
          <input
            type="text"
            name="pass-date"
            class="pass-date"
            placeholder="Дата выдачи"
            required
          />
        </label>
        <label for="sms" class="sms-label">
          Меняли ли фамилию или имя?
          <p><input type="radio" name="changeName" value="No" id="no" />Нет</p>
          <p><input type="radio" name="changeName" value="Yes" id="yes" />Да</p>
        </label>
        <label class="required">
          <input
            type="text"
            name="surname"
            class="surname"
            placeholder="Фамилия"
            required
          />
        </label>
        <label class="required">
          <input
            type="text"
            name="name"
            class="name"
            placeholder="Имя"
            required
          />
        </label>
      </fieldset>
      <p class="success-sent d-none">Ваши данные успешно отправлены!</p>
      <button type="submit" class="btn submit">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.form {
}
</style>
