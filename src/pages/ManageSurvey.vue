<template>
  <div class="row q-pa-sm">
    <div class="col-10">
        <div class = "text-h6">
            Current version: {{versionToString()}}
        </div>
    </div>
  </div>

  <div id="q-tree-table  ">
    <div class="q-table-container q-table-dense">
      <div class="q-table-middle scroll">
        <table class="q-table">
          <thead>
            <tr class style="text-align: left">
              <th>Title</th>
              <th>Variable</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in arrayTreeObj"
              :key="index"
              v-bind:class="[
                item.id != selectedRowID.id
                  ? 'my-label'
                  : 'text-green bg-light-green-11',
                '',
              ]"
            >
              <td data-th="Title" @click="toggle(item, index)">
                <span
                  class="q-tree-link q-tree-label"
                  v-bind:style="setPadding(item)"
                >
                  <q-icon
                    style="cursor: pointer"
                    :name="iconName(item)"
                    color="secondary"
                  ></q-icon>
                  {{ item.title }}
                </span>
              </td>
              <td>
                {{ item.model }}
              </td>
              <td>
                {{
                  item.type === 0
                    ? "Input Area"
                    : item.type === 1
                    ? "Checkbox"
                    : item.type === 2
                    ? "Input Line"
                    : ""
                }}
              </td>
              <td width="10%" data-th="Actions">
                <q-btn dense flat color="blue" icon="add_circle">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section @click="view_add_one(item)"
                          >Add One</q-item-section
                        >
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section @click="view_update_one(item)"
                          >Update</q-item-section
                        >
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section @click="remove_one(item.parentArray)"
                          >Remove</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td
                style="
                  text-align: center;
                  width: 100%;
                  font-size: 1.8em;
                  cursor: pointer;
                "
                @click="add_new_big_title = true"
              >
                Create a new title
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
        v-if="changed_flag != 0"
        label="Submit"
        type="submit"
        color="primary"
        @click="submit_question_show = true"
        />
  </q-page-sticky>


  <q-dialog v-model="add_new_big_title" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Create a new title</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled v-model="new_big_title_input" :label="'New title'" />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="add_big_title()" />
        <q-btn flat label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="add_dialog_show" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">
          {{ method == "add" ? "Create a new question" : "Update a question" }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none row">
        <q-input
          type="textarea"
          filled
          v-model="add_title_input"
          :label="'New question title'"
          class="col-12 q-pa-sm"
        />
      </q-card-section>
      <q-card-section class="q-pt-none row">
        <q-input
          type="textarea"
          filled
          v-model="add_label_input"
          :label="'New question label'"
          class="col-12 q-pa-sm"
        />
      </q-card-section>
      <q-card-section class="q-pt-none row">
        <q-input
          filled
          v-model="add_variable_input"
          :label="'New question variable'"
          class="col-8 q-pa-sm"
          :readonly = "add_type_select == 'blank'"
        />
        <q-select
          filled
          v-model="add_type_select"
          :options="type_options"
          label="type"
          class="col-4 q-pa-sm"
        />
      </q-card-section>
      <q-card-section class="q-pt-none row" v-if="method == 'edit' && add_variable_input != undefined">
        <div class="q-pa-md">Change type</div>
        <div class="q-pa-md">
          <div class="q-gutter-sm">
            <q-checkbox
              v-model="update_type_different"
              label="Changed to a different question"
              @click="
                update_type_different = true;
                update_type_same = false;
              "
            />
          </div>
          <div class="q-gutter-sm">
            <q-checkbox
              v-model="update_type_same"
              label="Content is same"
              @click="
                update_type_different = false;
                update_type_same = true;
              "
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="add_one()" />
        <q-btn
          flat
          label="Cancel"
          @click="
            add_title_input = undefined;
            add_label_input = undefined;
            add_variable_input = undefined;
            add_type_select = undefined;
          "
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >Are you sure that you want to remove this question?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Remove" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="submit_question_show" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">
          Save a question set
        </div>
      </q-card-section>
      <q-card-section>
          <div class = "row " >
              <div class = "text-h6">
                  Previous version : {{versionToString()}}
              </div>
          </div>
          <div class = "row" >
              <div class = "text-h6">
                Current version : {{versionToString(changed_flag)}}
              </div>
          </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Submit" @click="submit_questionSet()" v-close-popup/>
        <q-btn flat label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";
import fillOutJson, { modelData } from "../utils/fillout";
import { onBeforeUnmount } from "vue";

export default {
  name: "#q-tree-table",
  setup() {
    return {
      // new_title,
      add_new_big_title: ref(false),
      new_big_title_input: ref(),
      confirm: ref(false),

      add_parent_array: ref([]),
      add_dialog_show: ref(false),
      add_title_input: ref(),
      add_label_input: ref(),
      add_variable_input: ref(),
      add_type_select: ref(),
      type_options: ref(["blank", "Input Area", "Checkbox", "Input Line"]),
      method: "", // add question or update question
      update_type_different: ref(false), // this means question is updated to different question(major)
      update_type_same: ref(true), // this means question has the same content(minor)
      changed_flag: ref(0), // 0: not any update or minor upate, 1: major change, 2: add/remove
      submit_question_show: ref(false),
      current_version: ref([1, 0, 0]),
    };
    const $q = useQuasar();
    const model = ref(modelData);
    const pdfdata = ref(null);
    onBeforeUnmount(() => {
      $q.loading.hide();
    });
  },
  data: function () {
    return {
      id_tot: 0,
      fillOutJson,
      version: useQuasar.version,
      isExpanded: true,
      selectedRowID: {},
      table: [],
      itemId: null,
    };
  },
  methods: {
    notify: function () {
      this.$q.notify("Running on Quasar v" + this.$q.version);
    },
    recursive(obj, newObj, level, itemId, isExpend) {
      let vm = this;

      obj.forEach(function (o) {
        if (o.is_deleted) return;
        if (o.items && o.items.length != 0) {
          o.level = level;
          o.leaf = false;
          newObj.push(o);
          if (o.id == itemId) {
            o.expend = isExpend;
          }
          if (o.expend == true) {
            vm.recursive(o.items, newObj, o.level + 1, itemId, isExpend);
          }
        } else {
          o.level = level;
          o.leaf = true;
          newObj.push(o);
          return false;
        }
      });
    },
    iconName(item) {
      if (item.expend == true) {
        return "remove_circle_outline";
      }

      if (item.items && item.items.length > 0) {
        return "control_point";
      }

      return "done";
    },
    toggle(item, index) {
      let vm = this;
      vm.itemId = item.id;
      item.leaf = false;
      //show  sub items after click on + (more)
      if (
        item.leaf == false &&
        item.expend == undefined &&
        item.items != undefined
      ) {
        if (item.items.length != 0) {
          vm.recursive(item.items, [], item.level + 1, item.id, true);
        }
      }

      if (item.expend == true && item.items != undefined) {
        var __subindex = 0;
        item.items.forEach(function (o) {
          o.expend = undefined;
        });

        Vue.set(item, "expend", undefined);
        Vue.set(item, "leaf", false);
        vm.itemId = null;
      }
    },

    setPadding(item) {
      return `padding-left: ${item.level * 30 + 10}px; font-size: ${
        (4 - item.level) * 0.3 + 0.6
      }em; display: inline-block; text-indent: -10px;`;
    },
    appendIdProperty(object, parentArray) {
      object.id = this.id_tot++;
      object.parentArray = parentArray;
      object.is_deleted = false;

      if (
        object.items !== undefined &&
        object.items !== null &&
        object.items.length !== 0
      ) {
        for (let i = 0; i < object.items.length; i++) {
          this.appendIdProperty(object.items[i], parentArray.concat(i));
        }
      }
    },
    add_one(title = undefined, is_big_title = false) {
      // this is used when adding and editing
      let _this = this;
      if (is_big_title) {
        // this is for adding a new big title
        this.table.push({
          title: title,
          items: [],
          id: _this.id_tot++,
          parentArray: [this.table.length],
          is_deleted: false,
        });
      } else {
        if (this.method == "add") {
          // this is for adding a normal sub title
          if (
            // this is when user doesn't input parameter properly.
            this.add_title_input === undefined ||
            this.add_type_select === undefined ||
            (this.add_type_select !== "blank" &&
              (this.add_variable_input == undefined || this.add_variable_input == ""))
          ) {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Invalid input",
            });
            return;
          }

          let arr = [...this.add_parent_array];
          let current_object = this.table;
          if (arr.length === 0) return;
          for (let i = 0; i < arr.length; i++) {
            if (!i) current_object = current_object[arr[i]];
            else current_object = current_object.items[arr[i]];
          }
          let order_of_new_element = current_object.items.length;
          let type;
          switch (this.add_type_select) {
            case "blank":
              type = -1;
              break;
            case "Input Area":
              type = 0;
              break;
            case "Checkbox":
              type = 1;
              break;
            case "Input Line":
              type = 2;
              break;
          }

          //confirm if the model(variable is valid)
          if (this.add_type_select != "blank") {
            if (this.validateVariable(this.add_variable_input)) {
              this.$q.notify({
                color: "red-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Duplicate variable!",
              });
              return;
            }
          }

          let newObj = {
            title: this.add_title_input,
            id: _this.id_tot++,
            parentArray: [...this.add_parent_array, order_of_new_element],
            is_deleted: false,
            type: type,
          };
          if (this.add_type_select == "blank") {
            newObj.items = [];
          } else {
            // let model = "reportESG";
            // for (let i = 0; i < arr.length; i++) {
            //   model = model + "_" + arr[i];
            // }
            // newObj.model = model;
            newObj.model = this.add_variable_input; //model is variable
            newObj.type = type;
            newObj.label = this.add_label_input;
          }
          current_object.items.push(newObj);
          this.changed_flag = 2;
        } else if (this.method == "edit") {
          //this is when editing a existing question
          if (
            // this is when user doesn't input parameter properly.
            this.add_title_input === undefined ||
            this.add_type_select === undefined ||
            (this.add_type_select !== "blank" &&
              (this.add_variable_input == undefined || this.add_variable_input == ""))
          ) {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Invalid input",
            });
            return;
          }
          let arr = [...this.add_parent_array];
          let current_object = this.table;
          if (arr.length === 0) return;
          for (let i = 0; i < arr.length; i++) {
            if (!i) current_object = current_object[arr[i]];
            else current_object = current_object.items[arr[i]];
          }
          let type;
          switch (this.add_type_select) {
            case "blank":
              type = -1;
              break;
            case "Input Area":
              type = 0;
              break;
            case "Checkbox":
              type = 1;
              break;
            case "Input Line":
              type = 2;
              break;
          }

          //confirm if the model(variable is valid)
          if (this.add_type_select != "blank") {
            if (this.validateVariable(this.add_variable_input, this.add_parent_array)) {
              this.$q.notify({
                color: "red-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Duplicate variable!",
              });
              return;
            }
            if(this.update_type_different && this.validateVariable(this.add_variable_input)) {
                this.$q.notify({
                color: "red-4",
                textColor: "white",
                icon: "cloud_done",
                message: "Input another variable!",
              });
              return;
            }
          }

          current_object.title = this.add_title_input;
          current_object.type = type;
          current_object.label = this.add_label_input;
          current_object.model = this.add_variable_input;
          if (type === -1) {
            // this means that the question is blank and can't create a sub title any more.
            current_object.label = undefined;
            delete current_object.model;
            if (current_object.items === undefined) current_object.items = [];
          } else {
            delete current_object.items;
          }
          if (this.update_type_different && this.add_type_select != "blank")
            // this means major change
            this.changed_flag = Math.max(this.changed_flag, 1);
        }
      }

      this.add_dialog_show = false;
      this.add_title_input = undefined;
      this.add_label_input = undefined;
      this.add_type_select = undefined;
      this.add_variable_input = undefined;
      this.saveToJson();
    },
    view_update_one(item) {
      this.method = "edit";
      this.add_title_input = item.title;
      this.add_label_input = item.label;
      this.add_variable_input = item.model;
      this.add_type_select = this.getTypeString(item.type);
      this.add_parent_array = item.parentArray;
      this.add_dialog_show = true;
    },
    update_one(parentArray) {},
    remove_one(parentArray) {
      let arr = [...parentArray];
      let current_object = this.table;
      if (arr.length === 0) return;
      for (let i = 0; i < arr.length; i++) {
        if (!i) current_object = current_object[arr[i]];
        else current_object = current_object.items[arr[i]];
      }
      current_object.is_deleted = true;
      this.saveToJson();
    },
    view_add_one(item) {
      if (item.items === undefined) {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Couldn't add new question to this title",
        });
        return;
      }
      this.method = "add";
      this.add_parent_array = item.parentArray;
      this.add_dialog_show = true;
    },
    add_big_title() {
      if (
        this.new_big_title_input === "" ||
        this.new_big_title_input === undefined
      )
        return;
      this.add_one(this.new_big_title_input, true);
      this.add_new_big_title = false;
      this.new_big_title_input = "";
      this.changed_flag = 2;
    },
    getTypeString(val) {
      if (val == -1 || val == undefined) return "blank";
      if (val == 0) return "Input Area";
      if (val == 1) return "Checkbox";
      if (val == 2) return "Input Line";
    },
    saveToJson() {
      this.$q.localStorage.set("jsonData", JSON.stringify(this.table));
    },
    getModelArray(items, parentArray) {
      let _this = this;
      let ret = [];
      for (const item of items) {
        if (item.is_deleted) continue;
        if(item.parentArray == parentArray) continue;
        if (item.model) {
          ret = [...ret, item.model];
        } else {
          ret = [...ret, ..._this.getModelArray(item.items, parentArray)];
        }
      }
      return ret;
    },
    validateVariable(newVariable, parentArray = []) {
      return this.getModelArray(this.table, parentArray).includes(newVariable);
    },
    createQuestionSet() {
        let version_number_array = this.current_version;
      let questionList = JSON.parse(
        this.$q.localStorage.getItem("questionList")
      );
      let version_string = version_number_array.toString().replace(/,/g, ".");
      if (questionList == null) questionList = {};
      questionList[version_string] = {
        version: version_number_array,
        questions: this.table,
      };
      this.$q.localStorage.set("questionList", JSON.stringify(questionList));
      this.$q.localStorage.set("currentVersion", this.current_version);
      this.changed_flag = 0;
        console.log(questionList);
    },
    submit_questionSet() {
        if(!this.changed_flag) return;
        if(this.changed_flag === 1) {
            this.current_version[2] ++;
        }
        else this.current_version[1] ++;
        this.createQuestionSet();
    },
    versionToString(addedChange = 0) { // this turns current version to string
        let version_number_array = [...this.current_version];
        if(addedChange == 1) version_number_array[2] ++;
        else if(addedChange == 2) version_number_array[1] ++;
        let version_string = version_number_array.toString().replace(/,/g, ".");
        return version_string;
    },
    getCurrentVersion() {
        if(this.$q.localStorage.getItem("currentVersion"))
            this.current_version = this.$q.localStorage.getItem("currentVersion");
        else this.current_version = [1, 0, 0];
    }
  },
  computed: {
    arrayTreeObj() {
      let vm = this;
      var newObj = [];
      vm.recursive(vm.table, newObj, 0, vm.itemId, vm.isExpanded);
      return newObj;
    },
  },
  watch: {
    selectedIDRow: function (val) {
      if (this.selectedRowID != null) {
        this.$set(this.selectedRowID, "id", val);
      }
    },
  },
  mounted() {
    this.id_tot = 0;
    let parentArray = [];
    for (let i = 0; i < this.fillOutJson.length; i++) {
      this.appendIdProperty(this.fillOutJson[i], parentArray.concat(i));
    }
    if (
      this.$q.localStorage.getItem("jsonData") != undefined &&
      this.$q.localStorage.getItem("jsonData") != null
    )
      this.table = JSON.parse(this.$q.localStorage.getItem("jsonData"));
    else this.table = this.fillOutJson;
    this.getCurrentVersion();
    this.saveToJson();
  },
};
</script>
