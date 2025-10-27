'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useReservations } from "@/contexts/ReservationContext";
import { formatCurrency, formatDate } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, XCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Reservation, Payment } from "@/types";

export default function CancelReservationPage() {
  const { reservations, getPaymentsByReservation, cancelReservation } = useReservations();
  
  const [selectedReservation, setSelectedReservation] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const activeReservations = reservations.filter((r: Reservation) => 
    r.status === 'pendiente' || r.status === 'confirmada'
  );
  
  const selectedReservationData = reservations.find((r: Reservation) => r.id === selectedReservation);

  const handleCancelConfirm = () => {
    if (!selectedReservationData) return;

    cancelReservation(selectedReservationData.id);
    
    setDialogOpen(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedReservation('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-8">
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
                  <XCircle className="h-6 w-6" />
                  PB-11: Cancelación Manual de Reservas
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 4 - Operaciones y Finalización | 5 Story Points (Parcial)
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                ✓ Completado
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Descripción */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Descripción de la Funcionalidad</h3>
              <p className="text-red-800 text-sm">
                Permite cancelar una reserva manualmente por solicitud del cliente o del hotel.
                Aplica <strong>RN-R03</strong> (no hay reintegro de pagos) y <strong>RN-T03</strong> 
                (cambio de estado a "cancelada").
              </p>
            </div>

            {/* Advertencia de Política */}
            <Alert variant="destructive" className="bg-orange-50 border-orange-300">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <AlertDescription className="text-orange-900">
                <strong>Política de Cancelación:</strong> Los pagos realizados NO son reembolsables.
                La cancelación es definitiva e irreversible.
              </AlertDescription>
            </Alert>

            {showSuccess && (
              <Alert className="bg-green-100 border-2 border-green-400">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-900 font-semibold">
                  Reserva cancelada exitosamente. Los pagos realizados no serán reintegrados.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Selector de Reserva */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Cancelar Reserva</CardTitle>
                  <CardDescription>Seleccione la reserva a cancelar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reserva Activa</label>
                    <Select value={selectedReservation} onValueChange={setSelectedReservation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una reserva" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeReservations.length === 0 ? (
                          <SelectItem value="none" disabled>No hay reservas activas</SelectItem>
                        ) : (
                          activeReservations.map((reservation: Reservation) => {
                            const mainGuest = reservation.guests[0];
                            return (
                              <SelectItem key={reservation.id} value={reservation.id}>
                                {reservation.reservationNumber} - {mainGuest?.lastName || 'Sin huésped'} ({reservation.status})
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

                    return (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Cliente</div>
                            <div className="font-semibold text-lg">
                              {mainGuest?.firstName} {mainGuest?.lastName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {mainGuest?.email}
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="text-sm text-gray-600 mb-1">Número de Reserva</div>
                            <div className="font-mono font-semibold">{selectedReservationData.reservationNumber}</div>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="text-sm text-gray-600 mb-1">Estado Actual</div>
                            <Badge variant={selectedReservationData.status === 'confirmada' ? 'default' : 'secondary'}>
                              {selectedReservationData.status.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="text-sm text-gray-600 mb-1">Fechas</div>
                            <div className="text-sm">
                              {formatDate(selectedReservationData.checkInDate)} → {formatDate(selectedReservationData.checkOutDate)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedReservationData.numberOfNights} noche{selectedReservationData.numberOfNights !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>

                        {/* Información de Pagos */}
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div className="space-y-2 flex-1">
                              <div className="font-semibold text-orange-900">
                                Pagos que se perderán al cancelar:
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Total de la Reserva:</span>
                                  <span className="font-semibold">{formatCurrency(selectedReservationData.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Total Pagado:</span>
                                  <span className="font-semibold text-red-600">{formatCurrency(totalPaid)}</span>
                                </div>
                                {totalPaid > 0 && (
                                  <div className="pt-2 border-t border-orange-300">
                                    <div className="text-xs text-orange-800 font-semibold">
                                      ⚠️ Este monto NO será reintegrado según RN-R03
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="lg" className="w-full">
                              <XCircle className="mr-2 h-5 w-5" />
                              Cancelar Reserva
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-red-600">¿Confirmar Cancelación?</DialogTitle>
                              <DialogDescription className="space-y-3 pt-3">
                                <p>
                                  Está a punto de cancelar la reserva <strong>{selectedReservationData.reservationNumber}</strong> 
                                  de <strong>{mainGuest?.firstName} {mainGuest?.lastName}</strong>.
                                </p>
                                {totalPaid > 0 && (
                                  <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>
                                      <strong>Los {formatCurrency(totalPaid)} pagados no serán reembolsados.</strong>
                                      <br />
                                      Esta acción es irreversible.
                                    </AlertDescription>
                                  </Alert>
                                )}
                                <p className="text-sm text-gray-600">
                                  La habitación quedará disponible para nuevas reservas.
                                </p>
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                No, volver atrás
                              </Button>
                              <Button variant="destructive" onClick={handleCancelConfirm}>
                                Sí, cancelar reserva
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Historial de Cancelaciones */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Reservas Canceladas</CardTitle>
                  <CardDescription>Historial de cancelaciones</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const cancelledReservations = reservations.filter((r: Reservation) => r.status === 'cancelada');

                    if (cancelledReservations.length === 0) {
                      return (
                        <div className="text-center py-8 text-gray-500">
                          No hay reservas canceladas
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {cancelledReservations.map((reservation: Reservation) => {
                          const mainGuest = reservation.guests[0];
                          const reservationPayments = getPaymentsByReservation(reservation.id);
                          const totalPaid = reservationPayments.reduce((sum: number, p: Payment) => sum + p.amount, 0);

                          return (
                            <div key={reservation.id} className="p-4 border rounded-lg bg-gray-50">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="font-semibold">
                                    {mainGuest?.firstName} {mainGuest?.lastName}
                                  </div>
                                  <div className="text-xs text-gray-600 font-mono">
                                    {reservation.reservationNumber}
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                                  Cancelada
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex justify-between">
                                  <span>Check-in programado:</span>
                                  <span>{formatDate(reservation.checkInDate)}</span>
                                </div>
                                {totalPaid > 0 && (
                                  <div className="flex justify-between text-red-600">
                                    <span>Monto perdido:</span>
                                    <span className="font-semibold">{formatCurrency(totalPaid)}</span>
                                  </div>
                                )}
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
                  <strong>RN-R03:</strong> Los pagos realizados no son reembolsables en caso de cancelación
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-T03:</strong> El estado de la reserva cambia a "cancelada" y no puede revertirse
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-P04:</strong> La habitación queda inmediatamente disponible para nuevas reservas
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
                <p>✓ Permite seleccionar reservas pendientes o confirmadas</p>
                <p>✓ Muestra claramente la política de no reintegro</p>
                <p>✓ Requiere confirmación explícita antes de cancelar</p>
                <p>✓ Muestra el monto que se perderá al cancelar</p>
                <p>✓ Actualiza el estado de la reserva a "cancelada"</p>
                <p>✓ Mantiene historial de reservas canceladas</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
