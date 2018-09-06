//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = router => {
  router.get(
    "/historyStudent",
    /**
     * @param {object} req
     * @param {object} res
     */
    (req, res) => {
      const data = {
        title: "HistoryStudentPage!"
      };
      req.vueOptions.head.title = "Express-Vue MVC Starter Kit";
      res.renderVue("historyStudent/historyStudent.vue", data, req.vueOptions);
    }
  );
};
