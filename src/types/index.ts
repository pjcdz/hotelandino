// types/index.ts - Tipos del Sistema Hotel Andino

export type RoomType = 'simple' | 'doble' | 'suite' | 'deluxe';
export type RoomStatus = 'disponible' | 'ocupada' | 'limpieza' | 'mantenimiento';
export type ReservationStatus = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
export type PaymentStatus = 'pendiente' | 'pagado' | 'cancelado';
export type Currency = 'ARS' | 'USD';

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  pricePerNight: number;
  capacity: number;
  description: string;
  amenities: string[];
}

export type DocumentType = 'DNI' | 'Pasaporte';

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  document: string;
  documentType: DocumentType;
}

export interface Reservation {
  id: string;
  reservationNumber: string;
  roomId: string;
  guests: Guest[];
  checkInDate: Date;
  checkOutDate: Date;
  numberOfNights: number;
  totalPrice: number;
  advancePayment: number; // 25% del total
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  currency: Currency;
  paymentDate: Date;
  status: PaymentStatus;
  receiptNumber?: string;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  reservationId: string;
  paymentId: string;
  amount: number;
  currency: Currency;
  issuedDate: Date;
  guestName: string;
}

// Sprint Progress Tracking
export interface Sprint {
  number: number;
  name: string;
  duration: string;
  features: Feature[];
  completedPoints: number;
  totalPoints: number;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  points: number;
  status: 'completed' | 'partial' | 'pending';
  component?: string;
}
