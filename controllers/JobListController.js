const axios = require("axios");

class Controller {
  static async jobList(req, res) {
    let { description, location, full_time, page } = req.query;
    const { data } = await axios.get(
      "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
    );
    if (!page) {
      page = 1;
    }
    let totalData = 0;
    const limit = 10;
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;

    if (!description && !location && !full_time) {
      data.forEach((e, idx) => totalData++);
      const totalPage = Math.ceil(totalData / limit);
      console.log(totalPage);
      const result = data.slice(startIdx, endIdx);
      res.status(200).json({ result, totalPage });
    } else {
      let filteredData = [];
      if (full_time) {
        filteredData = data.filter((e) => e.type === "Full Time");
      }
      if (description) {
        filteredData = data.filter((e) =>
          e.description.toLowerCase().includes(description.toLowerCase())
        );
      }
      if (location) {
        filteredData = data.filter((e) =>
          e.location.toLowerCase().startsWith(location.toLowerCase())
        );
      }
      filteredData.forEach((e, idx) => totalData++);
      const totalPage = Math.ceil(totalData / limit);
      console.log(totalPage);
      const result = filteredData.slice(startIdx, endIdx);
      res.status(200).json({ result, totalPage });
    }

    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async jobDetail(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const { data } = await axios.get(
        "http://dev3.dansmultipro.co.id/api/recruitment/positions/" + id
      );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
