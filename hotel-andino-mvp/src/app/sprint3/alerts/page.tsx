'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useReservations } from "@/contexts/ReservationContext";
import { formatCurrency, formatDate } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, Bell, AlertTriangle, Clock, Mail, Phone, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Reservation } from "@/types";

export default function AlertsPage() {
  const { reservations, getPaymentsByReservation } = useReservations();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar hora cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filtrar reservas pendientes
  const pendingReservations = reservations.filter((r: Reservation) => r.status === 'pendiente');

  // Clasificar reservas por urgencia
  const getReservationUrgency = (reservation: Reservation) => {
    const createdAt = new Date(reservation.createdAt);
    const hoursSinceCreation = (currentTime.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    const hoursRemaining = 24 - hoursSinceCreation;

    if (hoursRemaining <= 0) return { level: 'expired', color: 'red', label: 'VENCIDO' };
    if (hoursRemaining < 1) return { level: 'critical', color: 'red', label: 'CRÍTICO' };
    if (hoursRemaining < 4) return { level: 'high', color: 'orange', label: 'ALTO' };
    if (hoursRemaining < 12) return { level: 'medium', color: 'yellow', label: 'MEDIO' };
    return { level: 'low', color: 'blue', label: 'BAJO' };
  };

  const criticalAlerts = pendingReservations.filter(r => {
    const urgency = getReservationUrgency(r);
    return urgency.level === 'critical' || urgency.level === 'expired';
  });

  const highAlerts = pendingReservations.filter(r => {
    const urgency = getReservationUrgency(r);
    return urgency.level === 'high';
  });

  const mediumAlerts = pendingReservations.filter(r => {
    const urgency = getReservationUrgency(r);
    return urgency.level === 'medium';
  });

  const lowAlerts = pendingReservations.filter(r => {
    const urgency = getReservationUrgency(r);
    return urgency.level === 'low';
  });

  const renderReservationCard = (reservation: Reservation) => {
    const mainGuest = reservation.guests[0];
    const createdAt = new Date(reservation.createdAt);
    const hoursSinceCreation = (currentTime.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, 24 - hoursSinceCreation);
    const minutesRemaining = Math.floor((hoursRemaining % 1) * 60);
    const hoursRemainingInt = Math.floor(hoursRemaining);
    const urgency = getReservationUrgency(reservation);

    const bgColors = {
      red: 'bg-red-50 border-red-300',
      orange: 'bg-orange-50 border-orange-300',
      yellow: 'bg-yellow-50 border-yellow-300',
      blue: 'bg-blue-50 border-blue-300'
    };

    const textColors = {
      red: 'text-red-900',
      orange: 'text-orange-900',
      yellow: 'text-yellow-900',
      blue: 'text-blue-900'
    };

    return (
      <Card key={reservation.id} className={`border-2 ${bgColors[urgency.color as keyof typeof bgColors]}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className={`text-lg ${textColors[urgency.color as keyof typeof textColors]}`}>
                {mainGuest?.firstName} {mainGuest?.lastName}
              </CardTitle>
              <CardDescription className="font-mono text-xs mt-1">
                {reservation.reservationNumber}
              </CardDescription>
            </div>
            <Badge 
              variant={urgency.level === 'critical' || urgency.level === 'expired' ? 'destructive' : 'default'}
              className="ml-2"
            >
              {urgency.level === 'expired' ? '🚨' : urgency.level === 'critical' ? '⚠️' : '⏰'} {urgency.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Información del Cliente */}
          <div className="space-y-1 text-sm">
            {mainGuest?.email && (
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4" />
                <span className="text-xs">{mainGuest.email}</span>
              </div>
            )}
            {mainGuest?.phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4" />
                <span className="text-xs">{mainGuest.phone}</span>
              </div>
            )}
          </div>

          {/* Información de la Reserva */}
          <div className={`p-3 bg-white rounded-lg border ${urgency.color === 'red' ? 'border-red-200' : 'border-gray-200'}`}>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-gray-600">Check-in</div>
                <div className="font-semibold">{formatDate(reservation.checkInDate)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Noches</div>
                <div className="font-semibold">{reservation.numberOfNights}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-600">Adelanto requerido</div>
                <div className="font-bold text-lg">{formatCurrency(reservation.advancePayment)}</div>
              </div>
            </div>
          </div>

          {/* Tiempo Restante */}
          <div className={`p-3 rounded-lg ${
            urgency.level === 'expired' ? 'bg-red-100' :
            urgency.level === 'critical' ? 'bg-red-100' :
            urgency.level === 'high' ? 'bg-orange-100' :
            'bg-gray-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className={`h-5 w-5 ${
                  urgency.level === 'expired' || urgency.level === 'critical' ? 'text-red-600' :
                  urgency.level === 'high' ? 'text-orange-600' :
                  'text-gray-600'
                }`} />
                <span className="text-xs font-medium text-gray-700">Tiempo restante</span>
              </div>
              <div className={`font-bold text-lg ${
                urgency.level === 'expired' || urgency.level === 'critical' ? 'text-red-600' :
                urgency.level === 'high' ? 'text-orange-600' :
                'text-gray-700'
              }`}>
                {hoursRemaining > 0 ? (
                  `${hoursRemainingInt}h ${minutesRemaining}m`
                ) : (
                  'VENCIDO'
                )}
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all ${
                    urgency.level === 'expired' || urgency.level === 'critical' ? 'bg-red-600' :
                    urgency.level === 'high' ? 'bg-orange-500' :
                    urgency.level === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, (hoursSinceCreation / 24) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-2">
            <Link href="/sprint2/payment-register" className="flex-1">
              <Button size="sm" className="w-full">
                Registrar Pago
              </Button>
            </Link>
            <Link href="/sprint4/cancel">
              <Button size="sm" variant="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8">
      <div className="container mx-auto max-w-7xl">
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
                  <Bell className="h-6 w-6" />
                  PB-09: Sistema de Alertas de Pagos Pendientes
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 3 - Monitoreo y Notificaciones | 5 Story Points
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                ✓ Implementado
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Descripción */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Descripción del Sistema de Alertas</h3>
              <p className="text-orange-800 text-sm">
                Monitoreo en tiempo real de reservas pendientes de pago del adelanto. El sistema clasifica
                las alertas por nivel de urgencia (Crítico, Alto, Medio, Bajo) según el tiempo restante
                antes del vencimiento de 24 horas. Facilita la gestión proactiva y reduce cancelaciones
                automáticas. Aplica <strong>RN-T01</strong> (timeout de 24 horas).
              </p>
            </div>

            {/* Resumen de Alertas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-2 border-red-300 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600">{criticalAlerts.length}</div>
                    <div className="text-sm text-red-700 mt-1">Críticas</div>
                    <div className="text-xs text-red-600 mt-1">{"< 1 hora"}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-300 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600">{highAlerts.length}</div>
                    <div className="text-sm text-orange-700 mt-1">Altas</div>
                    <div className="text-xs text-orange-600 mt-1">{"< 4 horas"}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-300 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600">{mediumAlerts.length}</div>
                    <div className="text-sm text-yellow-700 mt-1">Medias</div>
                    <div className="text-xs text-yellow-600 mt-1">{"< 12 horas"}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-300 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{lowAlerts.length}</div>
                    <div className="text-sm text-blue-700 mt-1">Bajas</div>
                    <div className="text-xs text-blue-600 mt-1">{"< 24 horas"}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mensaje si no hay alertas */}
            {pendingReservations.length === 0 && (
              <Alert className="bg-green-50 border-green-300">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-900">Sistema sin alertas pendientes</AlertTitle>
                <AlertDescription className="text-green-800">
                  No hay reservas pendientes de pago en este momento. Todas las reservas activas están confirmadas.
                </AlertDescription>
              </Alert>
            )}

            {/* Alertas Críticas */}
            {criticalAlerts.length > 0 && (
              <div className="space-y-4">
                <Alert variant="destructive" className="bg-red-50 border-red-300">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="text-red-900">¡ATENCIÓN! Alertas Críticas</AlertTitle>
                  <AlertDescription className="text-red-800">
                    {criticalAlerts.length} reserva{criticalAlerts.length !== 1 ? 's' : ''} con menos de 1 hora
                    para vencer. Requiere acción inmediata.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {criticalAlerts.map(renderReservationCard)}
                </div>
              </div>
            )}

            {/* Alertas Altas */}
            {highAlerts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-900">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Alertas de Prioridad Alta ({highAlerts.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {highAlerts.map(renderReservationCard)}
                </div>
              </div>
            )}

            {/* Alertas Medias */}
            {mediumAlerts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-yellow-900">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  Alertas de Prioridad Media ({mediumAlerts.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediumAlerts.map(renderReservationCard)}
                </div>
              </div>
            )}

            {/* Alertas Bajas */}
            {lowAlerts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-900">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Alertas de Prioridad Baja ({lowAlerts.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lowAlerts.map(renderReservationCard)}
                </div>
              </div>
            )}

            {/* Reglas de Negocio */}
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">
                  📋 Reglas de Negocio Aplicadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-purple-900">
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-T01:</strong> Las reservas sin pago tienen 24 horas antes de cancelarse automáticamente
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-P02:</strong> El pago del adelanto (25%) es obligatorio para confirmar la reserva
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-V03:</strong> Los pagos pueden realizarse en pesos argentinos (ARS) o dólares (USD)
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
                <p>✓ Muestra todas las reservas pendientes de pago del adelanto</p>
                <p>✓ Clasifica alertas por nivel de urgencia (Crítico, Alto, Medio, Bajo)</p>
                <p>✓ Cuenta regresiva en tiempo real del plazo restante</p>
                <p>✓ Indicadores visuales claros (colores, iconos, barras de progreso)</p>
                <p>✓ Información de contacto del cliente para seguimiento</p>
                <p>✓ Acceso directo a registrar pago o cancelar reserva</p>
                <p>✓ Resumen estadístico de alertas por nivel</p>
                <p>✓ Actualización automática del estado cada 30 segundos</p>
              </CardContent>
            </Card>

            {/* Recomendaciones */}
            <Alert className="bg-blue-50 border-blue-300">
              <Bell className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-900">Recomendaciones de Uso</AlertTitle>
              <AlertDescription className="text-blue-800 space-y-2">
                <p>
                  • <strong>Alertas Críticas:</strong> Contactar al cliente inmediatamente por teléfono
                </p>
                <p>
                  • <strong>Alertas Altas:</strong> Enviar recordatorio por email y WhatsApp
                </p>
                <p>
                  • <strong>Alertas Medias/Bajas:</strong> Monitoreo regular del panel
                </p>
                <p className="text-xs mt-3">
                  💡 El sistema se actualiza automáticamente cada 30 segundos
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
