import Link from "next/link";
import {
  Wand2,
  Upload,
  Palette,
  Sparkles,
  Clock,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import { DESIGN_STYLES } from "@/lib/styles";

const BEFORE_AFTER = [
  {
    label: "Sala Moderna",
    before: "/examples/sala-antes.jpg",
    after: "/examples/sala-depois.jpg",
  },
  {
    label: "Quarto Escandinavo",
    before: "/examples/quarto-antes.jpg",
    after: "/examples/quarto-depois.jpg",
  },
  {
    label: "Cozinha Industrial",
    before: "/examples/cozinha-antes.jpg",
    after: "/examples/cozinha-depois.jpg",
  },
];

const STEPS = [
  {
    icon: Upload,
    title: "Envie a foto",
    description: "Tire uma foto do comodo que quer transformar e faca o upload",
  },
  {
    icon: Palette,
    title: "Escolha o estilo",
    description:
      "Selecione entre 10 estilos profissionais: moderno, industrial, boho e mais",
  },
  {
    icon: Sparkles,
    title: "Receba o render",
    description:
      "Em 30 segundos, 3 modelos de IA geram variacoes do seu ambiente transformado",
  },
];

const FEATURES = [
  {
    icon: Clock,
    title: "30 segundos",
    description: "Resultado instantaneo sem esperar dias por um projeto",
  },
  {
    icon: Zap,
    title: "3 modelos de IA",
    description: "Compara resultados de diferentes IAs para escolher o melhor",
  },
  {
    icon: Shield,
    title: "Sem compromisso",
    description: "Teste quantas vezes quiser antes de contratar qualquer servico",
  },
];

const TESTIMONIALS = [
  {
    name: "Mariana S.",
    role: "Arquiteta",
    text: "Uso pra mostrar opcoes pros clientes antes de comecar o projeto. Economiza horas de trabalho.",
    stars: 5,
  },
  {
    name: "Rafael T.",
    role: "Proprietario",
    text: "Queria renovar minha sala mas nao sabia que estilo combina. Testei 5 estilos em 3 minutos.",
    stars: 5,
  },
  {
    name: "Camila L.",
    role: "Designer de Interiores",
    text: "Ferramenta incrivel pra validar ideias rapidamente. Meus clientes adoram ver o antes e depois.",
    stars: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">DecorAI</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#como-funciona" className="hover:text-foreground transition-colors">
              Como funciona
            </a>
            <a href="#estilos" className="hover:text-foreground transition-colors">
              Estilos
            </a>
            <a href="#depoimentos" className="hover:text-foreground transition-colors">
              Depoimentos
            </a>
          </nav>
          <Link
            href="/criar"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Comecar gratis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 sm:pt-28 sm:pb-24 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" />
                Powered by 3 modelos de Inteligencia Artificial
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Veja como seu ambiente ficaria{" "}
                <span className="text-primary">antes de gastar um centavo</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Faca upload de uma foto do seu comodo e a IA transforma em
                qualquer estilo de decoracao em 30 segundos. Sem compromisso, sem
                custo de projeto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/criar"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="h-5 w-5" />
                  Transformar meu ambiente
                </Link>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-4 text-lg font-semibold hover:bg-accent transition-colors"
                >
                  Ver como funciona
                </a>
              </div>
              <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  100% gratuito
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Sem cadastro
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Resultado em 30s
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof bar */}
        <section className="border-y border-border bg-card/50">
          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Ambientes transformados</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold">10</p>
              <p className="text-sm text-muted-foreground">Estilos profissionais</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold">30s</p>
              <p className="text-sm text-muted-foreground">Tempo medio de render</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Modelos de IA</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Como funciona
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Tres passos simples para visualizar a transformacao do seu ambiente
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
              {STEPS.map((step, i) => (
                <div key={i} className="relative text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 sm:right-auto sm:-left-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-28 border-y border-border bg-card/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Por que usar o DecorAI?
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                A forma mais rapida e economica de visualizar a decoracao dos seus sonhos
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 space-y-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Styles gallery */}
        <section id="estilos" className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                10 estilos profissionais
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                De minimalista a luxo, escolha o estilo que combina com voce
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {DESIGN_STYLES.map((style) => (
                <Link
                  key={style.id}
                  href="/criar"
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                    <p className="text-sm font-semibold text-white">
                      {style.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="depoimentos"
          className="py-20 sm:py-28 border-y border-border bg-card/30"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                O que estao dizendo
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Profissionais e proprietarios ja usam o DecorAI
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 space-y-4"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison section */}
        <section className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                DecorAI vs. metodo tradicional
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div />
                <div className="text-center font-semibold text-primary pb-2">
                  DecorAI
                </div>
                <div className="text-center font-semibold text-muted-foreground pb-2">
                  Tradicional
                </div>

                <div className="py-3 border-t border-border text-muted-foreground">
                  Tempo
                </div>
                <div className="py-3 border-t border-border text-center font-medium">
                  30 segundos
                </div>
                <div className="py-3 border-t border-border text-center text-muted-foreground">
                  2-5 dias
                </div>

                <div className="py-3 border-t border-border text-muted-foreground">
                  Custo
                </div>
                <div className="py-3 border-t border-border text-center font-medium">
                  Gratis
                </div>
                <div className="py-3 border-t border-border text-center text-muted-foreground">
                  R$ 500-2.000
                </div>

                <div className="py-3 border-t border-border text-muted-foreground">
                  Variacoes
                </div>
                <div className="py-3 border-t border-border text-center font-medium">
                  Ilimitadas
                </div>
                <div className="py-3 border-t border-border text-center text-muted-foreground">
                  2-3 opcoes
                </div>

                <div className="py-3 border-t border-border text-muted-foreground">
                  Estilos
                </div>
                <div className="py-3 border-t border-border text-center font-medium">
                  10 estilos
                </div>
                <div className="py-3 border-t border-border text-center text-muted-foreground">
                  1 por projeto
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 sm:py-28 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Pronto para transformar seu ambiente?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Em 30 segundos voce ve como ficaria. Sem cadastro, sem custo, sem
              compromisso.
            </p>
            <Link
              href="/criar"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-10 py-5 text-xl font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="h-6 w-6" />
              Comecar agora - e gratis
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            <span>DecorAI</span>
          </div>
          <p>Transforme ambientes com Inteligencia Artificial</p>
        </div>
      </footer>
    </div>
  );
}
