const entities = {
  zonas: {
    table: 'zonas_afectadas',
    primaryKey: 'id_zona',
    fields: [
      'nombre',
      'municipio',
      'departamento',
      'descripcion',
      'estado',
    ],
  },

  centros: {
    table: 'centros_acopio',
    primaryKey: 'id_centro',
    fields: [
      'id_zona',
      'nombre',
      'direccion',
      'telefono',
      'capacidad_maxima',
      'activo',
    ],
  },

  categorias: {
    table: 'categorias_donacion',
    primaryKey: 'id_categoria',
    fields: [
      'nombre',
      'descripcion',
    ],
  },

  productos: {
    table: 'productos',
    primaryKey: 'id_producto',
    fields: [
      'id_categoria',
      'nombre',
      'descripcion',
      'unidad_medida',
    ],
  },
};

module.exports = entities;