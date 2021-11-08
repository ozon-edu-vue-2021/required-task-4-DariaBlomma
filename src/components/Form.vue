<template>
  <div class="form-wrapper">
    <form id="form" name="form" class="form">
      <p>
        <span class="form__must-mark"> * </span>
        <i>Поле обязательное для заполнения</i>
      </p>
      <fieldset class="form__personal-info">
        <legend>Личные данные</legend>
        <label class="form__surname required">
          Фамилия
          <input type="text" name="surname" required />
        </label>
        <label class="form__name required">
          Имя
          <input type="text" name="name" required />
        </label>
        <label class="form__patronym optional">
          Отчество
          <input type="text" name="patronym" />
        </label>
        <label class="form__birthdate required birthdate">
          Дата рождения
          <input type="date" name="birthdate" required />
          <!-- <input
            type="text"
            name="birthdate"
            class="birthdate"
            placeholder="Дата рождения"
            required
          /> -->
        </label>
        <label class="form__email optional">
          Email
          <input type="email" name="email"  placeholder="Email" />
        </label>
        <div class="form__gender">
          <h3>Пол</h3>
          <div class="form__gender-line">
            <input
              type="radio"
              name="gender"
              class="male"
              value="male"
              checked
            />
            Мужской
          </div>
          <div class="form__gender-line">
            <input type="radio" name="gender" class="female" value="female" />
            Женский
          </div>
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
