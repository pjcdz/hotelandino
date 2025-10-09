'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useReservations } from "@/contexts/ReservationContext";
import { formatCurrency, formatDate } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Printer, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Reservation, Payment } from "@/types";

export default function ReceiptPage() {
  const { reservations, getPaymentsByReservation } = useReservations();
  
  const [selectedReservation, setSelectedReservation] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const paidReservations = reservations.filter((r: Reservation) => 
    getPaymentsByReservation(r.id).length > 0
  );
  
  const selectedReservationData = reservations.find((r: Reservation) => r.id === selectedReservation);
  const reservationPayments = selectedReservation ? getPaymentsByReservation(selectedReservation) : [];
  const selectedPaymentData = reservationPayments.find((p: Payment) => p.id === selectedPayment);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('En un sistema real, esto generaría un PDF descargable');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="no-print">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
            </Button>
          </Link>
        </div>

        <Card className="no-print">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  PB-07: Generación de Recibos
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 3 - Comprobantes y Gestión Operativa | 10 Story Points
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                ✓ Completado
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Descripción */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Descripción de la Funcionalidad</h3>
              <p className="text-orange-800 text-sm">
                Sistema de generación automática de recibos de pago. Cada recibo incluye datos del 
                cliente, detalle de la reserva, monto pagado, y número único de comprobante.
                Cumple con la <strong>RN-P03</strong> (emisión de comprobante).
              </p>
            </div>

            {/* Selector de Reserva y Pago */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Seleccionar Reserva</label>
                <Select value={selectedReservation} onValueChange={(v) => {
                  setSelectedReservation(v);
                  setSelectedPayment('');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una reserva" />
                  </SelectTrigger>
                  <SelectContent>
                    {paidReservations.map((reservation: Reservation) => {
                      const mainGuest = reservation.guests[0];
                      return (
                        <SelectItem key={reservation.id} value={reservation.id}>
                          {reservation.reservationNumber} - {mainGuest?.lastName || 'Sin huésped'}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {selectedReservation && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seleccionar Pago</label>
                  <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un pago" />
                    </SelectTrigger>
                    <SelectContent>
                      {reservationPayments.map((payment: Payment, idx: number) => (
                        <SelectItem key={payment.id} value={payment.id}>
                          Pago #{idx + 1} - {formatCurrency(payment.amount)} ({formatDate(payment.paymentDate)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {selectedPaymentData && selectedReservationData && (
              <Alert className="bg-green-50 border-green-300">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Recibo listo para imprimir o descargar
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Vista Previa del Recibo */}
        {selectedPaymentData && selectedReservationData && (() => {
          const mainGuest = selectedReservationData.guests[0];
          const isAdvance = selectedPaymentData.amount === selectedReservationData.advancePayment;
          
          return (
            <>
              <div className="no-print flex gap-2 my-6">
                <Button onClick={handlePrint} size="lg" className="flex-1">
                  <Printer className="mr-2 h-5 w-5" />
                  Imprimir Recibo
                </Button>
                <Button onClick={handleDownload} size="lg" variant="outline" className="flex-1">
                  <Download className="mr-2 h-5 w-5" />
                  Descargar PDF
                </Button>
              </div>

              <Card className="border-2 shadow-lg print:shadow-none">
                <CardContent className="p-8">
                  {/* Encabezado del Recibo */}
                  <div className="text-center mb-8 border-b-2 pb-6">
                    <h1 className="text-3xl font-bold text-blue-900">Hotel Andino</h1>
                    <p className="text-sm text-gray-600 mt-2">Av. Principal 1234, Mendoza, Argentina</p>
                    <p className="text-sm text-gray-600">Tel: +54 261 123-4567 | Email: info@hotelandino.com.ar</p>
                    <div className="mt-4">
                      <Badge variant="default" className="text-lg px-6 py-2">
                        RECIBO DE PAGO
                      </Badge>
                    </div>
                  </div>

                  {/* Información del Recibo */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Datos del Recibo</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Número de Recibo:</span>
                          <span className="font-mono font-bold">{selectedPaymentData.receiptNumber || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fecha de Emisión:</span>
                          <span className="font-semibold">{formatDate(selectedPaymentData.paymentDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tipo de Pago:</span>
                          <span className="font-semibold">{isAdvance ? 'Adelanto (25%)' : 'Pago Parcial'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Datos del Cliente</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nombre:</span>
                          <span className="font-semibold">
                            {mainGuest?.firstName} {mainGuest?.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Documento:</span>
                          <span className="font-semibold">
                            {mainGuest?.documentType} {mainGuest?.document}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-semibold text-xs">{mainGuest?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información de la Reserva */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Detalle de la Reserva</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Número de Reserva:</span>
                        <span className="font-mono font-bold">{selectedReservationData.reservationNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Check-in:</span>
                        <span className="font-semibold">{formatDate(selectedReservationData.checkInDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Check-out:</span>
                        <span className="font-semibold">{formatDate(selectedReservationData.checkOutDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Noches:</span>
                        <span className="font-semibold">{selectedReservationData.numberOfNights}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-semibold">Total Reserva:</span>
                        <span className="font-bold text-lg">{formatCurrency(selectedReservationData.totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detalle del Pago */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-300 mb-8">
                    <div className="text-center">
                      <div className="text-sm text-green-700 mb-2">MONTO PAGADO</div>
                      <div className="text-5xl font-bold text-green-700 mb-4">
                        {formatCurrency(selectedPaymentData.amount)}
                      </div>
                      <div className="text-sm text-green-600">
                        {selectedPaymentData.currency} - {selectedPaymentData.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Estado de Pagos */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Estado de Cuenta</h3>
                    <div className="space-y-2 text-sm">
                      {(() => {
                        const totalPaid = reservationPayments.reduce((sum: number, p: Payment) => sum + p.amount, 0);
                        const remaining = selectedReservationData.totalPrice - totalPaid;
                        
                        return (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Total de la Reserva:</span>
                              <span className="font-semibold">{formatCurrency(selectedReservationData.totalPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Total Abonado:</span>
                              <span className="font-semibold text-green-600">{formatCurrency(totalPaid)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t-2 border-gray-300">
                              <span className="text-gray-900 font-bold">Saldo Pendiente:</span>
                              <span className={`font-bold text-lg ${remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {formatCurrency(remaining)}
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Pie del Recibo */}
                  <div className="border-t-2 pt-6 text-center text-xs text-gray-500 space-y-2">
                    <p className="font-semibold">Este recibo es válido como comprobante de pago</p>
                    <p>
                      Según RN-P03, todo pago debe estar respaldado por un comprobante con número único.
                      <br />
                      Los pagos realizados no son reembolsables (RN-R03).
                    </p>
                    <p className="mt-4 text-gray-400">
                      Generado electrónicamente por el Sistema Hotel Andino MVP
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          );
        })()}

        {/* Reglas de Negocio */}
        <Card className="border-2 border-purple-200 bg-purple-50 mt-6 no-print">
          <CardHeader>
            <CardTitle className="text-lg text-purple-900">
              📋 Reglas de Negocio Aplicadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-purple-900">
            <div className="p-3 bg-white rounded-lg">
              <strong>RN-P03:</strong> Se emite un comprobante con número único por cada pago recibido
            </div>
            <div className="p-3 bg-white rounded-lg">
              <strong>RN-V03:</strong> El recibo incluye todos los datos de la reserva y el cliente
            </div>
            <div className="p-3 bg-white rounded-lg">
              <strong>RN-R03:</strong> Se informa al cliente que los pagos no son reembolsables
            </div>
          </CardContent>
        </Card>

        {/* Criterios de Aceptación */}
        <Card className="bg-green-50 border-green-200 mt-6 no-print">
          <CardHeader>
            <CardTitle className="text-sm text-green-900">
              ✓ Criterios de Aceptación Cumplidos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-800 space-y-1">
            <p>✓ El recibo incluye número único de comprobante</p>
            <p>✓ Muestra todos los datos del cliente y la reserva</p>
            <p>✓ Detalla el monto pagado y el saldo pendiente</p>
            <p>✓ Es imprimible y descargable (funcionalidad de impresión)</p>
            <p>✓ Incluye fecha de emisión y tipo de pago</p>
            <p>✓ Formato profesional y legible</p>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none,
          .print\\:shadow-none * {
            visibility: visible;
          }
          .no-print {
            display: none !important;
          }
          .print\\:shadow-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
