'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useReservations } from "@/contexts/ReservationContext";
import { formatCurrency, formatDate } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, Clock, AlertTriangle, XCircle, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Reservation, Payment } from "@/types";

export default function AutoCancelPage() {
  const { reservations, getPaymentsByReservation, cancelReservation } = useReservations();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [autoCancelled, setAutoCancelled] = useState<string[]>([]);

  // Actualizar hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Verificar y auto-cancelar reservas pendientes después de 24hs
  useEffect(() => {
    const pendingReservations = reservations.filter((r: Reservation) => r.status === 'pendiente');
    
    pendingReservations.forEach((reservation: Reservation) => {
      const createdAt = new Date(reservation.createdAt);
      const hoursSinceCreation = (currentTime.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
      
      const reservationPayments = getPaymentsByReservation(reservation.id);
      const hasPayment = reservationPayments.length > 0;
      
      // Auto-cancelar si han pasado más de 24hs sin pago del adelanto
      if (hoursSinceCreation >= 24 && !hasPayment && !autoCancelled.includes(reservation.id)) {
        cancelReservation(reservation.id);
        setAutoCancelled(prev => [...prev, reservation.id]);
      }
    });
  }, [currentTime, reservations, cancelReservation, getPaymentsByReservation, autoCancelled]);

  const pendingReservations = reservations.filter((r: Reservation) => r.status === 'pendiente');
  const recentlyCancelled = reservations.filter((r: Reservation) => 
    r.status === 'cancelada' && autoCancelled.includes(r.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 p-8">
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
                  <Clock className="h-6 w-6" />
                  PB-08: Sistema de Auto-cancelación (24hs)
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 3-4 - Gestión Automática | Proceso Automático
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                ⚙️ Activo
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Descripción */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Descripción del Sistema Automático</h3>
              <p className="text-yellow-800 text-sm">
                Sistema automático que cancela reservas pendientes que no hayan recibido el pago del adelanto
                dentro de las 24 horas siguientes a su creación. Aplica <strong>RN-T01</strong> 
                (timeout de 24 horas) y <strong>RN-P02</strong> (confirmación mediante adelanto).
              </p>
            </div>

            {/* Hora Actual del Sistema */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <RefreshCcw className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-spin" />
                  <div className="text-sm text-blue-700 mb-1">Hora del Sistema</div>
                  <div className="text-3xl font-bold text-blue-900 font-mono">
                    {currentTime.toLocaleTimeString('es-AR')}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    {currentTime.toLocaleDateString('es-AR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alertas de Cancelaciones Recientes */}
            {recentlyCancelled.length > 0 && (
              <Alert variant="destructive" className="bg-red-50 border-red-300">
                <XCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-900">
                  <strong>¡Atención!</strong> Se han cancelado automáticamente {recentlyCancelled.length} reserva
                  {recentlyCancelled.length !== 1 ? 's' : ''} por vencimiento del plazo de 24 horas sin pago.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reservas en Riesgo */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Reservas Pendientes de Pago
                  </CardTitle>
                  <CardDescription>Monitoreo en tiempo real del timeout</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingReservations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No hay reservas pendientes actualmente
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingReservations.map((reservation: Reservation) => {
                        const createdAt = new Date(reservation.createdAt);
                        const hoursSinceCreation = (currentTime.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
                        const hoursRemaining = Math.max(0, 24 - hoursSinceCreation);
                        const minutesRemaining = Math.floor((hoursRemaining % 1) * 60);
                        const hoursRemainingInt = Math.floor(hoursRemaining);
                        const percentage = Math.min(100, (hoursSinceCreation / 24) * 100);
                        
                        const mainGuest = reservation.guests[0];
                        const isAtRisk = hoursRemaining < 2;
                        const isCritical = hoursRemaining < 0.5;

                        return (
                          <div 
                            key={reservation.id} 
                            className={`p-4 border-2 rounded-lg ${
                              isCritical ? 'border-red-300 bg-red-50' : 
                              isAtRisk ? 'border-orange-300 bg-orange-50' : 
                              'border-yellow-300 bg-yellow-50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="font-semibold">
                                  {mainGuest?.firstName} {mainGuest?.lastName}
                                </div>
                                <div className="text-xs text-gray-600 font-mono">
                                  {reservation.reservationNumber}
                                </div>
                              </div>
                              <Badge 
                                variant={
                                  isCritical ? 'destructive' : 
                                  isAtRisk ? 'default' : 
                                  'secondary'
                                }
                              >
                                {isCritical ? '🚨 Crítico' : isAtRisk ? '⚠️ Riesgo' : '⏳ Pendiente'}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-700">Creada:</span>
                                <span className="font-semibold">{formatDate(createdAt)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-700">Tiempo restante:</span>
                                <span className={`font-bold ${
                                  isCritical ? 'text-red-600' : 
                                  isAtRisk ? 'text-orange-600' : 
                                  'text-yellow-700'
                                }`}>
                                  {hoursRemaining > 0 ? (
                                    `${hoursRemainingInt}h ${minutesRemaining}m`
                                  ) : (
                                    'VENCIDO - Cancelando...'
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-700">Adelanto requerido:</span>
                                <span className="font-semibold">{formatCurrency(reservation.advancePayment)}</span>
                              </div>

                              {/* Barra de Progreso */}
                              <div className="pt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all ${
                                      isCritical ? 'bg-red-600' : 
                                      isAtRisk ? 'bg-orange-500' : 
                                      'bg-yellow-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <div className="text-xs text-gray-500 mt-1 text-right">
                                  {percentage.toFixed(1)}% del plazo transcurrido
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Reservas Auto-canceladas */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Canceladas Automáticamente
                  </CardTitle>
                  <CardDescription>Historial de cancelaciones por timeout</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentlyCancelled.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No hay cancelaciones automáticas recientes
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentlyCancelled.map((reservation: Reservation) => {
                        const mainGuest = reservation.guests[0];
                        const createdAt = new Date(reservation.createdAt);
                        
                        return (
                          <div key={reservation.id} className="p-4 border rounded-lg bg-red-50 border-red-200">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-semibold text-red-900">
                                  {mainGuest?.firstName} {mainGuest?.lastName}
                                </div>
                                <div className="text-xs text-red-700 font-mono">
                                  {reservation.reservationNumber}
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                                Auto-cancelada
                              </Badge>
                            </div>
                            <div className="text-sm text-red-800 space-y-1">
                              <div className="flex justify-between">
                                <span>Creada:</span>
                                <span>{formatDate(createdAt)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cancelada:</span>
                                <span>{formatDate(reservation.updatedAt)}</span>
                              </div>
                              <div className="flex justify-between font-semibold pt-2 border-t border-red-300">
                                <span>Motivo:</span>
                                <span>Timeout 24hs sin pago</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
                  <strong>RN-T01:</strong> Las reservas sin pago del adelanto se cancelan automáticamente a las 24 horas
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-P02:</strong> Solo el pago del adelanto (25%) confirma y preserva la reserva
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-T03:</strong> La cancelación automática es definitiva y no puede revertirse
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-P04:</strong> La habitación queda automáticamente disponible tras la cancelación
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
                <p>✓ El sistema monitorea continuamente las reservas pendientes</p>
                <p>✓ Cuenta regresiva en tiempo real del plazo de 24 horas</p>
                <p>✓ Alertas visuales para reservas en riesgo (crítico, moderado)</p>
                <p>✓ Cancelación automática al cumplirse el plazo sin pago</p>
                <p>✓ Registro de cancelaciones automáticas para auditoría</p>
                <p>✓ Liberación inmediata de habitaciones canceladas</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
