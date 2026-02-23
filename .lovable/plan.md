

# Curso "Herramientas de Libertad" -- Registro con Datos + Pago + Panel Admin

## Resumen

Crear una pagina del curso donde los usuarios llenen todos sus datos personales ANTES de ir a pagar. Una vez completado el pago, el registro queda guardado en la base de datos y los admins pueden ver todos los inscritos en una nueva pestana del panel de administracion.

---

## Flujo del Usuario

1. Usuario llega a `/curso` (desde banner en homepage o navegacion)
2. Ve la informacion del curso y hace clic en "Inscribirme"
3. Llena un formulario con sus datos: nombre, apellido, email, telefono, ciudad, estado
4. Al enviar, se guarda el registro en la base de datos con estado "pending" y se redirige a Stripe Checkout ($50)
5. Tras pagar exitosamente, regresa a una pagina de confirmacion y el registro se marca como "completed"
6. Los admins ven todos los inscritos en una nueva pestana "Cursos" del panel `/admin`

---

## Que se construye

### 1. Base de datos -- tabla `course_purchases`

Nueva tabla para almacenar los registros del curso:

- id, email, first_name, last_name, phone, city, state
- course_id (default: `habeas-corpus-2026`)
- amount (default: 50), currency, status (pending/completed)
- stripe_session_id, stripe_customer_id
- created_at, completed_at

Politicas RLS: solo admins pueden leer; las inserciones se hacen desde edge functions con service role key.

### 2. Pagina del curso (`/curso`)

Pagina con:
- Hero con titulo del curso, descripcion y precio ($50)
- Seccion de que aprenderas / beneficios
- Formulario de registro (nombre, apellido, email, telefono, ciudad, estado)
- Al enviar el formulario se crea el registro y se redirige a Stripe
- Nota de que los fondos apoyan la mision de la organizacion

### 3. Edge function `create-course-checkout`

- Recibe los datos del formulario
- Valida los campos
- Guarda el registro en `course_purchases` con status "pending"
- Crea sesion de Stripe Checkout por $50
- Retorna la URL de checkout

### 4. Edge function `verify-course-purchase`

- Recibe el session_id de Stripe
- Verifica el pago y actualiza el status a "completed"

### 5. Banner en homepage

Banner llamativo en la pagina principal anunciando el curso con enlace a `/curso`.

### 6. Pestana "Cursos" en Admin

Nueva pestana en el panel de administracion (`/admin`) con:
- Tabla de todos los inscritos mostrando nombre, email, estado, fecha
- Tarjetas de resumen (total recaudado, total inscritos)
- Boton "Ver Detalles" en cada fila que abre un dialog con toda la informacion del inscrito (nombre completo, email, telefono, ciudad, estado, fecha, estado del pago)

### 7. Pagina de exito del curso

Reutilizar/extender `DonationSuccess` para manejar compras de curso, o crear una pagina separada `/curso-success`.

---

## Detalles Tecnicos

### Archivos nuevos
- `src/pages/Course.tsx` -- pagina del curso con formulario
- `supabase/functions/create-course-checkout/index.ts` -- edge function para crear checkout
- `supabase/functions/verify-course-purchase/index.ts` -- edge function para verificar pago
- `src/components/admin/CoursePurchasesManagement.tsx` -- componente para la pestana de cursos en admin

### Archivos modificados
- `src/App.tsx` -- agregar ruta `/curso` y `/curso-success`
- `src/pages/Index.tsx` -- agregar banner del curso
- `src/pages/Admin.tsx` -- agregar pestana "Cursos" con icono GraduationCap
- `src/pages/DonationSuccess.tsx` -- extender para manejar tipo "course"

### Migracion SQL
```sql
CREATE TABLE public.course_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  city text,
  state text,
  course_id text NOT NULL DEFAULT 'habeas-corpus-2026',
  stripe_session_id text NOT NULL,
  stripe_customer_id text,
  amount numeric NOT NULL DEFAULT 50,
  currency text NOT NULL DEFAULT 'usd',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.course_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all course purchases"
  ON public.course_purchases FOR SELECT
  USING (has_role(auth.uid(), 'admin'));
```

### Edge function pattern
Reutiliza el mismo patron probado de `create-campaign-donation`: validacion de datos, creacion de customer en Stripe, sesion de checkout, guardado en DB con service role key.

