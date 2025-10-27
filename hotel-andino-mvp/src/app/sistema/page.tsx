'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft, Home, Calendar, DollarSign, FileText, LogIn, XCircle, Clock } from "lucide-react";

export default function SystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8">
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
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Home className="h-8 w-8" />
                  Sistema Completo - Hotel Andino
                </CardTitle>
                <CardDescription className="mt-2 text-lg">
                  Integración de todos los sprints | Sistema de Gestión Hotelera Completo
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-6 py-3">
                Sistema Integrado
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Descripción General */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 text-xl mb-3">🏨 Sistema de Gestión Hotelera</h3>
              <p className="text-blue-800">
                Este MVP integra todas las funcionalidades desarrolladas en los 4 sprints del proyecto Hotel Andino,
                permitiendo gestionar el ciclo completo de reservas: desde la consulta de disponibilidad hasta el check-in
                y la gestión de pagos, siguiendo las reglas de negocio establecidas.
              </p>
            </div>

            {/* Navegación por Módulos */}
            <Tabs defaultValue="reservas" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="reservas">Reservas</TabsTrigger>
                <TabsTrigger value="pagos">Pagos</TabsTrigger>
                <TabsTrigger value="operaciones">Operaciones</TabsTrigger>
                <TabsTrigger value="reportes">Reportes</TabsTrigger>
              </TabsList>

              {/* Módulo de Reservas */}
              <TabsContent value="reservas" className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mt-6">Gestión de Reservas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/sprint1/availability">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                        <CardTitle className="text-lg">Consultar Disponibilidad</CardTitle>
                        <CardDescription>
                          Verifica habitaciones disponibles por fechas
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 1 | PB-01</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint1/catalog">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <Home className="h-8 w-8 text-purple-600 mb-2" />
                        <CardTitle className="text-lg">Catálogo de Habitaciones</CardTitle>
                        <CardDescription>
                          Explora todos los tipos de habitaciones
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 1 | PB-02</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint2/new-reservation">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <FileText className="h-8 w-8 text-green-600 mb-2" />
                        <CardTitle className="text-lg">Nueva Reserva</CardTitle>
                        <CardDescription>
                          Registra una nueva reserva completa
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 2 | PB-03</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint1/reservation-number">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <FileText className="h-8 w-8 text-orange-600 mb-2" />
                        <CardTitle className="text-lg">Número de Reserva</CardTitle>
                        <CardDescription>
                          Generador automático de números únicos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 1 | PB-06</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint4/cancel">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <XCircle className="h-8 w-8 text-red-600 mb-2" />
                        <CardTitle className="text-lg">Cancelar Reserva</CardTitle>
                        <CardDescription>
                          Gestión de cancelaciones manuales
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 4 | PB-11</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="border-2 border-yellow-300 bg-yellow-50 h-full">
                    <CardHeader>
                      <Clock className="h-8 w-8 text-yellow-700 mb-2" />
                      <CardTitle className="text-lg text-yellow-900">Auto-cancelación</CardTitle>
                      <CardDescription className="text-yellow-800">
                        Sistema automático de cancelación a las 24hs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-900">
                        Sprint 3-4 | PB-08 (Automático)
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Módulo de Pagos */}
              <TabsContent value="pagos" className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mt-6">Gestión de Pagos</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/sprint2/payment-calculation">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <DollarSign className="h-8 w-8 text-yellow-600 mb-2" />
                        <CardTitle className="text-lg">Cálculo del Adelanto</CardTitle>
                        <CardDescription>
                          Calcula automáticamente el 25% de adelanto
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 2 | PB-04</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint2/payment-register">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                        <CardTitle className="text-lg">Registrar Pago</CardTitle>
                        <CardDescription>
                          Registra adelanto o saldo pendiente
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 2-3 | PB-05</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint3/receipt">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <FileText className="h-8 w-8 text-blue-600 mb-2" />
                        <CardTitle className="text-lg">Generar Recibo</CardTitle>
                        <CardDescription>
                          Emite comprobantes de pago
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 3 | PB-07</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>

              {/* Módulo de Operaciones */}
              <TabsContent value="operaciones" className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mt-6">Operaciones Hoteleras</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/sprint4/checkin">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <LogIn className="h-8 w-8 text-blue-600 mb-2" />
                        <CardTitle className="text-lg">Check-In</CardTitle>
                        <CardDescription>
                          Proceso de ingreso de huéspedes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 4 | PB-10</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint4/cancel">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <XCircle className="h-8 w-8 text-red-600 mb-2" />
                        <CardTitle className="text-lg">Cancelar Reserva</CardTitle>
                        <CardDescription>
                          Gestión de cancelaciones manuales
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 4 | PB-11</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint3/auto-cancel">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full">
                      <CardHeader>
                        <Clock className="h-8 w-8 text-yellow-600 mb-2" />
                        <CardTitle className="text-lg">Auto-cancelación 24hs</CardTitle>
                        <CardDescription>
                          Sistema automático de cancelación
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge>Sprint 3 | PB-08</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sprint3/alerts">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full border-orange-300 bg-orange-50">
                      <CardHeader>
                        <FileText className="h-8 w-8 text-orange-600 mb-2" />
                        <CardTitle className="text-lg">Alertas de Pagos</CardTitle>
                        <CardDescription>
                          Monitoreo de reservas pendientes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="default">Sprint 3 | PB-09</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="border-2 border-gray-300 bg-gray-50 h-full opacity-60">
                    <CardHeader>
                      <LogIn className="h-8 w-8 text-gray-400 mb-2" />
                      <CardTitle className="text-lg text-gray-600">Check-Out</CardTitle>
                      <CardDescription className="text-gray-500">
                        Funcionalidad pendiente de desarrollo
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">Pendiente</Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Módulo de Reportes */}
              <TabsContent value="reportes" className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mt-6">Reportes y Estadísticas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/sprint4/reports">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 h-full border-blue-300 bg-blue-50">
                      <CardHeader>
                        <FileText className="h-10 w-10 text-blue-600 mb-3" />
                        <CardTitle className="text-xl">Reportes Gerenciales</CardTitle>
                        <CardDescription className="text-blue-700">
                          Sistema completo de reportes semanales
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Badge variant="default" className="mr-2">Sprint 4 | PB-12</Badge>
                        <Badge variant="default">PB-13</Badge>
                        <div className="mt-4 text-sm text-blue-800">
                          <p>✓ Reservas Emitidas</p>
                          <p>✓ Reservas Concretadas</p>
                          <p>✓ KPIs y Métricas</p>
                          <p>✓ Exportación a PDF</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="border-2 border-purple-300 bg-purple-50 h-full">
                    <CardHeader>
                      <FileText className="h-10 w-10 text-purple-600 mb-3" />
                      <CardTitle className="text-xl text-purple-900">Dashboard Analítico</CardTitle>
                      <CardDescription className="text-purple-700">
                        Visualización avanzada de datos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Badge variant="outline">Futuro</Badge>
                      <div className="mt-4 text-sm text-purple-800">
                        <p>• Gráficos de ocupación</p>
                        <p>• Tendencias de ingresos</p>
                        <p>• Análisis predictivo</p>
                        <p>• Métricas en tiempo real</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Reglas de Negocio */}
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">
                  📋 Reglas de Negocio del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-purple-900">
                <div className="p-3 bg-white rounded-lg text-sm">
                  <strong>RN-C01:</strong> Tarifa Total = Precio × Días
                </div>
                <div className="p-3 bg-white rounded-lg text-sm">
                  <strong>RN-C02:</strong> Adelanto = 25% del Total
                </div>
                <div className="p-3 bg-white rounded-lg text-sm">
                  <strong>RN-P01:</strong> Check-in requiere pago completo
                </div>
                <div className="p-3 bg-white rounded-lg text-sm">
                  <strong>RN-P02:</strong> Adelanto confirma la reserva
                </div>
                <div className="p-3 bg-white rounded-lg text-sm">
                  <strong>RN-R03:</strong> Cancelaciones sin reintegro
                </div>
                <div className="p-3 bg-white rounded-lg text-sm">
                  <strong>RN-T01:</strong> Auto-cancelación a las 24hs
                </div>
              </CardContent>
            </Card>

            {/* Resumen de Implementación */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">
                  ✓ Funcionalidades Implementadas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                <div className="space-y-2">
                  <h4 className="font-semibold">Sprint 1: Core</h4>
                  <p>✓ Consulta de disponibilidad</p>
                  <p>✓ Catálogo de habitaciones</p>
                  <p>✓ Generación de número de reserva</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Sprint 2: Pagos</h4>
                  <p>✓ Registro de reservas</p>
                  <p>✓ Cálculo de adelanto 25%</p>
                  <p>✓ Registro de pagos</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Sprint 3: Comprobantes</h4>
                  <p>✓ Generación de recibos</p>
                  <p>✓ Gestión de pagos completa</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Sprint 4: Operaciones</h4>
                  <p>✓ Proceso de check-in</p>
                  <p>✓ Cancelación manual</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
