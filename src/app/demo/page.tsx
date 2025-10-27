'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReservations } from "@/contexts/ReservationContext";
import { formatCurrency, formatDate, calculateNumberOfNights, isRoomAvailable, calculateTotalPrice, calculateAdvancePayment, generateReservationNumber, getRoomTypeName } from "@/lib/store";
import { Calendar, Star, MapPin, Phone, Mail, CheckCircle2, Wifi, Coffee, Car, Snowflake, Mountain, Hotel, Users, UtensilsCrossed, Wind, ArrowRight, Clock, Info, Bed, BedDouble, Home, Crown } from "lucide-react";
import { useState } from "react";
import { Room, Guest, Reservation } from "@/types";

export default function DemoPage() {
  const { rooms, reservations, addReservation, addPayment } = useReservations();
  const [activeSection, setActiveSection] = useState('home');
  
  // Estado del formulario de reserva
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  
  // Estado del formulario de datos personales
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  
  // Estado de confirmación
  const [reservationCreated, setReservationCreated] = useState<Reservation | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const availableRooms = selectedRoomType && checkIn && checkOut
    ? rooms.filter((room: Room) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        return room.type === selectedRoomType && 
               isRoomAvailable(room, checkInDate, checkOutDate, reservations);
      })
    : [];

  const calculateReservationCost = () => {
    if (!selectedRoomType || !checkIn || !checkOut) return null;
    
    const room = rooms.find((r: Room) => r.type === selectedRoomType);
    if (!room) return null;
    
    const nights = calculateNumberOfNights(new Date(checkIn), new Date(checkOut));
    const total = calculateTotalPrice(room.pricePerNight, nights);
    const advance = calculateAdvancePayment(total);
    
    return { total, advance, nights, pricePerNight: room.pricePerNight };
  };

  const handleCreateReservation = () => {
    if (!firstName || !lastName || !email || !phone || !document) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (availableRooms.length === 0) {
      alert('No hay habitaciones disponibles para las fechas seleccionadas');
      return;
    }

    const selectedRoom = availableRooms[0];
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = calculateNumberOfNights(checkInDate, checkOutDate);
    const total = calculateTotalPrice(selectedRoom.pricePerNight, nights);
    const advance = calculateAdvancePayment(total);

    const guest: Guest = {
      id: `GUEST-${Date.now()}`,
      firstName,
      lastName,
      email,
      phone,
      document,
      documentType: 'DNI'
    };

    const newReservation: Reservation = {
      id: `RES-${Date.now()}`,
      reservationNumber: generateReservationNumber(),
      roomId: selectedRoom.id,
      guests: [guest],
      checkInDate,
      checkOutDate,
      numberOfNights: nights,
      totalPrice: total,
      advancePayment: advance,
      status: 'pendiente',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addReservation(newReservation);
    setReservationCreated(newReservation);
    setShowSuccess(true);
    setActiveSection('confirmation');
  };

  const handlePayAdvance = () => {
    if (!reservationCreated) return;
    
    addPayment({
      id: `PAY-${Date.now()}`,
      reservationId: reservationCreated.id,
      amount: reservationCreated.advancePayment,
      currency: 'ARS',
      paymentDate: new Date(),
      status: 'pagado'
    });

    alert('¡Pago del adelanto registrado exitosamente!');
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    if (section === 'booking') {
      setSelectedRoomType('');
      setCheckIn('');
      setCheckOut('');
      setGuests('1');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setDocument('');
      setShowSuccess(false);
    }
  };

  const roomsData = [
    {
      type: 'simple',
      name: 'Habitación Simple',
      subtitle: 'Elegancia minimalista',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      icon: <Bed className="w-6 h-6" />,
      features: [
        { icon: <Bed className="w-4 h-4" />, text: '1 Cama individual' },
        { icon: <Wifi className="w-4 h-4" />, text: 'WiFi de alta velocidad' },
        { icon: <Mountain className="w-4 h-4" />, text: 'Vista a la montaña' },
        { icon: <Coffee className="w-4 h-4" />, text: 'Desayuno incluido' },
      ]
    },
    {
      type: 'doble',
      name: 'Habitación Doble',
      subtitle: 'Confort y privacidad',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
      icon: <BedDouble className="w-6 h-6" />,
      popular: true,
      features: [
        { icon: <BedDouble className="w-4 h-4" />, text: '1 Cama matrimonial' },
        { icon: <Mountain className="w-4 h-4" />, text: 'Balcón panorámico' },
        { icon: <Wifi className="w-4 h-4" />, text: 'WiFi + TV premium' },
        { icon: <Coffee className="w-4 h-4" />, text: 'Minibar premium' },
      ]
    },
    {
      type: 'suite',
      name: 'Suite Familiar',
      subtitle: 'Espacio y comodidad',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      icon: <Home className="w-6 h-6" />,
      features: [
        { icon: <Users className="w-4 h-4" />, text: '2 Habitaciones separadas' },
        { icon: <Mountain className="w-4 h-4" />, text: 'Vista panorámica 180°' },
        { icon: <UtensilsCrossed className="w-4 h-4" />, text: 'Sala de estar privada' },
        { icon: <Snowflake className="w-4 h-4" />, text: 'Jacuzzi privado' },
      ]
    },
    {
      type: 'deluxe',
      name: 'Suite Deluxe',
      subtitle: 'Experiencia premium',
      price: 60000,
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      icon: <Crown className="w-6 h-6" />,
      premium: true,
      features: [
        { icon: <Crown className="w-4 h-4" />, text: 'King bed + sala premium' },
        { icon: <Mountain className="w-4 h-4" />, text: 'Terraza privada 360°' },
        { icon: <UtensilsCrossed className="w-4 h-4" />, text: 'Servicio 24/7' },
        { icon: <Snowflake className="w-4 h-4" />, text: 'Spa privado completo' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Profesional */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="flex items-center gap-2">
                <Mountain className="w-8 h-8 text-primary" />
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Hotel Andino</h1>
                  <p className="text-xs text-muted-foreground">Mendoza, Argentina</p>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: 'Inicio' },
                { id: 'rooms', label: 'Habitaciones' },
                { id: 'booking', label: 'Reservar' },
                { id: 'contact', label: 'Contacto' },
              ].map(item => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => scrollToSection(item.id)}
                  className="font-medium"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
            
            <Button onClick={() => scrollToSection('booking')} size="sm" className="w-full sm:w-auto">
              <Calendar className="w-4 h-4 mr-2" />
              Reservar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Imagen de fondo profesional */}
      {activeSection === 'home' && (
        <section className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Imagen de fondo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          {/* Contenido */}
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 md:mb-6 bg-primary/90 text-primary-foreground border-0 text-xs md:text-sm">
              <Star className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Experiencia de lujo en la montaña
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight px-4">
              Bienvenido al Hotel Andino
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto text-white/90 font-light px-4">
              Descubre un refugio de tranquilidad y elegancia en el corazón de los Andes mendocinos
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button 
                size="lg"
                onClick={() => scrollToSection('rooms')}
                className="text-base md:text-lg w-full sm:w-auto"
              >
                Explorar Habitaciones
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('booking')}
                className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground text-base md:text-lg backdrop-blur-sm w-full sm:w-auto"
              >
                Reservar Ahora
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
              {[
                { icon: <Mountain className="w-6 h-6 md:w-8 md:h-8" />, label: 'Vista Panorámica', desc: '360°' },
                { icon: <Star className="w-6 h-6 md:w-8 md:h-8" />, label: 'Calificación', desc: '5 Estrellas' },
                { icon: <Wifi className="w-6 h-6 md:w-8 md:h-8" />, label: 'WiFi', desc: 'Alta Velocidad' },
                { icon: <Coffee className="w-6 h-6 md:w-8 md:h-8" />, label: 'Desayuno', desc: 'Gourmet' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm mb-3 md:mb-4 border border-white/20">
                    {stat.icon}
                  </div>
                  <div className="text-xs md:text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-white/70">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección de Habitaciones */}
      {activeSection === 'rooms' && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <Badge className="mb-4">
                <Hotel className="w-4 h-4 mr-2" />
                Nuestras Habitaciones
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Alojamiento Excepcional
              </h2>
              <p className="text-base md:text-xl text-muted-foreground">
                Cada habitación combina diseño contemporáneo con vistas espectaculares de los Andes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {roomsData.map((room) => (
                <Card key={room.type} className="overflow-hidden group pb-6">
                  {/* Imagen de la habitación */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {room.popular && (
                        <Badge className="bg-primary">Más Popular</Badge>
                      )}
                      {room.premium && (
                        <Badge className="bg-accent">Premium</Badge>
                      )}
                    </div>

                    {/* Precio */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl sm:text-3xl font-bold">{formatCurrency(room.price)}</div>
                      <div className="text-xs sm:text-sm opacity-90">por noche</div>
                    </div>
                  </div>

                  <CardHeader className="pb-3 md:pb-4 pt-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                        {room.icon}
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-lg md:text-xl truncate">{room.name}</CardTitle>
                        <CardDescription className="text-sm">{room.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 md:space-y-6">
                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {room.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="text-primary">{feature.icon}</div>
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Botón */}
                    <Button 
                      onClick={() => {
                        setSelectedRoomType(room.type);
                        scrollToSection('booking');
                      }}
                      className="w-full"
                      size="lg"
                    >
                      Reservar Ahora
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección de Reservas */}
      {activeSection === 'booking' && !showSuccess && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <Badge className="mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  Reservación
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                  Reserva tu Estadía
                </h2>
                <p className="text-base md:text-xl text-muted-foreground">
                  Complete el formulario para asegurar su habitación
                </p>
              </div>

              <Card>
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <Tabs defaultValue="dates" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
                      <TabsTrigger value="dates" className="text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Fechas y Habitación
                      </TabsTrigger>
                      <TabsTrigger value="personal" className="text-xs sm:text-sm">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Datos Personales
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dates" className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label>Tipo de Habitación</Label>
                          <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una habitación" />
                            </SelectTrigger>
                            <SelectContent>
                              {roomsData.map(room => (
                                <SelectItem key={room.type} value={room.type}>
                                  {room.name} - {formatCurrency(room.price)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Número de Huéspedes</Label>
                          <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Fecha de Check-in</Label>
                          <Input 
                            type="date" 
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Fecha de Check-out</Label>
                          <Input 
                            type="date" 
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      {/* Resumen de costos */}
                      {calculateReservationCost() && (
                        <Card className="border-primary/20 bg-muted/30">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base md:text-lg flex items-center gap-2">
                              <Info className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                              Resumen de Costos
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3 md:space-y-4">
                            <div className="space-y-2 md:space-y-3">
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-muted-foreground">Noches:</span>
                                <span className="font-semibold text-base md:text-lg">{calculateReservationCost()!.nights}</span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-muted-foreground">Precio por noche:</span>
                                <span className="font-semibold text-base md:text-lg">{formatCurrency(calculateReservationCost()!.pricePerNight)}</span>
                              </div>
                              <div className="border-t border-border pt-3 mt-3">
                                <div className="flex justify-between items-center py-2 mb-3">
                                  <span className="font-semibold text-base">Total:</span>
                                  <span className="text-2xl md:text-3xl font-bold">{formatCurrency(calculateReservationCost()!.total)}</span>
                                </div>
                              </div>
                              <div className="bg-primary text-primary-foreground rounded-lg p-3 md:p-4 mt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                  <span className="font-semibold text-sm md:text-base">Adelanto requerido (25%):</span>
                                  <span className="text-xl md:text-2xl font-bold">{formatCurrency(calculateReservationCost()!.advance)}</span>
                                </div>
                              </div>
                            </div>
                            {availableRooms.length > 0 ? (
                              <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-lg mt-4">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="font-medium">{availableRooms.length} habitación(es) disponible(s)</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg mt-4">
                                <Info className="w-4 h-4" />
                                <span className="font-medium">No hay disponibilidad para estas fechas</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="personal" className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label>Nombre</Label>
                          <Input 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Juan"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Apellido</Label>
                          <Input 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Pérez"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="juan.perez@email.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Teléfono</Label>
                          <Input 
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+54 261 123-4567"
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label>Documento (DNI)</Label>
                          <Input 
                            value={document}
                            onChange={(e) => setDocument(e.target.value)}
                            placeholder="12345678"
                          />
                        </div>
                      </div>

                      <Button 
                        onClick={handleCreateReservation}
                        disabled={!firstName || !lastName || !email || !phone || !document || availableRooms.length === 0}
                        className="w-full"
                        size="lg"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Confirmar Reserva
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Confirmación */}
      {activeSection === 'confirmation' && showSuccess && reservationCreated && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-primary">
                <div className="bg-primary text-primary-foreground p-8 md:p-12 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Reserva Confirmada</h2>
                  <p className="text-base md:text-lg opacity-90">Su reserva ha sido creada exitosamente</p>
                </div>

                <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                  {/* Número de reserva */}
                  <div className="bg-muted p-4 md:p-6 rounded-lg text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Número de Reserva</p>
                    <p className="text-3xl md:text-4xl font-bold">{reservationCreated.reservationNumber}</p>
                  </div>

                  {/* Detalles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {[
                      { label: 'Huésped', value: `${reservationCreated.guests[0].firstName} ${reservationCreated.guests[0].lastName}`, icon: <Users className="w-5 h-5" /> },
                      { label: 'Habitación', value: getRoomTypeName(rooms.find(r => r.id === reservationCreated.roomId)?.type || 'simple'), icon: <Hotel className="w-5 h-5" /> },
                      { label: 'Check-in', value: formatDate(reservationCreated.checkInDate), icon: <Calendar className="w-5 h-5" /> },
                      { label: 'Check-out', value: formatDate(reservationCreated.checkOutDate), icon: <Calendar className="w-5 h-5" /> },
                      { label: 'Noches', value: `${reservationCreated.numberOfNights}`, icon: <Clock className="w-5 h-5" /> },
                      { label: 'Estado', value: 'Pendiente de Pago', icon: <Info className="w-5 h-5" /> },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <div className="text-primary">{item.icon}</div>
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="font-semibold">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Información de pago */}
                  <Card className="border-amber-500/50 bg-amber-500/5">
                    <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <h3 className="font-semibold text-base md:text-lg flex items-center gap-2">
                        <Info className="w-4 h-4 md:w-5 md:h-5 text-amber-600 flex-shrink-0" />
                        Información de Pago
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total de la estadía:</span>
                          <span className="font-bold text-sm md:text-base">{formatCurrency(reservationCreated.totalPrice)}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 md:p-4 bg-primary text-primary-foreground rounded-lg">
                          <span className="font-semibold text-sm md:text-base">Adelanto requerido (25%):</span>
                          <span className="text-xl md:text-2xl font-bold">{formatCurrency(reservationCreated.advancePayment)}</span>
                        </div>
                      </div>
                      <div className="bg-amber-100 dark:bg-amber-950 rounded-lg p-3 md:p-4 text-xs md:text-sm">
                        <p className="flex items-start gap-2">
                          <Info className="w-4 h-4 md:w-5 md:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Importante:</strong> Debe pagar el adelanto dentro de las próximas <strong>24 horas</strong> para confirmar su reserva.
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button 
                      onClick={handlePayAdvance}
                      className="flex-1"
                      size="lg"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Simular Pago del Adelanto
                    </Button>
                    <Button 
                      onClick={() => scrollToSection('home')}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Volver al Inicio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Contacto */}
      {activeSection === 'contact' && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <Badge className="mb-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Contacto
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                  Estamos Aquí para Ayudarte
                </h2>
                <p className="text-base md:text-xl text-muted-foreground">
                  Nuestro equipo está disponible 24/7 para asistirte
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Información de contacto */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    {[
                      {
                        icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
                        title: 'Dirección',
                        content: ['Av. Principal 1234', 'Mendoza, Argentina', 'CP: 5500']
                      },
                      {
                        icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
                        title: 'Teléfono',
                        content: ['+54 261 123-4567', 'Atención 24/7']
                      },
                      {
                        icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
                        title: 'Email',
                        content: ['info@hotelandino.com.ar', 'reservas@hotelandino.com.ar']
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 md:gap-4">
                        <div className="p-2 md:p-3 bg-primary/10 rounded-lg text-primary h-fit flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold mb-2 text-sm md:text-base">{item.title}</h3>
                          {item.content.map((line, i) => (
                            <p key={i} className="text-xs md:text-sm text-muted-foreground break-words">{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Servicios del hotel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Servicios Premium</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 md:space-y-3">
                    {[
                      { icon: <Wifi className="w-5 h-5" />, text: 'WiFi de alta velocidad' },
                      { icon: <Coffee className="w-5 h-5" />, text: 'Desayuno gourmet incluido' },
                      { icon: <Car className="w-5 h-5" />, text: 'Estacionamiento privado' },
                      { icon: <Snowflake className="w-5 h-5" />, text: 'Alquiler de equipos de ski' },
                      { icon: <Mountain className="w-5 h-5" />, text: 'Tours guiados a la montaña' },
                      { icon: <Wind className="w-5 h-5" />, text: 'Spa y centro wellness' }
                    ].map((service, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="text-primary">{service.icon}</div>
                        <span className="text-sm">{service.text}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <div className="mt-8 md:mt-12 text-center">
                <Button 
                  size="lg"
                  onClick={() => scrollToSection('booking')}
                  className="w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Hacer una Reserva
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logo */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Mountain className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Hotel Andino</h3>
                  <p className="text-sm text-muted-foreground">Mendoza, Argentina</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                40 años de excelencia hotelera en el corazón de los Andes. Experiencia única combinando lujo, naturaleza y hospitalidad de clase mundial.
              </p>
              <div className="flex gap-2 justify-center md:justify-start">
                <Badge variant="outline">5 Estrellas</Badge>
                <Badge variant="outline">Vista Premium</Badge>
              </div>
            </div>

            {/* Horarios */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4">Horarios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Recepción: 24 horas
                </li>
                <li>Check-in: 14:00 hs</li>
                <li>Check-out: 10:00 hs</li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-primary" />
                  +54 261 123-4567
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4 text-primary" />
                  info@hotelandino.com.ar
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-primary" />
                  Av. Principal 1234
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
