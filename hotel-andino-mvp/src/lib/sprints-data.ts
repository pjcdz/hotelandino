// lib/sprints-data.ts - Información de Sprints y Progreso
import { Sprint } from '@/types';

export const sprintsData: Sprint[] = [
  {
    number: 1,
    name: 'Funcionalidades Core de Reservas',
    duration: '10 minutos (2 días)',
    completedPoints: 25,
    totalPoints: 40,
    status: 'completed',
    features: [
      {
        id: 'PB-01',
        name: 'Consulta de disponibilidad de habitaciones',
        description: 'Visualizar habitaciones disponibles por rango de fechas',
        points: 10,
        status: 'completed',
        component: '/sprint1/availability'
      },
      {
        id: 'PB-02',
        name: 'Visualización de catálogo de habitaciones',
        description: 'Mostrar tipos de habitaciones con precios y características',
        points: 10,
        status: 'completed',
        component: '/sprint1/catalog'
      },
      {
        id: 'PB-06',
        name: 'Generación automática de número de reserva',
        description: 'Sistema que genera números únicos para cada reserva',
        points: 5,
        status: 'completed',
        component: '/sprint1/reservation-number'
      },
      {
        id: 'PB-03',
        name: 'Registro de nueva reserva',
        description: 'Formulario completo para crear reservas con datos del cliente',
        points: 15,
        status: 'partial',
        component: '/sprint2/new-reservation'
      }
    ]
  },
  {
    number: 2,
    name: 'Gestión de Pagos y Adelantos',
    duration: '10 minutos (2 días)',
    completedPoints: 14,
    totalPoints: 34,
    status: 'completed',
    features: [
      {
        id: 'PB-03',
        name: 'Completar registro de reserva',
        description: 'Finalización del formulario de reserva del Sprint 1',
        points: 9,
        status: 'completed',
        component: '/sprint2/new-reservation'
      },
      {
        id: 'PB-04',
        name: 'Cálculo automático del adelanto (25%)',
        description: 'Sistema que calcula el 25% de la tarifa total automáticamente',
        points: 5,
        status: 'completed',
        component: '/sprint2/payment-calculation'
      },
      {
        id: 'PB-05',
        name: 'Registro de pago con fecha y moneda',
        description: 'Formulario para registrar pagos en ARS o USD',
        points: 10,
        status: 'partial',
        component: '/sprint3/payment-register'
      },
      {
        id: 'PB-07',
        name: 'Generación e impresión de recibo',
        description: 'Sistema de generación automática de recibos',
        points: 10,
        status: 'pending'
      }
    ]
  },
  {
    number: 3,
    name: 'Completar Pagos y Reportes',
    duration: '10 minutos (2 días)',
    completedPoints: 15,
    totalPoints: 30,
    status: 'completed',
    features: [
      {
        id: 'PB-05',
        name: 'Completar registro de pago',
        description: 'Finalización del módulo de pagos',
        points: 5,
        status: 'completed',
        component: '/sprint3/payment-register'
      },
      {
        id: 'PB-07',
        name: 'Generación e impresión de recibo',
        description: 'Sistema completo de recibos',
        points: 10,
        status: 'completed',
        component: '/sprint3/receipt'
      },
      {
        id: 'PB-08',
        name: 'Cancelación automática 24hs',
        description: 'Sistema que cancela reservas sin pago en 24 horas',
        points: 10,
        status: 'partial',
        component: '/sprint4/auto-cancel'
      },
      {
        id: 'PB-09',
        name: 'Alertas de pagos pendientes',
        description: 'Notificaciones para reservas pendientes de pago',
        points: 5,
        status: 'pending'
      }
    ]
  },
  {
    number: 4,
    name: 'Operaciones y Reportes',
    duration: '10 minutos (2 días)',
    completedPoints: 10,
    totalPoints: 30,
    status: 'completed',
    features: [
      {
        id: 'PB-10',
        name: 'Proceso de check-in',
        description: 'Conversión de reserva a estadía',
        points: 10,
        status: 'completed',
        component: '/sprint4/checkin'
      },
      {
        id: 'PB-11',
        name: 'Cancelación manual sin reintegro',
        description: 'Sistema de cancelación de reservas',
        points: 10,
        status: 'partial',
        component: '/sprint4/cancel'
      },
      {
        id: 'PB-12',
        name: 'Reporte de Reservas Emitidas',
        description: 'Reporte semanal de todas las reservas',
        points: 10,
        status: 'pending'
      }
    ]
  }
];

export const getTotalPoints = (): { completed: number; total: number } => {
  return sprintsData.reduce(
    (acc, sprint) => ({
      completed: acc.completed + sprint.completedPoints,
      total: acc.total + sprint.totalPoints
    }),
    { completed: 0, total: 0 }
  );
};

export const getSprintById = (sprintNumber: number): Sprint | undefined => {
  return sprintsData.find(s => s.number === sprintNumber);
};

export const getFeatureById = (featureId: string) => {
  for (const sprint of sprintsData) {
    const feature = sprint.features.find(f => f.id === featureId);
    if (feature) {
      return { sprint, feature };
    }
  }
  return null;
};
