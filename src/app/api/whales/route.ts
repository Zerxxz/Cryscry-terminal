@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-background text-foreground min-h-screen bg-blur-gradient;
}

.panel {
  @apply rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow;
}
