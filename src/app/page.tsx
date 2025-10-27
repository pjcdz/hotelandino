'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sprintsData, getTotalPoints } from "@/lib/sprints-data";
import Link from "next/link";
import { CheckCircle2, Circle, AlertCircle, ArrowRight, Calendar, Target, Mountain, Code, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Header Profesional */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mountain className="w-8 h-8 text-primary" />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Hotel Andino</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Sistema de Reservas - MVP con SCRUM</p>
              </div>
            </div>
            <Badge className="text-sm md:text-base px-3 md:px-4 py-1 md:py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {completionPercentage}% Completado
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sprints</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sprintsData.length}</div>
              <p className="text-xs text-muted-foreground mt-1">40 minutos totales</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Story Points</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totals.completed} / {totals.total}</div>
              <p className="text-xs text-muted-foreground mt-1">Velocity: ~18 puntos/sprint</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Features</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {sprintsData.reduce((acc, s) => acc + s.features.filter(f => f.status === 'completed').length, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Funcionalidades completadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
          <Card className="overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative h-32 md:h-40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')] bg-cover bg-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <CardHeader className="pb-3 pt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl md:text-2xl">Sistema Completo Integrado</CardTitle>
              </div>
              <CardDescription className="text-sm md:text-base">
                Accede al sistema funcional con todas las features desarrolladas
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <Link href="/sistema">
                <Button size="lg" className="w-full group-hover:scale-[1.02] transition-transform">
                  Ir al Sistema Completo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative h-32 md:h-40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80')] bg-cover bg-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <CardHeader className="pb-3 pt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Mountain className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl md:text-2xl">Demo del Hotel</CardTitle>
              </div>
              <CardDescription className="text-sm md:text-base">
                Experimenta el sitio web del Hotel Andino como cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <Link href="/demo">
                <Button size="lg" className="w-full group-hover:scale-[1.02] transition-transform">
                  Ver Demo del Hotel <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Vista General</TabsTrigger>
            <TabsTrigger value="sprint1" className="text-xs sm:text-sm">Sprint 1</TabsTrigger>
            <TabsTrigger value="sprint2" className="text-xs sm:text-sm">Sprint 2</TabsTrigger>
            <TabsTrigger value="sprint3" className="text-xs sm:text-sm">Sprint 3</TabsTrigger>
            <TabsTrigger value="sprint4" className="text-xs sm:text-sm">Sprint 4</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Progreso del Proyecto</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Visualización del avance a través de los 4 sprints del simulacro SCRUM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 md:space-y-6">
                  {sprintsData.map((sprint) => (
                    <div key={sprint.number} className="border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base md:text-lg flex flex-wrap items-center gap-2">
                            Sprint {sprint.number}: {sprint.name}
                            <Badge variant={sprint.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                              {sprint.status === 'completed' ? 'Completado' : 'En progreso'}
                            </Badge>
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground mt-1">{sprint.duration}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-2xl md:text-3xl font-bold text-primary">
                            {sprint.completedPoints}/{sprint.totalPoints}
                          </div>
                          <div className="text-xs text-muted-foreground">story points</div>
                        </div>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                        <div
                          className="bg-primary h-2.5 rounded-full transition-all"
                          style={{ width: `${(sprint.completedPoints / sprint.totalPoints) * 100}%` }}
                        />
                      </div>

                      <div className="space-y-2">
                        {sprint.features.map((feature) => (
                          <div key={feature.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-2 flex-1">
                              {getStatusIcon(feature.status)}
                              <span className="font-mono text-xs text-muted-foreground">{feature.id}</span>
                              <span className="text-xs md:text-sm">{feature.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs self-start sm:self-auto">{feature.points} pts</Badge>
                          </div>
                        ))}
                      </div>

                      <Link href={`/sprint${sprint.number}`}>
                        <Button className="w-full mt-4" variant="outline" size="lg">
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
                  <CardTitle className="text-xl md:text-2xl">Sprint {sprint.number}: {sprint.name}</CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Duración: {sprint.duration} | Completado: {sprint.completedPoints}/{sprint.totalPoints} puntos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sprint.features.map((feature) => (
                      <Card key={feature.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="mt-1">
                                {getStatusIcon(feature.status)}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-sm md:text-base mb-1">
                                  {feature.id}: {feature.name}
                                </CardTitle>
                                <CardDescription className="text-xs md:text-sm">
                                  {feature.description}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge className="self-start sm:self-auto">{feature.points} pts</Badge>
                          </div>
                        </CardHeader>
                        {feature.component && feature.status !== 'pending' && (
                          <CardContent className="pt-0">
                            <Link href={feature.component}>
                              <Button variant="default" size="sm" className="w-full sm:w-auto">
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

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8 md:py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
            {/* Logo y descripción */}
            <div>
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Mountain className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Hotel Andino</h3>
                  <p className="text-sm text-muted-foreground">Mendoza, Argentina</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                MVP desarrollado con Next.js, React, TypeScript, Tailwind CSS y shadcn/ui
              </p>
              <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                <Badge variant="outline">Next.js 15</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
            </div>

            {/* Info del proyecto */}
            <div className="flex flex-col items-center md:items-end justify-center">
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Sistemas de Información II</h4>
                <p className="text-sm text-muted-foreground">Clase 11 - Prototipado + SCRUM</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center md:justify-end">
                <Badge className="text-xs">
                  <Code className="w-3 h-3 mr-1" />
                  MVP
                </Badge>
                <Badge className="text-xs">
                  <Target className="w-3 h-3 mr-1" />
                  SCRUM
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
