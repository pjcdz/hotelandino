// lib/store.ts - Estado Global del Sistema
import { Room, Reservation, Payment, Guest } from '@/types';

// Datos de ejemplo - Habitaciones del hotel
export const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'simple',
    status: 'disponible',
    pricePerNight: 15000,
    capacity: 1,
    description: 'Habitación simple con vista a la ciudad',
    amenities: ['WiFi', 'TV', 'Baño privado']
  },
  {
    id: '2',
    number: '102',
    type: 'doble',
    status: 'disponible',
    pricePerNight: 25000,
    capacity: 2,
    description: 'Habitación doble con balcón',
    amenities: ['WiFi', 'TV', 'Baño privado', 'Balcón', 'Minibar']
  },
  {
    id: '3',
    number: '201',
    type: 'suite',
    status: 'disponible',
    pricePerNight: 45000,
    capacity: 4,
    description: 'Suite con sala de estar',
    amenities: ['WiFi', 'TV', 'Baño privado', 'Balcón', 'Minibar', 'Sala de estar']
  },
  {
    id: '4',
    number: '202',
    type: 'deluxe',
    status: 'disponible',
    pricePerNight: 65000,
    capacity: 4,
    description: 'Suite deluxe con jacuzzi',
    amenities: ['WiFi', 'TV', 'Baño privado', 'Balcón', 'Minibar', 'Sala de estar', 'Jacuzzi']
  },
  {
    id: '5',
    number: '103',
    type: 'doble',
    status: 'ocupada',
    pricePerNight: 25000,
    capacity: 2,
    description: 'Habitación doble estándar',
    amenities: ['WiFi', 'TV', 'Baño privado']
  }
];

// Utilidades
export const generateReservationNumber = (): string => {
  const prefix = 'HA';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `${prefix}-${timestamp}-${random}`;
};

export const calculateTotalPrice = (pricePerNight: number, nights: number): number => {
  return pricePerNight * nights;
};

export const calculateAdvancePayment = (totalPrice: number): number => {
  return totalPrice * 0.25; // 25% según reglas de negocio
};

export const calculateNumberOfNights = (checkIn: Date, checkOut: Date): number => {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isRoomAvailable = (
  room: Room,
  checkIn: Date,
  checkOut: Date,
  reservations: Reservation[]
): boolean => {
  if (room.status !== 'disponible') return false;

  // Verificar si hay conflicto con reservas existentes
  return !reservations.some(reservation => {
    if (reservation.roomId !== room.id) return false;
    if (reservation.status === 'cancelada') return false;

    const resCheckIn = new Date(reservation.checkInDate);
    const resCheckOut = new Date(reservation.checkOutDate);

    return (
      (checkIn >= resCheckIn && checkIn < resCheckOut) ||
      (checkOut > resCheckIn && checkOut <= resCheckOut) ||
      (checkIn <= resCheckIn && checkOut >= resCheckOut)
    );
  });
};

export const getRoomTypeName = (type: Room['type']): string => {
  const names = {
    simple: 'Simple',
    doble: 'Doble',
    suite: 'Suite',
    deluxe: 'Deluxe'
  };
  return names[type];
};

export const getStatusColor = (status: string): string => {
  const colors = {
    disponible: 'bg-green-100 text-green-800',
    ocupada: 'bg-red-100 text-red-800',
    limpieza: 'bg-yellow-100 text-yellow-800',
    mantenimiento: 'bg-gray-100 text-gray-800',
    pendiente: 'bg-orange-100 text-orange-800',
    confirmada: 'bg-blue-100 text-blue-800',
    cancelada: 'bg-red-100 text-red-800',
    completada: 'bg-green-100 text-green-800',
    pagado: 'bg-green-100 text-green-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const formatCurrency = (amount: number, currency: 'ARS' | 'USD' = 'ARS'): string => {
  const symbol = currency === 'ARS' ? '$' : 'USD $';
  return `${symbol} ${amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
