//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = router => {
  router.get(
    "/historyTeacher",
    /**
     * @param {object} req
     * @param {object} res
     */
    (req, res) => {
      const data = {
        title: "HistoryTeacherPage!"
      };
      req.vueOptions.head.title = "Express-Vue MVC Starter Kit";
      res.renderVue("historyTeacher/historyTeacher.vue", data, req.vueOptions);
    }
  );
};
