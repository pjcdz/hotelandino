'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useReservations } from "@/contexts/ReservationContext";
import { isRoomAvailable, getRoomTypeName, formatCurrency, getStatusColor } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, Calendar, Search } from "lucide-react";
import { useState } from "react";

export default function AvailabilityPage() {
  const { rooms, reservations } = useReservations();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [searchResults, setSearchResults] = useState<typeof rooms>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('Por favor ingrese ambas fechas');
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      alert('La fecha de salida debe ser posterior a la de entrada');
      return;
    }

    const available = rooms.filter(room =>
      isRoomAvailable(room, checkInDate, checkOutDate, reservations)
    );

    setSearchResults(available);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
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
                  <Calendar className="h-6 w-6" />
                  PB-01: Consulta de Disponibilidad
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 1 - Funcionalidad Core | 10 Story Points
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
                Permite al empleado del hotel verificar la disponibilidad de habitaciones
                para un rango de fechas específico. El sistema muestra todas las habitaciones
                disponibles con sus características y precios.
              </p>
            </div>

            {/* Formulario de Búsqueda */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Consultar Disponibilidad</CardTitle>
                <CardDescription>
                  Ingrese las fechas para verificar habitaciones disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Fecha de Check-in</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Fecha de Check-out</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleSearch} className="w-full">
                      <Search className="mr-2 h-4 w-4" />
                      Buscar Disponibilidad
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resultados */}
            {searched && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Resultados de la Búsqueda
                    <Badge variant="outline" className="ml-3">
                      {searchResults.length} habitaciones disponibles
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {searchResults.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Habitación</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Capacidad</TableHead>
                          <TableHead>Precio/Noche</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Amenidades</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {searchResults.map((room) => (
                          <TableRow key={room.id}>
                            <TableCell className="font-medium">{room.number}</TableCell>
                            <TableCell>{getRoomTypeName(room.type)}</TableCell>
                            <TableCell>{room.capacity} personas</TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(room.pricePerNight)}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(room.status)}>
                                {room.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {room.amenities.slice(0, 3).join(', ')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-lg font-semibold mb-2">
                        No hay habitaciones disponibles para las fechas seleccionadas
                      </p>
                      <p className="text-sm">
                        Intente con otras fechas o contacte a recepción para más opciones
                      </p>
                    </div>
                  )}
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
                <p>✓ El sistema muestra la disponibilidad para un rango de fechas específico</p>
                <p>✓ Se visualiza el precio base de cada tipo de habitación disponible</p>
                <p>✓ Tiempo de respuesta menor a 3 segundos</p>
                <p>✓ Filtrado automático de habitaciones no disponibles</p>
                <p>✓ Visualización clara de características y amenidades</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
