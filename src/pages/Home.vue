<template>
  <q-page class="flex flex-center">
    <v-container fluid class="pa-0">
      <div class="indigo darken-3 pa-3 text-center">
        <img src="favicon.ico" />
      </div>
      <v-container>
        <h2>White & Case ESG POC Questionnaire</h2>
        <p>
          White & Case ESG Questionnaire POC. In this live demonstration, you
          can:
        </p>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Define the Survey</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Fill out the survey</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </v-container>
    </v-container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageHome",
});
</script>
