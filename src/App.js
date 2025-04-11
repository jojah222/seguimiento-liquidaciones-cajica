import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckSquare, XSquare, AlertTriangle, BarChart2, Filter, Plus, X, Save, Edit, ArrowDown, ArrowUp } from 'lucide-react';

// Lista de documentos requeridos para liquidación
const DOCUMENTOS_REQUERIDOS = [
  { id: 1, nombre: "Acta de Liquidación del Convenio" },
  { id: 2, nombre: "Informe Final de Ejecución del Convenio presentado por la JAC" },
  { id: 3, nombre: "Planillas de Seguridad Social" },
  { id: 4, nombre: "Contratos de Obra Civil" },
  { id: 5, nombre: "Certificación de Aportes en Especie" },
  { id: 6, nombre: "Certificación de Aportes Financieros del convenio" },
  { id: 7, nombre: "Acta de terminación y Recibo Final" },
  { id: 8, nombre: "Informes de supervisión" }
];

// Datos de JACs basados en los documentos compartidos
const DATOS_INICIALES = [
  {
    id: 1,
    nombre: "JAC Puente Vargas",
    numContrato: "CONV. SOL-001-2024",
    idSecop: "CO1.PCCNTR.6868628",
    objeto: "CONSTRUCCION DEL ANDEN PERIMETRAL DEL ECOIN",
    valor: 15513301.60,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 2,
    nombre: "JAC Quebrada del Campo",
    numContrato: "CONV. SOL-004-2024",
    idSecop: "CO1.PCCNTR.6868532",
    objeto: "CERRAMIENTO DE LA MALLA DE ALTO IMPACTO DEL CAMPO DEPORTIVO QUEBRADA EL CAMPO CUARTA ETAPA",
    valor: 15434316.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 3,
    nombre: "JAC Manas",
    numContrato: "CONV. SOL-006-2024",
    idSecop: "CO1.PCCNTR.6868855",
    objeto: "MANTENIMIENTO LOCATIVO DEL SALÓN COMUNAL",
    valor: 15673200.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 4,
    nombre: "JAC El Rocío",
    numContrato: "CONV. SOL-007-2034",
    idSecop: "CO1.PCCNTR.6868651",
    objeto: "INSTALACIÓN DEL CIELO RASO DEL SALÓN COMUNAL",
    valor: 15545834.80,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 5,
    nombre: "JAC Granjitas",
    numContrato: "CONV. SOL-003-2024",
    idSecop: "CO1.PCCNTR.6868634",
    objeto: "INSTALACION DEL CIELO RAZO DEL SALON COMUNAL",
    valor: 15689394.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 6,
    nombre: "JAC Calahorra",
    numContrato: "CONV. SOL-002-2024",
    idSecop: "CO1.PCCNTR.6868629",
    objeto: "CAMBIO DEL PISO DEL SALON COMUNAL",
    valor: 15501424.40,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 7,
    nombre: "JAC Canelón",
    numContrato: "CONV. SOL-005-2024",
    idSecop: "CO1.PCCNTR.6868642",
    objeto: "MANTENIMIENTO TOTAL DEL TANQUE DE ALMACENAMIENTO DE AGUA UBICADO EN EL SALÓN COMUNAL",
    valor: 15650664.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 8,
    nombre: "JAC La Palma",
    numContrato: "CONV. SOL-008-2024",
    idSecop: "CO1.PCCNTR.6909747",
    objeto: "MANTENIMIENTO LOCATIVO DEL SALON COMUNAL",
    valor: 15510000.00,
    fechaInicio: "2024-10-22",
    fechaFin: "2024-12-21",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 9,
    nombre: "JAC La Cumbre",
    numContrato: "CONV. SOL-009-2024",
    idSecop: "CO1.PCCNTR.6907419",
    objeto: "MANTENIMIENTO LOCATIVO DEL PREDIO LA ESCUELA",
    valor: 15371808.00,
    fechaInicio: "2024-10-28",
    fechaFin: "2024-12-27",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 10,
    nombre: "JAC Tayrona",
    numContrato: "CONV. SOL-xxx-2024",
    idSecop: "COx.PCCNTR.xxxxxxx",
    objeto: "MANTENIMIENTO DE PARQUE",
    valor: 15500000.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 11,
    nombre: "JAC La Estación",
    numContrato: "CONV. SOL-xxx-2024",
    idSecop: "COx.PCCNTR.xxxxxxx",
    objeto: "MANTENIMIENTO DE INFRAESTRUCTURA",
    valor: 15500000.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 12,
    nombre: "JAC Puente Vargas I.V",
    numContrato: "CONV. SOL-010-2024",
    idSecop: "CO1.PCCNTR.6907736",
    objeto: "MANTENIMIENTO LOCATIVO DE LA CASA COMUNAL",
    valor: 15361480.00,
    fechaInicio: "2024-10-28",
    fechaFin: "2024-12-27",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 13,
    nombre: "JAC Santa Inés",
    numContrato: "CONV. SOL-011-2024",
    idSecop: "CO1.PCCNTR.6909768",
    objeto: "OBRA DE MANTENIMIENTO DEL POLIDEPORTIVO",
    valor: 15510000.00,
    fechaInicio: "2024-10-22",
    fechaFin: "2024-12-21",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 14,
    nombre: "JAC Calle 7A",
    numContrato: "CONV. SOL-015-2024",
    idSecop: "CO1.PCCNTR.6933652",
    objeto: "OBRA DE MANTENIMIENTO DEL PARQUE DEPORTIVO VILLA ESPERANZA",
    valor: 15510000.00,
    fechaInicio: "2024-10-30",
    fechaFin: "2024-12-29",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 15,
    nombre: "JAC Buena Suerte",
    numContrato: "CONV. SOL-xxx-2024",
    idSecop: "COx.PCCNTR.xxxxxxx",
    objeto: "MANTENIMIENTO DE INFRAESTRUCTURA",
    valor: 15500000.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 16,
    nombre: "JAC La Laguna",
    numContrato: "CONV. SOL-xxx-2024",
    idSecop: "COx.PCCNTR.xxxxxxx",
    objeto: "MANTENIMIENTO DE INFRAESTRUCTURA",
    valor: 15500000.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 17,
    nombre: "JAC Santa Cruz",
    numContrato: "CONV.SOL-017-2024",
    idSecop: "CO1.PCCNTR.7073918",
    objeto: "MEJORAMIENTO PARQUE SANTA CRUZ",
    valor: 15510000.00,
    fechaInicio: "2024-11-29",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 18,
    nombre: "JAC El Misterio",
    numContrato: "CONV. SOL-xxx-2024",
    idSecop: "COx.PCCNTR.xxxxxxx",
    objeto: "MANTENIMIENTO DE INFRAESTRUCTURA",
    valor: 15500000.00,
    fechaInicio: "2024-10-17",
    fechaFin: "2024-12-16",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  },
  {
    id: 19,
    nombre: "Asojuntas",
    numContrato: "CONV. SOL-019-2024",
    idSecop: "COx.PCCNTR.xxxxxxx",
    objeto: "CONSTRUCCIÓN DE CINCO 5 PARQUES INFANTILES EN DIFERENTES SECTORES DEL MUNICIPIO",
    valor: 58000000.00,
    fechaInicio: "2024-12-06",
    fechaFin: "2024-12-25",
    estadoDocumentos: DOCUMENTOS_REQUERIDOS.map(doc => ({ 
      idDocumento: doc.id, 
      nombre: doc.nombre,
      entregado: false, 
      fechaEntrega: null, 
      comentarios: "" 
    }))
  }
];

// Almacenamiento local
const guardarDatos = (datos) => {
  localStorage.setItem('datosJACs', JSON.stringify(datos));
};

const cargarDatos = () => {
  const datosGuardados = localStorage.getItem('datosJACs');
  return datosGuardados ? JSON.parse(datosGuardados) : DATOS_INICIALES;
};

// Funciones de utilidad
const formatearFecha = (fecha) => {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString('es-CO');
};

const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor);
};

const calcularPorcentajeCompletado = (jac) => {
  const docsEntregados = jac.estadoDocumentos.filter(doc => doc.entregado).length;
  return (docsEntregados / jac.estadoDocumentos.length) * 100;
};