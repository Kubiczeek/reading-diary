# Reading Diary

Aplikace pro sledování přečtených knih.

## Spuštění aplikace

Nejjednodušší způsob spuštění aplikace je pomocí souboru `start.bat`:

```bash
# Stačí spustit soubor start.bat
start.bat
```

Tento dávkový soubor spustí aplikaci pomocí Node.js a počká na ukončení.

## Vývoj

Pro vývoj můžete použít následující příkazy:

```bash
# Instalace závislostí
npm install
# nebo
pnpm install

# Spuštění vývojového serveru
npm run dev

# Spuštění vývojového serveru a otevření v prohlížeči
npm run dev -- --open
```

## Sestavení pro produkci

Pro vytvoření produkční verze aplikace:

```bash
npm run build
```

Pro náhled produkční verze můžete použít `npm run preview`.
