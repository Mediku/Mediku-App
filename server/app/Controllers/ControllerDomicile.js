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
    const result = await axios.get(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    res.status(200).json(result.data.kota_kabupaten);
  }

  static async findDistrictsOfRegency(req, res, next) {
    const { id } = req.params;
    const result = await axios.get(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    );
    res.status(200).json(result.data.kecamatan);
  }

  static async findSubDistrictsOfDistrict(req, res, next) {
    const { id } = req.params;
    const result = await axios.get(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
    );
    res.status(200).json(result.data.kelurahan);
  }
}

module.exports = CoontrollerDomicile;
