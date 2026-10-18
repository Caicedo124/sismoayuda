CREATE SCHEMA IF NOT EXISTS proyecto_sismoayuda;
SET search_path TO proyecto_sismoayuda;

CREATE TABLE zonas_afectadas (
    id_zona SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'activa'
        CHECK (estado IN ('activa', 'atendida', 'cerrada')),
    UNIQUE (nombre, municipio, departamento)
);

CREATE TABLE categorias_donacion (
    id_categoria SMALLSERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    descripcion VARCHAR(250)
);

CREATE TABLE centros_acopio (
    id_centro SERIAL PRIMARY KEY,
    id_zona INT NOT NULL
        REFERENCES zonas_afectadas(id_zona) ON DELETE RESTRICT,
    nombre VARCHAR(120) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(30),
    capacidad_maxima NUMERIC(12, 2),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (nombre, direccion)
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    id_categoria SMALLINT NOT NULL
        REFERENCES categorias_donacion(id_categoria) ON DELETE RESTRICT,
    nombre VARCHAR(120) NOT NULL,
    descripcion VARCHAR(250),
    unidad_medida VARCHAR(30) NOT NULL,
    UNIQUE (id_categoria, nombre)
);