# Eventify Back-End

This is the back-end API for **Eventify**, a modern event management platform built with Laravel. It provides RESTful endpoints for user authentication, event creation, registration, notifications, and role-based access control.

---

## Features

- **User Authentication** (Laravel Breeze API)
- **Event CRUD** (Create, Read, Update, Delete)
- **Event Registration/Unregistration**
- **Role & Permission Management** (Laratrust)
- **Email Notifications** for event actions
- **Pagination & Filtering**
- **API Token Authentication** (Laravel Sanctum)
- **Seeder & Factory Support** for test data

---

## Requirements

- PHP >= 8.1
- Composer
- MySQL or PostgreSQL
- Node.js & npm (for front-end integration)
- Laravel 10+

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/eventify-backend.git
   cd eventify-backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Copy environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env`**
   - Set your database credentials
   - Set mail credentials for notifications

5. **Generate application key**
   ```bash
   php artisan key:generate
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed roles, permissions, and demo data**
   ```bash
   php artisan db:seed
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

---

## API Endpoints

| Method | Endpoint                | Description                    |
|--------|------------------------ |-------------------------------|
| POST   | `/api/register`         | Register a new user           |
| POST   | `/api/login`            | Login and get API token       |
| GET    | `/api/events`           | List all events               |
| POST   | `/api/events`           | Create a new event            |
| GET    | `/api/events/{id}`      | Get event details             |
| PUT    | `/api/events/{id}`      | Update event                  |
| DELETE | `/api/events/{id}`      | Delete event                  |
| POST   | `/api/events/{id}/register` | Register for event        |
| POST   | `/api/events/{id}/unregister` | Unregister from event    |

---

## Testing

Run all tests:
```bash
php artisan test
```

---

## Folder Structure

- `app/Models` - Eloquent models (User, Event, Role, Permission)
- `app/Http/Controllers` - API controllers
- `database/migrations` - Table schemas
- `database/seeders` - Seeders for roles, permissions, demo data
- `routes/api.php` - API routes

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contact

For questions or support, open an issue or contact the maintainer.
