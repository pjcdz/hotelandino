'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateReservationNumber } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, Hash, RefreshCw, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ReservationNumberPage() {
  const [reservationNumber, setReservationNumber] = useState('');
  const [generatedNumbers, setGeneratedNumbers] = useState<string[]>([]);

  const handleGenerate = () => {
    const newNumber = generateReservationNumber();
    setReservationNumber(newNumber);
    setGeneratedNumbers(prev => [newNumber, ...prev].slice(0, 10));
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
                  <Hash className="h-6 w-6" />
                  PB-06: Generación Automática de Número de Reserva
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 1 - Funcionalidad Core | 5 Story Points
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
                Sistema que genera automáticamente números únicos de reserva siguiendo el formato
                <strong className="mx-1">HA-XXXXXXXX-XX</strong> donde HA significa Hotel Andino,
                seguido de un timestamp y un número aleatorio para garantizar unicidad.
              </p>
            </div>

            {/* Generador */}
            <Card className="border-2 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg">Generador de Números de Reserva</CardTitle>
                <CardDescription>
                  Haz clic en el botón para generar un nuevo número único
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      value={reservationNumber}
                      readOnly
                      placeholder="HA-XXXXXXXX-XX"
                      className="text-2xl font-mono font-bold text-center bg-white"
                    />
                  </div>
                  <Button onClick={handleGenerate} size="lg" className="px-8">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Generar
                  </Button>
                </div>

                {reservationNumber && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Número de reserva generado exitosamente. Este número es único y puede ser
                      usado para identificar la reserva del cliente.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Formato Explicado */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formato del Número de Reserva</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="font-mono font-bold text-blue-600 text-xl">HA</div>
                    <div>
                      <div className="font-semibold">Prefijo del Hotel</div>
                      <div className="text-sm text-gray-600">
                        Identifica al Hotel Andino (HA)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="font-mono font-bold text-purple-600 text-xl">XXXXXXXX</div>
                    <div>
                      <div className="font-semibold">Timestamp</div>
                      <div className="text-sm text-gray-600">
                        Últimos 8 dígitos del timestamp actual en milisegundos
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="font-mono font-bold text-orange-600 text-xl">XX</div>
                    <div>
                      <div className="font-semibold">Número Aleatorio</div>
                      <div className="text-sm text-gray-600">
                        2 dígitos aleatorios para mayor seguridad y unicidad
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historial de Números Generados */}
            {generatedNumbers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Historial de Números Generados
                    <Badge variant="outline" className="ml-3">
                      {generatedNumbers.length} generados
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Últimos 10 números generados en esta sesión
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {generatedNumbers.map((num, idx) => (
                      <div
                        key={num}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-8 justify-center">
                            {idx + 1}
                          </Badge>
                          <span className="font-mono font-bold text-lg">{num}</span>
                        </div>
                        <Badge variant="secondary">Único</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Criterios de Aceptación */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-sm text-green-900">
                  ✓ Criterios de Aceptación Cumplidos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-800 space-y-1">
                <p>✓ El sistema genera números únicos automáticamente</p>
                <p>✓ El formato sigue el estándar HA-XXXXXXXX-XX</p>
                <p>✓ Cada número generado es diferente al anterior</p>
                <p>✓ El proceso es instantáneo (menos de 1 segundo)</p>
                <p>✓ No requiere intervención manual del usuario</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
