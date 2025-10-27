'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReservations } from "@/contexts/ReservationContext";
import { getRoomTypeName, formatCurrency } from "@/lib/store";
import Link from "next/link";
import { ArrowLeft, Hotel, Users, Sparkles } from "lucide-react";
import { RoomType } from "@/types";

export default function CatalogPage() {
  const { rooms } = useReservations();

  const roomsByType = rooms.reduce((acc, room) => {
    if (!acc[room.type]) {
      acc[room.type] = [];
    }
    acc[room.type].push(room);
    return acc;
  }, {} as Record<string, typeof rooms>);

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'disponible').length;
  const avgPrice = rooms.reduce((sum, r) => sum + r.pricePerNight, 0) / rooms.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-8">
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
                  <Hotel className="h-6 w-6" />
                  PB-02: Catálogo de Habitaciones
                </CardTitle>
                <CardDescription className="mt-2">
                  Sprint 1 - Funcionalidades Core | 10 Story Points
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                ✓ Completado
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Descripción */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Descripción de la Funcionalidad</h3>
              <p className="text-purple-800 text-sm">
                Catálogo completo de habitaciones del Hotel Andino, agrupadas por tipo, con descripción
                detallada, precios, capacidad y amenities. Permite al cliente conocer todas las opciones disponibles.
              </p>
            </div>

            {/* Estadísticas Generales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Hotel className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-900">{totalRooms}</div>
                    <div className="text-sm text-blue-700">Habitaciones Totales</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-900">{availableRooms}</div>
                    <div className="text-sm text-green-700">Disponibles Ahora</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-900">{formatCurrency(avgPrice)}</div>
                    <div className="text-sm text-purple-700">Precio Promedio/Noche</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Habitaciones por Tipo */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Tipos de Habitaciones</h3>
              
              {Object.entries(roomsByType).map(([type, roomsOfType]) => {
                const avgPrice = roomsOfType.reduce((sum, r) => sum + r.pricePerNight, 0) / roomsOfType.length;
                const maxCapacity = Math.max(...roomsOfType.map(r => r.capacity));
                
                return (
                  <Card key={type} className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-2xl font-bold">{getRoomTypeName(type as RoomType)}</h4>
                          <p className="text-blue-100 text-sm mt-1">
                            {roomsOfType.length} habitación{roomsOfType.length !== 1 ? 'es' : ''} de este tipo
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">
                            {formatCurrency(avgPrice)}
                          </div>
                          <p className="text-blue-100 text-sm">por noche</p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="h-5 w-5 text-blue-600" />
                          <span>Capacidad: hasta {maxCapacity} personas</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Sparkles className="h-5 w-5 text-purple-600" />
                          <span>Amenities incluidos</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {roomsOfType.map((room) => (
                          <div key={room.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="font-semibold text-lg">Habitación {room.number}</div>
                                <div className="text-sm text-gray-600">{room.description}</div>
                              </div>
                              <Badge 
                                variant={room.status === 'disponible' ? 'default' : 'secondary'}
                                className={room.status === 'disponible' ? 'bg-green-500' : ''}
                              >
                                {room.status.toUpperCase()}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                              <div className="text-gray-600 text-sm">
                                <Users className="inline h-4 w-4 mr-1" />
                                Capacidad: {room.capacity} personas
                              </div>
                              <div className="text-xl font-bold text-blue-600">
                                {formatCurrency(room.pricePerNight)}<span className="text-sm font-normal text-gray-500">/noche</span>
                              </div>
                            </div>

                            <div className="border-t pt-3">
                              <div className="text-sm font-semibold text-gray-700 mb-2">Amenities:</div>
                              <div className="flex flex-wrap gap-2">
                                {room.amenities.map((amenity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Criterios de Aceptación */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-sm text-green-900">
                  ✓ Criterios de Aceptación Cumplidos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-800 space-y-1">
                <p>✓ Muestra todas las habitaciones del hotel organizadas por tipo</p>
                <p>✓ Incluye descripción detallada de cada habitación</p>
                <p>✓ Presenta precio por noche de forma clara</p>
                <p>✓ Lista capacidad máxima de cada habitación</p>
                <p>✓ Muestra amenities y servicios incluidos</p>
                <p>✓ Indica disponibilidad en tiempo real</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
