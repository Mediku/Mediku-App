const axios = require("axios");
const PROVINCE_URL = `https://dev.farizdotid.com/api/daerahindonesia/provinsi`;

class CoontrollerDomicile {
  static async findAllProvinces(req, res, next) {
    const url = PROVINCE_URL;
    const result = await axios.get(url);
    return res.status(200).json(result.data.provinsi);
  }

  static async findAllRegenciesOfProvince(req, res, next) {
    const { id } = req.params;
    try {
      const result = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
      );
      if (!result.data.kota_kabupaten.length) {
        throw { name: "Data Not Found" };
      } else {
        res.status(200).json(result.data.kota_kabupaten);
      }
    } catch (err) {
      next(err);
    }
  }

  static async findDistrictsOfRegency(req, res, next) {
    const { id } = req.params;
    try {
      const result = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
      );
      if (!result.data.kecamatan.length) {
        throw { name: "Data Not Found" };
      } else {
        res.status(200).json(result.data.kecamatan);
      }
    } catch (err) {
      next(err);
    }
  }

  static async findSubDistrictsOfDistrict(req, res, next) {
    const { id } = req.params;
    try {
      const result = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
      );
      if (!result.data.kelurahan.length) {
        throw { name: "Data Not Found" };
      } else {
        res.status(200).json(result.data.kelurahan);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CoontrollerDomicile;
