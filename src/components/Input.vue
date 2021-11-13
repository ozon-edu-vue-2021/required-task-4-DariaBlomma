<template>
  <div :class="blockClass">
    <label :class="{ required: isRequired }">
      {{ label }}
      <input
        :class="{
          invalid: !isValid,
          valid: isValid && inputValue,
        }"
        :type="inputType"
        :name="blockClass"
        :placeholder="placeholder"
        :required="isRequired"
        v-model="inputValue"
        @blur="checkValidity"
      />
    </label>
    <span v-if="!isValid" class="error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
import validators from "@/constants/regexp";

export default {
  name: "Input",
  props: {
    blockClass: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    inputType: {
      type: String,
      required: false,
      default: "text",
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    errorMessage: {
      type: String,
      required: true,
    },
    validator: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      isValid: true,
      inputValue: "",
    };
  },
  created() {
    const inputInfo = this.makeInputInfo();
    this.$emit("send-field-info", inputInfo);
  },
  methods: {
    checkValidity({ target: { value } }) {
      value = value.trim();
      if (this.validator) {
        let test;
        if (this.validator === "date") {
          test = +new Date(value) < Date.now();
        } else {
          test = validators[this.validator].test(value);
        }

        if (!test) {
          this.isValid = false;
        } else {
          this.isValid = true;
        }
      }

      const inputInfo = this.makeInputInfo();
      this.$emit("send-field-info", inputInfo);
    },
    makeInputInfo() {
      return {
        name: this.blockClass,
        required: this.isRequired,
        valid: this.isValid,
        value: this.inputValue,
      };
    },
  },
};
</script>
