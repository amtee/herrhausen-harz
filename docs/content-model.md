# Content-Modell für Herrhausen am Harz

Vorschlag aus dem Preview-Inventar, noch nicht freigegeben. Alles, was Redakteure ändern, bleibt Markdown unter `site/src/content/`.

## Collections

| Collection | Zweck | Herkunft aus dem Inventar |
| :-- | :-- | :-- |
| `pages` | Feste Seiten und Navigation | Startseite, Unser Dorf, Lage, Weblinks, Impressum, Datenschutz |
| `news` | Mitteilungen und Berichte, neueste zuerst | Veranstaltungsberichte und DRK-/Chor-Meldungen |
| `events` | Kommende und vergangene Termine | Kalender und Terminvorschau |
| `documents` | Protokolle und veröffentlichte Dateien | Ortsratsprotokolle und später bestätigte PDFs |
| `organisations` | Ortsvereine und Einrichtungen mit wiederholtem Aufbau | DRK, Chöre, Feuerwehr und Sportvereine |

## Seitenstruktur

- `/` – Startseite mit aktuellem Termin, kurzer Begrüßung, Mitteilungen und Ortsbild.
- `/unser-dorf/` – Geschichte, Ortsrat, Spielplätze, Vereine und Dorfleben.
- `/veranstaltungen/` – Termine und Berichte, aus `events` und `news` abgeleitet.
- `/lage/` – Lage und Anreise.
- `/weblinks/` – externe Links als redaktionelle Seite.
- `/impressum/` und `/datenschutz/` – rechtliche Seiten, erst nach Bestätigung.

## Schema-Entwurf

- `pages`: `title`, `navLabel`, `path`, `summary`, `order`, `showInNav`, `draft`.
- `news`: `title`, `date`, `summary`, `author`, `image`, `imageAlt`, `draft`.
- `events`: `title`, `date`, `endDate`, `location`, `category`, `summary`, `contact`, `draft`.
- `documents`: `title`, `file`, `category`, `date`, `available`.
- `organisations`: `title`, `kind`, `summary`, `contact`, `website`, `order`, `draft`.

Alle Kategorien werden im späteren Schema als `z.enum` festgelegt. Die Felder `author`, `contact`, Bildrechte, Termine und Dokumente dürfen erst nach der Intake-Klärung mit echten Werten befüllt werden. Der Bereich `Intern` wird nicht als geschützter Mitgliederbereich modelliert; sein öffentlicher Zweck muss zunächst geklärt werden.