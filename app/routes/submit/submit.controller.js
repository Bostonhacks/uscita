//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = router => {
  router.get(
    "/submit",
    /**
     * @param {object} req
     * @param {object} res
     */
    (req, res) => {
      const data = {
        title: "SubmitPage!"
      };
      req.vueOptions.head.title = "Express-Vue MVC Starter Kit";
      res.renderVue("submit/submit.vue", data, req.vueOptions);
    }
  );
};
