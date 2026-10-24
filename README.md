# Herrhausen am Harz

Die Website von Herrhausen am Harz ist eine statische Seite. Texte, Meldungen und Termine liegen als einfache Markdown-Dateien im Projekt und werden nach jeder Änderung automatisch veröffentlicht.

| Schritt | Stand |
| :-- | :-- |
| 1 Harvest und Inhaltsmodell | erledigt (24. Oktober 2026, Preview-Tiefe) |
| 2 Aufbau der Website | abgeschlossen, alle Inventarbereiche als Preview angelegt |
| 3 Veröffentlichung | Deploy-Pipeline vorbereitet; Server, DNS und Repository offen |

## Ordner

| Ordner / Datei | Inhalt |
| :-- | :-- |
| `intake.md` | Die sechs Intake-Antworten und offene Fragen |
| `docs/` | Inventar, Platzhalter, Bildarchiv und Content-Modell |
| `harvest/` | Rohes HTML und ausgewählte Medien der alten Website |
| `site/src/content/` | Seiten, Meldungen und Termine als Markdown |
| `site/public/images/` | Bilder für die Website |

## Für die Redaktion

1. Ein kostenloses Konto unter [github.com/signup](https://github.com/signup) anlegen und die Einladung zum Projekt annehmen.
2. Unter `site/src/content/` die passende Datei öffnen, das Stift-Symbol wählen, die Vorschau prüfen und mit **Commit changes** speichern.

Eine fehlerhafte Änderung veröffentlicht nichts; wenn der Build scheitert, bleibt die bisherige Website online. Dateinamen sind klein geschrieben, nutzen Bindestriche und keine Umlaute. Bei Fotos bitte nur Bilder verwenden, deren Rechte und Einwilligungen geklärt sind; der Alt-Text beschreibt, was auf dem Bild zu sehen ist.

### Vorlagen

```markdown
---
title: Neuer Termin
date: 2026-12-01
location: Treffpunkt im Dorf
summary: Kurze Beschreibung des Termins.
draft: false
---

Weitere Informationen zum Termin.
```

Für eine feste Seite die Angaben `path`, `order` und `showInNav` aus einer bestehenden Datei übernehmen. `showInNav: true` zeigt sie in der Hauptnavigation.

## Für die technische Betreuung

Die Astro-Anwendung liegt unter `site/`. Navigation, Startseite und Kalender fragen Inhalte über `site/src/lib/content.ts` ab. Die CMS-Konfiguration liegt unter `site/public/admin/config.yml`, Weiterleitungen unter `site/public/.htaccess`.

```sh
cd site
npm install
npm run check
npm run build
```

Für die technische Veröffentlichung wird `clients/herrhausen-harz` als GitHub-Repository benötigt. Nach Einrichtung des Webservers veröffentlicht jeder Push auf `main` den erfolgreichen Build über [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Die nötigen SSH-Zugangsdaten und der Zielpfad werden erst nach Bestätigung des Hostingziels eingerichtet.

Vor dem Livegang müssen die offenen Punkte in [`intake.md`](intake.md) und [`docs/platzhalter.md`](docs/platzhalter.md) geklärt werden. Die Rohdaten bleiben unter [`harvest/`](harvest/) unangetastet.