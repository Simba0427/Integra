<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 800px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <template
          v-for="(bi, index) in filterDeleteItem(jsonData)"
          :key="index"
        >
          <h4>{{ bi.title }}</h4>
          <div>
            <template
              v-for="(bi, index) in filterDeleteItem(bi.items)"
              :key="index"
            >
              <h5 style="margin: 5px">{{ bi.title }}</h5>
              <q-input
                filled
                v-if="bi.type === 2"
                v-model="model[bi.model]"
                :label="bi.label"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                v-if="bi.type === 0"
                v-model="model[bi.model]"
                filled
                type="textarea"
                :label="bi.label"
              />
              <q-checkbox
                v-if="bi.type === 1"
                v-model="model[bi.model]"
                :label="bi.label"
              />
              <div
                style="padding-left: 20px"
                class="q-gutter-sm"
                v-for="(bIteam, index1) in bi.items"
                :key="index1"
              >
                <h6 style="margin: 5px">{{ bIteam.title }}</h6>
                <q-input
                  v-if="bIteam.type === 0"
                  v-model="model[bIteam.model]"
                  filled
                  type="textarea"
                  :label="bIteam.label"
                />
                <q-checkbox
                  v-if="bIteam.type === 1"
                  v-model="model[bIteam.model]"
                  :label="bIteam.label"
                />
                <div
                  style="padding-left: 20px"
                  class="q-gutter-sm"
                  v-for="(bInternalIteam, index1) in filterDeleteItem(
                    bIteam.items
                  )"
                  :key="index1"
                >
                  <h6 style="margin: 5px">{{ bInternalIteam.title }}</h6>
                  <q-input
                    v-if="bInternalIteam.type === 0"
                    v-model="model[bInternalIteam.model]"
                    filled
                    type="textarea"
                    :label="bInternalIteam.label"
                  />
                  <q-checkbox
                    v-if="bInternalIteam.type === 1"
                    v-model="model[bInternalIteam.model]"
                    :label="bInternalIteam.label"
                  />
                </div>
              </div>
            </template>
          </div>
        </template>

        <div style="margin-top: 30px">
          <span style="font-size: 20px"> Please attach the pdf </span>

          <q-file
            filled
            bottom-slots
            v-model="pdfdata"
            label="pdf file"
            counter
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop="model = null"
                class="cursor-pointer"
              />
            </template>
          </q-file>
        </div>

        <div style="margin-top: 30px">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";
import fillOutJson, { modelData } from "../utils/fillout";
import { onBeforeUnmount } from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const model = ref(modelData);
    const pdfdata = ref(null);
    onBeforeUnmount(() => {
      $q.loading.hide();
    });

    async function loadData(data, fileName) {
      try {
        const response = await api.post("pdf/", data, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
          responseType: "blob",
        });
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });

        const blobUrl = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", fileName);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobUrl);
        return response.data;
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
        });
        console.log(error);
        return error;
      }
    }
    function replacer(key, value) {
      // console.log(value);
      if (typeof value === "boolean") {
        return value ? "YES" : "NO";
      }
      return value;
    }
    function getJson() {
      return this.fillOutJson;
    }
    return {
      model,
      fillOutJson,
      pdfdata,
      loadData,
      replacer,

      onSubmit: async () => {
        console.log("model.value", model.value);

        const formData = new FormData();
        formData.append("file", pdfdata.value);
        formData.append("meta_form", JSON.stringify(model.value, replacer));
        formData.append("data_form", JSON.stringify(model.value, replacer));
        formData.append("hide_qr", false);
        // formData.append("master_id", "sdfasdasdgasdgasdg");
        formData.append("cartridge_type", "");
        $q.loading.show({
          message: "Requesting... Please wait...",
          boxClass: "bg-grey-2 text-grey-9",
          spinnerColor: "primary",
        });
        // await loadData(formData, pdfdata.value.name);
        $q.loading.hide();
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      },
      onReset() {},
    };
  },
  methods: {
    getData(items) {
      let _this = this;
      let ret = {};
      for (const item of items) {
        if(item.is_deleted) continue;
        if (item.model) {
          ret = {
            ...ret,
            [item.model]: _this.defaultData(item.type),
          };
        } else {
          ret = {
            ...ret,
            ..._this.getData(item.items),
          };
        }
      }
      return ret;
    },
    defaultData(type) {
      switch (type) {
        case 2:
        case 0:
          return "";
        case 1:
          return false;
      }
      return "";
    },
    filterDeleteItem(items) {
      if (items == undefined || items == null) return true;
      return items.filter((item) => item.is_deleted != true);
    },
  },

  mounted() {
    if (
      this.$q.localStorage.getItem("jsonData") != undefined &&
      this.$q.localStorage.getItem("jsonData") != null
    )
      this.jsonData = JSON.parse(this.$q.localStorage.getItem("jsonData"));
    else this.jsonData = this.fillOutJson;
    this.model = this.getData(this.jsonData);
  },

  data() {
    return {
      jsonData: [],
    };
  },
};
</script>
