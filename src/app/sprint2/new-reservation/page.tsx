'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useReservations } from "@/contexts/ReservationContext";
import { generateReservationNumber, calculateNumberOfNights, calculateTotalPrice, getRoomTypeName, formatCurrency } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, FileText, Calendar, User, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { Guest, DocumentType } from "@/types";

export default function NewReservationPage() {
  const { rooms, addReservation } = useReservations();
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestData, setGuestData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    document: '',
    documentType: 'DNI' as DocumentType
  });
  const [success, setSuccess] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);
  const nights = checkIn && checkOut ? calculateNumberOfNights(new Date(checkIn), new Date(checkOut)) : 0;
  const totalPrice = selectedRoom && nights > 0 ? calculateTotalPrice(selectedRoom.pricePerNight, nights) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRoomId || !checkIn || !checkOut || !guestData.firstName || !guestData.lastName) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const guest: Guest = {
      id: Date.now().toString(),
      ...guestData
    };

    const newReservation = {
      id: Date.now().toString(),
      reservationNumber: generateReservationNumber(),
      roomId: selectedRoomId,
      guests: [guest],
      checkInDate: new Date(checkIn),
      checkOutDate: new Date(checkOut),
      numberOfNights: nights,
      totalPrice,
      advancePayment: totalPrice * 0.25,
      status: 'pendiente' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addReservation(newReservation);
    setReservationNumber(newReservation.reservationNumber);
    setSuccess(true);

    // Reset form
    setTimeout(() => {
      setSelectedRoomId('');
      setCheckIn('');
      setCheckOut('');
      setGuestData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        document: '',
        documentType: 'DNI'
      });
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  PB-03: Registro de Nueva Reserva
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 1 (Parcial) → Sprint 2 (Completado) | 15 Story Points
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                ✓ Completado
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Descripción */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Descripción de la Funcionalidad</h3>
              <p className="text-blue-800 text-sm">
                Formulario completo para crear nuevas reservas, incluyendo selección de habitación,
                fechas de estadía, datos del huésped y cálculo automático del total. Esta funcionalidad
                se inició en el Sprint 1 (60%) y se completó en el Sprint 2.
              </p>
            </div>

            {success && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ¡Reserva creada exitosamente! Número de reserva: <strong>{reservationNumber}</strong>
                  <br />
                  El cliente debe pagar el adelanto del 25% en las próximas 24 horas.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selección de Habitación */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">1. Selección de Habitación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="room">Habitación *</Label>
                    <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una habitación" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.filter(r => r.status === 'disponible').map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.number} - {getRoomTypeName(room.type)} - {formatCurrency(room.pricePerNight)}/noche
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRoom && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Tipo:</span>
                          <span className="ml-2 font-semibold">{getRoomTypeName(selectedRoom.type)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Capacidad:</span>
                          <span className="ml-2 font-semibold">{selectedRoom.capacity} personas</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Precio/noche:</span>
                          <span className="ml-2 font-semibold">{formatCurrency(selectedRoom.pricePerNight)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fechas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    2. Fechas de Estadía
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-in *</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Check-out *</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  {nights > 0 && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-900">Número de noches:</span>
                        <Badge variant="default" className="text-lg px-4 py-2">{nights}</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Datos del Huésped */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    3. Datos del Huésped Principal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre *</Label>
                      <Input
                        id="firstName"
                        value={guestData.firstName}
                        onChange={(e) => setGuestData({...guestData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido *</Label>
                      <Input
                        id="lastName"
                        value={guestData.lastName}
                        onChange={(e) => setGuestData({...guestData, lastName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={guestData.email}
                        onChange={(e) => setGuestData({...guestData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestData.phone}
                        onChange={(e) => setGuestData({...guestData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documentType">Tipo de Documento</Label>
                      <Select
                        value={guestData.documentType}
                        onValueChange={(value) => setGuestData({...guestData, documentType: value as DocumentType})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DNI">DNI</SelectItem>
                          <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document">Número de Documento</Label>
                      <Input
                        id="document"
                        value={guestData.document}
                        onChange={(e) => setGuestData({...guestData, document: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen */}
              {totalPrice > 0 && (
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg">4. Resumen de la Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Precio por noche:</span>
                      <span className="font-semibold">{formatCurrency(selectedRoom!.pricePerNight)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Número de noches:</span>
                      <span className="font-semibold">{nights}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-lg font-semibold">Precio Total:</span>
                      <span className="text-2xl font-bold text-blue-600">{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-900 font-semibold">Adelanto requerido (25%):</span>
                        <span className="text-xl font-bold text-yellow-700">
                          {formatCurrency(totalPrice * 0.25)}
                        </span>
                      </div>
                      <p className="text-xs text-yellow-800 mt-2">
                        El cliente debe pagar este adelanto en las próximas 24 horas
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={!selectedRoomId || !checkIn || !checkOut}>
                <FileText className="mr-2 h-5 w-5" />
                Crear Reserva
              </Button>
            </form>

            {/* Criterios de Aceptación */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-sm text-green-900">
                  ✓ Criterios de Aceptación Cumplidos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-800 space-y-1">
                <p>✓ Formulario completo con validación de datos</p>
                <p>✓ Selección de habitación disponible</p>
                <p>✓ Cálculo automático de número de noches</p>
                <p>✓ Cálculo automático de precio total</p>
                <p>✓ Visualización del adelanto del 25%</p>
                <p>✓ Generación automática de número de reserva</p>
                <p>✓ Confirmación visual de reserva creada</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
