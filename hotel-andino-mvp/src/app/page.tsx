'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sprintsData, getTotalPoints } from "@/lib/sprints-data";
import Link from "next/link";
import { CheckCircle2, Circle, AlertCircle, ArrowRight, Calendar, Target } from "lucide-react";

export default function Home() {
  const totals = getTotalPoints();
  const completionPercentage = Math.round((totals.completed / totals.total) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🏨 Hotel Andino</h1>
              <p className="text-gray-600 mt-1">Sistema de Reservas - MVP con SCRUM</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {completionPercentage}% Completado
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sprints</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sprintsData.length}</div>
              <p className="text-xs text-muted-foreground">40 minutos totales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Story Points</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.completed} / {totals.total}</div>
              <p className="text-xs text-muted-foreground">Velocity: ~18 puntos/sprint</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Features</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sprintsData.reduce((acc, s) => acc + s.features.filter(f => f.status === 'completed').length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Funcionalidades completadas</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Sistema Completo Integrado</CardTitle>
            <CardDescription className="text-blue-100">
              Accede al sistema funcional con todas las features desarrolladas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/sistema">
              <Button size="lg" variant="secondary" className="w-full">
                Ir al Sistema Completo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="sprint1">Sprint 1</TabsTrigger>
            <TabsTrigger value="sprint2">Sprint 2</TabsTrigger>
            <TabsTrigger value="sprint3">Sprint 3</TabsTrigger>
            <TabsTrigger value="sprint4">Sprint 4</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Progreso del Proyecto</CardTitle>
                <CardDescription>
                  Visualización del avance a través de los 4 sprints del simulacro SCRUM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sprintsData.map((sprint) => (
                    <div key={sprint.number} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            Sprint {sprint.number}: {sprint.name}
                            <Badge variant={sprint.status === 'completed' ? 'default' : 'secondary'}>
                              {sprint.status === 'completed' ? 'Completado' : 'En progreso'}
                            </Badge>
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{sprint.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {sprint.completedPoints}/{sprint.totalPoints}
                          </div>
                          <div className="text-xs text-gray-500">story points</div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${(sprint.completedPoints / sprint.totalPoints) * 100}%` }}
                        />
                      </div>

                      <div className="space-y-2">
                        {sprint.features.map((feature) => (
                          <div key={feature.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(feature.status)}
                              <span className="font-mono text-xs text-gray-500">{feature.id}</span>
                              <span>{feature.name}</span>
                            </div>
                            <Badge variant="outline">{feature.points} pts</Badge>
                          </div>
                        ))}
                      </div>

                      <Link href={`/sprint${sprint.number}`}>
                        <Button className="w-full mt-4" variant="outline">
                          Ver Sprint {sprint.number} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {sprintsData.map((sprint) => (
            <TabsContent key={sprint.number} value={`sprint${sprint.number}`}>
              <Card>
                <CardHeader>
                  <CardTitle>Sprint {sprint.number}: {sprint.name}</CardTitle>
                  <CardDescription>
                    Duración: {sprint.duration} | Completado: {sprint.completedPoints}/{sprint.totalPoints} puntos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sprint.features.map((feature) => (
                      <Card key={feature.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(feature.status)}
                              <div>
                                <CardTitle className="text-base">
                                  {feature.id}: {feature.name}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {feature.description}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge>{feature.points} pts</Badge>
                          </div>
                        </CardHeader>
                        {feature.component && feature.status !== 'pending' && (
                          <CardContent>
                            <Link href={feature.component}>
                              <Button variant="default" size="sm">
                                Ver Funcionalidad <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="mt-16 border-t bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Hotel Andino - MVP desarrollado con Next.js, React, TypeScript, Tailwind CSS y shadcn/ui</p>
          <p className="text-sm mt-2">Sistemas de Información II - Clase 11 - Prototipado + SCRUM</p>
        </div>
      </footer>
    </div>
  );
}
