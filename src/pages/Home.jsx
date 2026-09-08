export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>

      <p className="text-gray-600 mb-6">
        Este es tu SaaS base. Desde aquí podés navegar al login o dashboard.
      </p>

      <div className="flex gap-4">
        <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </a>

        <a
          href="/dashboard"
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Dashboard
        </a>
      </div>
    </div>
  );
}
