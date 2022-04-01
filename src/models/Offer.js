const { Schema, model } = require('mongoose');

const OfferSchema = new Schema({
  nombre_empresa: { type: String },
  titulo_oferta: { type: String },
  cargo_solicitado: { type: String },
  vacantes: { type: Number },
  tipo_contratacion: { type: String },
  tiempo_experiencia: { type: String },
  genero: { type: String },
  edad: { type: String },
  salario_minino: { type: Number },
  salario_maximo: { type: Number },
  vehiculo: { type: String },
  pais: { type: String },
  departamento: { type: String },
  estado: { type: Number },
  expiracion: { type: Date },
  area_empresa: { type: String },
  modadidad: { type: String },
});

const OfferModel = model('OfferModel', OfferSchema);
module.exports = OfferModel;
