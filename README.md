# MediaVaultEnterprise – React + API + Database Project


## **Opis projektu**

**MediaVaultEnterprise** to profesjonalna aplikacja do katalogowania i przeglądania filmów.
Projekt został wykonany jako aplikacja **full-stack**, składająca się z:

* **Frontend:** React + React Router
* **Backend:** REST API
* **Database:** SQL (PostgreSQL / MySQL / SQLite)

Celem projektu jest stworzenie pełnego systemu, który umożliwia pobieranie, filtrowanie i wyświetlanie informacji o filmach.


## **Struktura projektu**

/frontend      → aplikacja React (UI)
/backend       → REST API
/database      → schema SQL + przykładowe dane
README.md      → opis projektu


## **Funkcjonalności**

### Lista filmów
Wyświetlanie wszystkich filmów pobieranych z API.

### Wyszukiwarka
Filtrowanie filmów po tytule.

### Filtrowanie po gatunku
Opcjonalne parametry zapytania (query params).

### Szczegóły filmu
Kliknięcie w kartę filmu otwiera stronę.

### CRUD (dla nauczyciela)
Backend umożliwia dodawanie, edycję i usuwanie filmów.


# **Podział pracy (3 osoby)**

### **1 Frontend Developer (Bohdan Harkovenko (BoGo) ) ** 

* przygotowanie UI
* routing
* komponenty listy filmów i szczegółów
* połączenie z API
* debuging
* testing

### **2 Backend Developer (Dominik Subiel) **

* budowa API
* logika zapytań
* walidacja
* obsługa błędów

### **3 Database Developer (Emilia Szefler) **

* projekt bazy
* tworzenie tabel
* wypełnianie przykładowymi danymi
* integracja z backendem

### **Szybkie uruchomienie projektu (Backend + Frontend jednocześnie)**

Projekt posiada tryb startowy, który automatycznie uruchamia:

* **Backend (FastAPI + SQLAlchemy + SQLite)** → `http://localhost:8000`
* **Frontend (React + Vite)** → `http://localhost:5173`

Wymagane:
✔ Python 3.10+
✔ Node.js 18+

### Zainstaluj zależności backendu

Przejdź do folderu backend:

```bash
cd backend
pip install -r requirements.txt
```

### Zainstaluj zależności frontendu

Wejdź do folderu frontend:

```bash
cd ../frontend
npm install
```

### Ustaw dane do logowania administratora

W folderze **frontend/** utwórz plik:

```
.env
```

W środku wpisz:

```
VITE_ADMIN_PASS=MegaAdmin01
```
*(Możesz zmienić hasło — frontend sam używa go w logowaniu do panelu Admin.)*

### Uruchom backend + frontend jednocześnie

Przejdź do folderu frontend i wpisz:

```bash
npm run start:all
```

Ta komenda uruchamia jednocześnie:

| Serwis            | Adres lokalny                                  |
| ----------------- | ---------------------------------------------- |
| Backend (FastAPI) | [http://localhost:8000](http://localhost:8000) |
| Frontend (React)  | [http://localhost:5173](http://localhost:5173) |

### Dostęp do panelu Admina

Po starcie przejdź na panel Admin

Hasło Admina:
MegaAdmin01


_________________________________________________________________________________
# Projekt był zrobiony uczniami "ZSE Technikum nr. 13" na praktykach w 2025/26 roku.
