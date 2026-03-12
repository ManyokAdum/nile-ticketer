import { Link } from 'react-router-dom';
import { Bus, ArrowRight, Shield, Clock, QrCode, Zap, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const features = [
  { icon: QrCode, title: 'QR Boarding', desc: 'Scan & board in seconds with digital tickets' },
  { icon: Clock, title: 'Smart Late-Arrival', desc: 'Automatic seat release & reassignment system' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Role-based access with encrypted transactions' },
  { icon: Zap, title: 'Real-time Updates', desc: 'Live seat availability and trip status' },
];

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground">
        <div className="container py-20 md:py-32 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm">
              <Bus className="h-4 w-4" /> Digital Ticketing System
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold max-w-3xl mx-auto leading-tight">
              Book. Board. <span className="text-gradient">Travel Smart.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mx-auto">
              Modern intercity bus ticketing with QR boarding, real-time seat management, and smart late-arrival handling.
            </p>
          </motion.div>
          {/* CTA is handled via the navbar login button; hero remains informational */}
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold">Why Nile Ticketer?</h2>
          <p className="text-muted-foreground mt-2">Smart features for modern intercity travel</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-elevated rounded-xl p-6 text-center hover:shadow-[var(--shadow-glow)] transition-all"
            >
              <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/50 py-16">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: MapPin, value: '9+', label: 'Routes' },
            { icon: Bus, value: '12', label: 'Active Buses' },
            { icon: Users, value: '1.8K+', label: 'Happy Passengers' },
            { icon: Shield, value: '99.9%', label: 'Uptime' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-heading text-3xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
