//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = router => {
  router.get(
    "/admin",
    /**
     * @param {object} req
     * @param {object} res
     */
    (req, res) => {
      const data = {
        title: "AdminPage!"
      };
      req.vueOptions.head.title = "Express-Vue MVC Starter Kit";
      res.renderVue("admin/admin.vue", data, req.vueOptions);
    }
  );
};
