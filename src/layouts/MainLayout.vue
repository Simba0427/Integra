<template>
  <q-layout view="hHh Lpr lff" class="bg-grey-1">
    <q-header
      elevated
      class="text-grey-8 q-py-xs"
      height-hint="58"
      style="background-color: #23b7e5"
    >
      <q-toolbar class="text-white">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="img:logo-single.png" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold text-white">
            INTEGRA
          </q-toolbar-title>
        </q-btn>

        <q-space />
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-ripple to="/home">
            <q-item-section avatar>
              <q-icon color="grey" name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <span>Law Form View</span>
            </div>
          </div>
          <q-item
            v-for="link in links1"
            :key="link.text"
            v-ripple
            clickable
            :to="link.path"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <span>Vendor View</span>
            </div>
          </div>
          <q-item
            v-for="link in links2"
            :key="link.text"
            v-ripple
            clickable
            :to="link.path"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v5";
export default {
  name: "MyLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      links1: [
        { icon: "login", text: "Admin Login", path: "/admin" },
        { icon: "work", text: "Manage Survey", path: "/manage-survey" },
        {
          icon: "grid_view",
          text: "Create/Edit Survey",
          path: "/procurementadmin",
        },
        { icon: "preview", text: "Preview Survey", path: "/procurement" },
      ],
      links2: [
        { icon: "edit", text: "Fill Out Survey", path: "/fillout" },
        { icon: "work", text: "Manage Survey", path: "/managesurvey" },
        { icon: "picture_as_pdf", text: "Display PDF", path: "/display-pdf" },
      ],
    };
  },
};
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
