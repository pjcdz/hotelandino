'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useReservations } from "@/contexts/ReservationContext";
import { formatCurrency, formatDate } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, LogIn, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { Reservation, Payment } from "@/types";

export default function CheckInPage() {
  const { reservations, getPaymentsByReservation, updateReservation } = useReservations();
  
  const [selectedReservation, setSelectedReservation] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const confirmedReservations = reservations.filter((r: Reservation) => 
    r.status === 'confirmada'
  );
  
  const selectedReservationData = reservations.find((r: Reservation) => r.id === selectedReservation);

  const handleCheckIn = () => {
    if (!selectedReservationData) return;

    const reservationPayments = getPaymentsByReservation(selectedReservationData.id);
    const totalPaid = reservationPayments.reduce((sum: number, p: Payment) => sum + p.amount, 0);
    const remaining = selectedReservationData.totalPrice - totalPaid;

    if (remaining > 0) {
      alert(`No se puede realizar el check-in. Falta abonar ${formatCurrency(remaining)}`);
      return;
    }

    // Verificar fecha
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(selectedReservationData.checkInDate);
    checkInDate.setHours(0, 0, 0, 0);

    if (today < checkInDate) {
      const daysEarly = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (!confirm(`El check-in está programado para ${formatDate(checkInDate)} (en ${daysEarly} día${daysEarly !== 1 ? 's' : ''}). ¿Desea realizar check-in anticipado?`)) {
        return;
      }
    }

    updateReservation(selectedReservationData.id, {
      status: 'completada'
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedReservation('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="container mx-auto max-w-6xl">
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
                  <LogIn className="h-6 w-6" />
                  PB-10: Proceso de Check-In
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 4 - Operaciones y Finalización | 10 Story Points
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
                Proceso de check-in que verifica el pago completo antes de permitir el ingreso del huésped.
                Aplica <strong>RN-P01</strong> (verificación de pago del saldo) y <strong>RN-V04</strong> 
                (validación de fecha de check-in).
              </p>
            </div>

            {showSuccess && (
              <Alert className="bg-green-100 border-2 border-green-400">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-900 font-semibold">
                  ¡Check-in realizado exitosamente! La habitación está lista para el huésped.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Selector y Validaciones */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Realizar Check-In</CardTitle>
                  <CardDescription>Seleccione una reserva confirmada</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reserva</label>
                    <Select value={selectedReservation} onValueChange={setSelectedReservation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una reserva" />
                      </SelectTrigger>
                      <SelectContent>
                        {confirmedReservations.length === 0 ? (
                          <SelectItem value="none" disabled>No hay reservas confirmadas</SelectItem>
                        ) : (
                          confirmedReservations.map((reservation: Reservation) => {
                            const mainGuest = reservation.guests[0];
                            return (
                              <SelectItem key={reservation.id} value={reservation.id}>
                                {reservation.reservationNumber} - {mainGuest?.lastName || 'Sin huésped'} ({formatDate(reservation.checkInDate)})
                              </SelectItem>
                            );
                          })
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedReservationData && (() => {
                    const mainGuest = selectedReservationData.guests[0];
                    const reservationPayments = getPaymentsByReservation(selectedReservationData.id);
                    const totalPaid = reservationPayments.reduce((sum: number, p: Payment) => sum + p.amount, 0);
                    const remaining = selectedReservationData.totalPrice - totalPaid;
                    const isFullyPaid = remaining <= 0;

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const checkInDate = new Date(selectedReservationData.checkInDate);
                    checkInDate.setHours(0, 0, 0, 0);
                    const isToday = today.getTime() === checkInDate.getTime();
                    const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                    return (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Cliente</div>
                            <div className="font-semibold text-lg">
                              {mainGuest?.firstName} {mainGuest?.lastName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {mainGuest?.documentType} {mainGuest?.document}
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="text-sm text-gray-600 mb-1">Reserva</div>
                            <div className="font-mono text-sm font-semibold">{selectedReservationData.reservationNumber}</div>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="text-sm text-gray-600 mb-1">Estadía</div>
                            <div className="text-sm">
                              <Clock className="inline h-4 w-4 mr-1" />
                              {selectedReservationData.numberOfNights} noche{selectedReservationData.numberOfNights !== 1 ? 's' : ''}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatDate(selectedReservationData.checkInDate)} → {formatDate(selectedReservationData.checkOutDate)}
                            </div>
                          </div>
                        </div>

                        {/* Validación de Fecha */}
                        {!isToday && (
                          <Alert variant={daysUntilCheckIn > 0 ? "default" : "destructive"}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {daysUntilCheckIn > 0 ? (
                                <>Check-in programado para {formatDate(checkInDate)} (en {daysUntilCheckIn} día{daysUntilCheckIn !== 1 ? 's' : ''})</>
                              ) : (
                                <>La fecha de check-in ya pasó ({formatDate(checkInDate)})</>
                              )}
                            </AlertDescription>
                          </Alert>
                        )}

                        {/* Validación de Pago */}
                        <Alert variant={isFullyPaid ? "default" : "destructive"} className={isFullyPaid ? "bg-green-50 border-green-300" : ""}>
                          <CheckCircle2 className={`h-4 w-4 ${isFullyPaid ? 'text-green-600' : 'text-red-600'}`} />
                          <AlertDescription className={isFullyPaid ? "text-green-800" : "text-red-800"}>
                            {isFullyPaid ? (
                              <strong>✓ Pago completo verificado</strong>
                            ) : (
                              <>
                                <strong>⚠ Pago incompleto</strong>
                                <br />
                                Falta abonar: {formatCurrency(remaining)}
                              </>
                            )}
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-700">Total Reserva:</span>
                            <span className="font-semibold">{formatCurrency(selectedReservationData.totalPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Pagado:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(totalPaid)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="text-gray-900 font-semibold">Saldo:</span>
                            <span className={`font-bold ${remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {formatCurrency(remaining)}
                            </span>
                          </div>
                        </div>

                        <Button 
                          onClick={handleCheckIn}
                          size="lg" 
                          className="w-full"
                          disabled={!isFullyPaid}
                        >
                          <LogIn className="mr-2 h-5 w-5" />
                          Confirmar Check-In
                        </Button>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Lista de Reservas para Hoy */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Check-Ins Programados para Hoy</CardTitle>
                  <CardDescription>Reservas listas para ingresar</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    const todayCheckIns = confirmedReservations.filter((r: Reservation) => {
                      const checkInDate = new Date(r.checkInDate);
                      checkInDate.setHours(0, 0, 0, 0);
                      return checkInDate.getTime() === today.getTime();
                    });

                    if (todayCheckIns.length === 0) {
                      return (
                        <div className="text-center py-8 text-gray-500">
                          No hay check-ins programados para hoy
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {todayCheckIns.map((reservation: Reservation) => {
                          const mainGuest = reservation.guests[0];
                          const reservationPayments = getPaymentsByReservation(reservation.id);
                          const totalPaid = reservationPayments.reduce((sum: number, p: Payment) => sum + p.amount, 0);
                          const isFullyPaid = totalPaid >= reservation.totalPrice;

                          return (
                            <div 
                              key={reservation.id} 
                              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() => setSelectedReservation(reservation.id)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="font-semibold">
                                    {mainGuest?.firstName} {mainGuest?.lastName}
                                  </div>
                                  <div className="text-xs text-gray-600 font-mono">
                                    {reservation.reservationNumber}
                                  </div>
                                </div>
                                <Badge variant={isFullyPaid ? "default" : "destructive"}>
                                  {isFullyPaid ? '✓ Pagado' : '⚠ Pendiente'}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                {reservation.numberOfNights} noche{reservation.numberOfNights !== 1 ? 's' : ''} • {formatCurrency(reservation.totalPrice)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>

            {/* Reglas de Negocio */}
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">
                  📋 Reglas de Negocio Aplicadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-purple-900">
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-P01:</strong> El check-in solo se permite si el saldo restante (75%) ha sido pagado en su totalidad
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-V04:</strong> El sistema verifica que la fecha de check-in corresponda con la reserva
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-T02:</strong> Cambio de estado de reserva: de "confirmada" a "completada" tras el check-in exitoso
                </div>
              </CardContent>
            </Card>

            {/* Criterios de Aceptación */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-sm text-green-900">
                  ✓ Criterios de Aceptación Cumplidos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-800 space-y-1">
                <p>✓ Solo muestra reservas en estado "confirmada"</p>
                <p>✓ Verifica que el pago esté completo antes de permitir check-in</p>
                <p>✓ Muestra alertas si falta pago o la fecha no coincide</p>
                <p>✓ Lista los check-ins programados para hoy</p>
                <p>✓ Actualiza el estado de la reserva a "completada"</p>
                <p>✓ Muestra confirmación visual del check-in exitoso</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
