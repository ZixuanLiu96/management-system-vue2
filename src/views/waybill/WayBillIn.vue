<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-row :gutter="24">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
        >
          <el-col :span="12">
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Cargo name" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="Order number" prop="waybillNo">
              <el-input v-model="ruleForm.waybillNo"></el-input>
            </el-form-item>
            <el-form-item label="Company" prop="company">
              <el-select
                v-model="ruleForm.company"
                placeholder="请选择货物单位"
              >
                <el-option label="诺来科技有限公司" value="nuolai"></el-option>
                <el-option label="辉华股份有限公司" value="huihua"></el-option>
                <el-option
                  label="川聚物流有限公司"
                  value="chuangju"
                ></el-option>
                <el-option
                  label="成越材料有限公司"
                  value="chengyue"
                ></el-option>
                <el-option label="聚博纺织有限公司" value="jubo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Creating time" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    placeholder="Pick a date"
                    v-model="ruleForm.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker
                    placeholder="Pick a time"
                    v-model="ruleForm.date2"
                    style="width: 100%"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="Address" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="Delivery method" prop="method">
              <el-radio-group v-model="ruleForm.method">
                <el-radio label="Personal"></el-radio>
                <el-radio label="Company"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Format" prop="format">
              <el-input v-model="ruleForm.format"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Cargo name" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="Order number" prop="waybillNo">
              <el-input v-model="ruleForm.waybillNo"></el-input>
            </el-form-item>
            <el-form-item label="Company" prop="campany">
              <el-select
                v-model="ruleForm.company"
                placeholder="请选择货物单位"
              >
                <el-option label="诺来科技有限公司" value="nuolai"></el-option>
                <el-option label="辉华股份有限公司" value="huihua"></el-option>
                <el-option
                  label="川聚物流有限公司"
                  value="chuangju"
                ></el-option>
                <el-option
                  label="成越材料有限公司"
                  value="chengyue"
                ></el-option>
                <el-option label="聚博纺织有限公司" value="jubo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" Creating time" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    placeholder="Pick a date"
                    v-model="ruleForm.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker
                    placeholder="Pick a time"
                    v-model="ruleForm.date2"
                    style="width: 100%"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="Address" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="Delivery method" prop="method">
              <el-radio-group v-model="ruleForm.method">
                <el-radio label="Personal"></el-radio>
                <el-radio label="Company"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Format" prop="format">
              <el-input v-model="ruleForm.format"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Create</el-button
              >
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "../../mixins/breadCrumb";

export default {
  mixins: [breadCrumb],
  data() {
    return {
      ruleForm: {
        name: "",
        company: "",
        waybillNo: "",
        cargo: "",
        format: "",
        address: "",
        date1: "",
        date2: "",
        method: "",
        delivery: false,
      },
      rules: {
        name: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        company: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        waybillNo: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        cargo: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        date1: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        date2: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        method: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        format: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
        company: [
          { required: true, trigger: "blur", message: "shouldn't be empty" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$router.push("/waybill/list");
        }
      });
    },
    resetForm() {
      this.ruleForm = {
        name: "",
        company: "",
        waybillNo: "",
        cargo: "",
        format: "",
        address: "",
        date1: "",
        date2: "",
        method: "",
        delivery: false,
      };
    },
  },
};
</script>

<style lang="less" scoped></style>
