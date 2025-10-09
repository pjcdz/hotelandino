'use client';

// contexts/ReservationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
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
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [rooms] = useState<Room[]>(mockRooms);

  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations(prev =>
      prev.map(res => (res.id === id ? { ...res, ...updates, updatedAt: new Date() } : res))
    );
  };

  const cancelReservation = (id: string) => {
    setReservations(prev =>
      prev.map(res =>
        res.id === id
          ? { ...res, status: 'cancelada' as const, updatedAt: new Date() }
          : res
      )
    );
  };

  const addPayment = (payment: Payment) => {
    setPayments(prev => [...prev, payment]);
    
    // Actualizar estado de la reserva a confirmada cuando se paga
    const reservation = reservations.find(r => r.id === payment.reservationId);
    if (reservation && payment.status === 'pagado') {
      updateReservation(payment.reservationId, { status: 'confirmada' });
    }
  };

  const getReservationById = (id: string) => {
    return reservations.find(res => res.id === id);
  };

  const getPaymentsByReservation = (reservationId: string) => {
    return payments.filter(p => p.reservationId === reservationId);
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
        getPaymentsByReservation
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
