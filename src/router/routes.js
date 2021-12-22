const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Home.vue") },

      { path: "home", component: () => import("pages/Home.vue") },
      { path: "admin", component: () => import("pages/Login.vue") },
      { path: "manage-survey", component: () => import("pages/Manage.vue") },
      {
        path: "procurementadmin",
        component: () => import("pages/EditSurvey.vue"),
      },
      {
        path: "procurement",
        component: () => import("pages/Preview.vue"),
      },
      {
        path: "fillout",
        component: () => import("src/pages/FillOut.vue"),
      },
      {
        path: "managesurvey",
        component: () => import("pages/ManageSurvey.vue"),
      },
      {
        path: "display-pdf",
        component: () => import("pages/Display.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
