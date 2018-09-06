//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = router => {
  router.get(
    "/login",
    /**
     * @param {object} req
     * @param {object} res
     */
    (req, res) => {
      const data = {
        title: "LoginPage!"
      };
      req.vueOptions.head.title = "Express-Vue MVC Starter Kit";
      res.renderVue("login/login.vue", data, req.vueOptions);
    }
  );
};
