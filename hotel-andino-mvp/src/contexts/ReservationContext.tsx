'use client';

// contexts/ReservationContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Reservation, Payment, Room } from '@/types';
import { mockRooms } from '@/lib/store';

interface ReservationContextType {
  reservations: Reservation[];
  payments: Payment[];
  rooms: Room[];
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, reservation: Partial<Reservation>) => void;
  cancelReservation: (id: string) => void;
  addPayment: (payment: Payment) => void;
  getReservationById: (id: string) => Reservation | undefined;
  getPaymentsByReservation: (reservationId: string) => Payment[];
  clearAllData: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

// Claves para localStorage
const STORAGE_KEYS = {
  RESERVATIONS: 'hotel_andino_reservations',
  PAYMENTS: 'hotel_andino_payments',
};

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [rooms] = useState<Room[]>(mockRooms);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    try {
      const storedReservations = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      const storedPayments = localStorage.getItem(STORAGE_KEYS.PAYMENTS);

      if (storedReservations) {
        const parsed = JSON.parse(storedReservations);
        // Convertir fechas de string a Date
        const reservationsWithDates = parsed.map((r: Reservation) => ({
          ...r,
          checkInDate: new Date(r.checkInDate),
          checkOutDate: new Date(r.checkOutDate),
          createdAt: new Date(r.createdAt),
          updatedAt: new Date(r.updatedAt),
        }));
        setReservations(reservationsWithDates);
      }

      if (storedPayments) {
        const parsed = JSON.parse(storedPayments);
        const paymentsWithDates = parsed.map((p: Payment) => ({
          ...p,
          paymentDate: new Date(p.paymentDate),
        }));
        setPayments(paymentsWithDates);
      }

      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setIsLoaded(true);
    }
  }, []);

  // Guardar reservas en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
      } catch (error) {
        console.error('Error saving reservations to localStorage:', error);
      }
    }
  }, [reservations, isLoaded]);

  // Guardar pagos en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
      } catch (error) {
        console.error('Error saving payments to localStorage:', error);
      }
    }
  }, [payments, isLoaded]);

  // Validar reserva según reglas de negocio
  const validateReservation = (reservation: Reservation): string | null => {
    // RN-V02: Datos personales obligatorios
    if (!reservation.guests || reservation.guests.length === 0) {
      return 'La reserva debe tener al menos un huésped';
    }

    const mainGuest = reservation.guests[0];
    if (!mainGuest.firstName || !mainGuest.lastName || !mainGuest.document) {
      return 'Los datos del huésped principal son obligatorios';
    }

    // RN-V04: Número de reserva único
    const existingReservation = reservations.find(
      (r: Reservation) => r.reservationNumber === reservation.reservationNumber && r.id !== reservation.id
    );
    if (existingReservation) {
      return 'El número de reserva ya existe';
    }

    // RN-V01: Validar adelanto del 25%
    const expectedAdvance = reservation.totalPrice * 0.25;
    if (Math.abs(reservation.advancePayment - expectedAdvance) > 0.01) {
      return 'El adelanto debe ser exactamente el 25% del precio total';
    }

    // Validar fechas
    if (reservation.checkInDate >= reservation.checkOutDate) {
      return 'La fecha de check-out debe ser posterior a la fecha de check-in';
    }

    return null; // Válido
  };

  const addReservation = (reservation: Reservation) => {
    const validationError = validateReservation(reservation);
    if (validationError) {
      console.error('Error de validación:', validationError);
      throw new Error(validationError);
    }

    setReservations((prev: Reservation[]) => [...prev, reservation]);
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations((prev: Reservation[]) =>
      prev.map((res: Reservation) => (res.id === id ? { ...res, ...updates, updatedAt: new Date() } : res))
    );
  };

  const cancelReservation = (id: string) => {
    // RN-T02: Una vez cancelada, no se puede reactivar
    setReservations((prev: Reservation[]) =>
      prev.map((res: Reservation) =>
        res.id === id
          ? { ...res, status: 'cancelada' as const, updatedAt: new Date() }
          : res
      )
    );
  };

  const addPayment = (payment: Payment) => {
    // RN-V03: Validar moneda
    if (payment.currency !== 'ARS' && payment.currency !== 'USD') {
      throw new Error('La moneda debe ser ARS o USD');
    }

    // RN-R03: No se puede pagar una reserva cancelada
    const reservation = reservations.find((r: Reservation) => r.id === payment.reservationId);
    if (!reservation) {
      throw new Error('La reserva no existe');
    }

    if (reservation.status === 'cancelada') {
      throw new Error('No se puede registrar un pago para una reserva cancelada');
    }

    setPayments((prev: Payment[]) => [...prev, payment]);
    
    // RN-P02: Adelanto confirma la reserva
    if (reservation && payment.status === 'pagado' && reservation.status === 'pendiente') {
      updateReservation(payment.reservationId, { status: 'confirmada' });
    }
  };

  const getReservationById = (id: string) => {
    return reservations.find((res: Reservation) => res.id === id);
  };

  const getPaymentsByReservation = (reservationId: string) => {
    return payments.filter((p: Payment) => p.reservationId === reservationId);
  };

  const clearAllData = () => {
    if (confirm('¿Está seguro de que desea eliminar todos los datos? Esta acción no se puede deshacer.')) {
      setReservations([]);
      setPayments([]);
      localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
      localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        payments,
        rooms,
        addReservation,
        updateReservation,
        cancelReservation,
        addPayment,
        getReservationById,
        getPaymentsByReservation,
        clearAllData
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations must be used within ReservationProvider');
  }
  return context;
}
