'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateAdvancePayment, formatCurrency } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, Calculator, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function PaymentCalculationPage() {
  const [pricePerNight, setPricePerNight] = useState('');
  const [nights, setNights] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);

  const handleCalculate = () => {
    const price = parseFloat(pricePerNight);
    const nightsNum = parseInt(nights);

    if (isNaN(price) || isNaN(nightsNum) || price <= 0 || nightsNum <= 0) {
      alert('Por favor ingrese valores válidos');
      return;
    }

    const total = price * nightsNum;
    const advance = calculateAdvancePayment(total);

    setTotalPrice(total);
    setAdvancePayment(advance);
  };

  const percentage = totalPrice > 0 ? (advancePayment / totalPrice) * 100 : 0;

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
                  <Calculator className="h-6 w-6" />
                  PB-04: Cálculo Automático del Adelanto (25%)
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 2 - Gestión de Pagos | 5 Story Points
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
                Sistema que calcula automáticamente el adelanto del 25% de la tarifa total según
                la <strong>Regla de Negocio RN-C02</strong>. Este adelanto es obligatorio para
                confirmar cualquier reserva en el Hotel Andino.
              </p>
            </div>

            {/* Regla de Negocio */}
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">
                  📋 Reglas de Negocio Aplicadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-purple-900">
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-C01:</strong> Tarifa Total = Precio Habitación × Días de Estadía
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-C02:</strong> Adelanto = Tarifa Total × 0.25 (25%)
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <strong>RN-V01:</strong> El adelanto debe ser exactamente el 25% de la tarifa total
                </div>
              </CardContent>
            </Card>

            {/* Calculadora */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Calculadora de Adelanto</CardTitle>
                <CardDescription>
                  Ingrese los datos para calcular el adelanto automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio por Noche (ARS)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(e.target.value)}
                      placeholder="Ej: 25000"
                      min="0"
                      step="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nights">Cantidad de Noches</Label>
                    <Input
                      id="nights"
                      type="number"
                      value={nights}
                      onChange={(e) => setNights(e.target.value)}
                      placeholder="Ej: 3"
                      min="1"
                    />
                  </div>
                </div>

                <Button onClick={handleCalculate} size="lg" className="w-full">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calcular Adelanto
                </Button>

                {totalPrice > 0 && (
                  <div className="space-y-4 pt-4">
                    {/* Fórmula Visual */}
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-gray-600">Precio por Noche × Noches</div>
                        <div className="text-2xl font-mono font-bold text-blue-600">
                          {formatCurrency(parseFloat(pricePerNight))} × {nights}
                        </div>
                        <div className="text-sm text-gray-600">↓</div>
                        <div className="text-sm font-semibold text-gray-700">Tarifa Total</div>
                        <div className="text-3xl font-bold text-purple-600">
                          {formatCurrency(totalPrice)}
                        </div>
                      </div>
                    </div>

                    {/* Resultado del Adelanto */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-300">
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <TrendingUp className="h-6 w-6 text-yellow-700" />
                          <span className="text-lg font-semibold text-yellow-900">
                            Adelanto Requerido (25%)
                          </span>
                        </div>
                        <div className="text-5xl font-bold text-yellow-700">
                          {formatCurrency(advancePayment)}
                        </div>
                        <div className="pt-3 border-t border-yellow-300">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-yellow-700 font-semibold">Tarifa Total</div>
                              <div className="text-xl font-bold text-yellow-900">
                                {formatCurrency(totalPrice)}
                              </div>
                            </div>
                            <div>
                              <div className="text-yellow-700 font-semibold">Porcentaje</div>
                              <div className="text-xl font-bold text-yellow-900">
                                {percentage.toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Saldo Restante */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-900 font-semibold">Saldo a pagar en el check-in:</span>
                        <span className="text-2xl font-bold text-blue-700">
                          {formatCurrency(totalPrice - advancePayment)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ejemplos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ejemplos de Cálculo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { price: 15000, nights: 2, type: 'Habitación Simple' },
                    { price: 25000, nights: 3, type: 'Habitación Doble' },
                    { price: 45000, nights: 5, type: 'Suite' },
                  ].map((example, idx) => {
                    const total = example.price * example.nights;
                    const advance = calculateAdvancePayment(total);
                    return (
                      <div key={idx} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{example.type}</span>
                          <Badge variant="outline">{example.nights} noches</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <div className="text-gray-600">Precio/noche</div>
                            <div className="font-semibold">{formatCurrency(example.price)}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Total</div>
                            <div className="font-semibold">{formatCurrency(total)}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Adelanto 25%</div>
                            <div className="font-semibold text-yellow-700">{formatCurrency(advance)}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                <p>✓ El sistema calcula automáticamente el 25% del total</p>
                <p>✓ El cálculo se realiza en tiempo real</p>
                <p>✓ Se muestra claramente el desglose de precios</p>
                <p>✓ Se visualiza el saldo restante a pagar</p>
                <p>✓ La fórmula es transparente y verificable</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
