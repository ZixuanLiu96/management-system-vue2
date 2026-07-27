<template>
  <div>
    <el-dialog
      :title="title"
      :visible="visible"
      width="60%"
      @close="handleClose"
    >
      <el-row :gutter="24">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起始城市" prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="目的城市" prop="end">
              <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="count">
              <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="订单来源" prop="from">
              <el-radio-group v-model="ruleForm.from">
                <el-radio label="移动端"></el-radio>
                <el-radio label="pc端"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支付" prop="pay">
              <el-radio-group v-model="ruleForm.pay">
                <el-radio :label="2">未支付</el-radio>
                <el-radio :label="1">已支付</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post } from "../../utils/http";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        start: "",
        end: "",
        unit: "",
        price: "",
        from: "",
        cargo: "",
        pay: "",
        count: "",
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "不能为空" }],
        start: [{ required: true, trigger: "blur", message: "不能为空" }],
        end: [{ required: true, trigger: "blur", message: "不能为空" }],
        price: [{ required: true, trigger: "blur", message: "不能为空" }],
        unit: [{ required: true, trigger: "blur", message: "不能为空" }],
        cargo: [{ required: true, trigger: "blur", message: "不能为空" }],
        pay: [{ required: true, trigger: "change", message: "不能为空" }],
        from: [{ required: true, trigger: "change", message: "不能为空" }],
        count: [{ required: true, trigger: "blur", message: "不能为空" }],
      },
      title: "",
    };
  },
  watch: {
    visible() {
      console.log(this.formData);
      const { name, cargo, pay, from, start, end, price, count, unit } =
        this.formData;
      this.ruleForm = {
        name,
        cargo,
        pay,
        from,
        start,
        end,
        price,
        count,
        unit,
      };
      // if (this.formData.pay == 1) {
      //   this.ruleForm.pay = "未支付";
      // } else if (this.formData.pay == 2) {
      //   this.ruleForm.pay = "已支付";
      // }
      this.title = name ? "编辑订单" : "新建订单";
    },
  },
  props: ["visible", "formData"],
  methods: {
    handleClose() {
      this.$emit("hide");
    },
    save() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { message } = await post("/addOrder", this.ruleForm);
          this.$message({
            message,
            type: "success",
          });
          this.$emit("reload");
          this.handleClose();
          this.ruleForm = {
            name: "",
            start: "",
            end: "",
            unit: "",
            price: "",
            from: "",
            cargo: "",
            pay: "",
            count: "",
          };
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
